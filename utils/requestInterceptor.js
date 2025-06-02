import { useUserStore } from "@/stores";
console.log("加载成功");

// store.js 或一个专门的 auth.js 模块
let isRefreshingToken = false;
let isNavigatingToLogin = false;
let isLoseToken = false;
let pendingRequests = [];

// 将挂起的请求重新执行
function processPendingRequests(error) {
  const store = useUserStore();
  isRefreshingToken = false;
  isLoseToken = false;
  const token = store.token;
  pendingRequests.forEach((callback) => {
    if (error) {
      callback.reject(error || new Error("刷新token失败,请重新登录"));
    } else {
      callback.resolve(token); // 让原请求可以用新token重试
    }
  });
  pendingRequests = [];
}

// 在你的请求封装或拦截器中使用
uni.addInterceptor("request", {
  async invoke(args) {
    const store = useUserStore();
    const token = store.token;
    const tokenTimestamp = store.tokenTimestamp;
    const tokenExpiresIn = store.tokenExpiresIn; // 假设存的是毫秒
    const publicApis = ["/login", "/getOpenid", "/image"];
    args.header = args.header || {};
    args.header["Authorization"] = `${token}`;
    if (publicApis.some((apiPath) => args.url.includes(apiPath))) {
      return args;
    }

    if (token && tokenTimestamp && tokenExpiresIn) {
      // 如果登录了
      const currentTime = Date.now();
      const fifteenMinutes = 15 * 60 * 1000; // 15分钟容错时长
      const tokenExpiryTime = tokenTimestamp + tokenExpiresIn;
      const FreeTime = tokenExpiryTime - currentTime;
      if (FreeTime <= fifteenMinutes && FreeTime > 0) {
        // 如果快过期了
        console.log("Token 即将过期", args.url);

        // Token 即将过期
        if (!isRefreshingToken) {
          console.log("Token 正在刷新");

          isRefreshingToken = true;
          return args; // 继续当前请求
        } else {
          console.log("Token 正在刷新，将当前请求加入队列", args.url);
          // Token 正在刷新，将当前请求加入队列
          // 返回一个Promise，这个Promise会在token刷新后被resolve或reject
          return new Promise((resolveRequest, rejectRequest) => {
            pendingRequests.push({
              resolve: (newToken) => {
                // 当token刷新成功
                args.header = args.header || {};
                args.header["Authorization"] = `${newToken}`;
                resolveRequest(args); // 用更新后的args继续原请求
              },
              reject: (error) => {
                // 当token刷新失败
                rejectRequest(error);
              },
            });
          });
        }
      } else if (FreeTime <= 0) {
        // 过期了
        if (!isLoseToken) {
          await store.wxlogin();
          return args;
        } else {
          console.log("正在等待一键微信登录", args.url);
          return new Promise((resolveRequest, rejectRequest) => {
            pendingRequests.push({
              resolve: (newToken) => {
                // 当token刷新成功
                args.header = args.header || {};
                args.header["Authorization"] = `${newToken}`;
                resolveRequest(args); // 用更新后的args继续原请求
              },
              reject: (error) => {
                // 当token刷新失败
                rejectRequest(error);
              },
            });
          });
        }
      }
    }

    return args;
  },
  success(response, requestArgs) {
    const store = useUserStore();
    // 检查响应头中是否有后端返回的新token (通常在请求本身就会刷新token时使用)
    const { data, header: responseHeaders } = response;
    // 登录失效处理 (code: 104)
    if (data.code === 104) {
      if (!isNavigatingToLogin) {
        // <--- 检查标志位
        isNavigatingToLogin = true; // <--- 设置标志位，表示开始处理跳转登录

        uni.showModal({
          title: "提示",
          content: "请先进行登录", // 可以使用后端返回的msg
          confirmText: "去登录",
          showCancel: false,
          success: (modalRes) => {
            if (modalRes.confirm) {
              store.clearToken(); // 清除 Pinia store 中的 token 及相关信息
              // 跳转到登录页，建议使用 reLaunch 关闭所有页面，打开到应用的新页面栈
              uni.navigateTo({
                url: "/pages/login/login", // 你的登录页面路径
              });
            }
            // 注意：用户点了确定跳转后，isNavigatingToLogin 仍然是 true。
            // 它应该在用户成功登录后，或者应用重新初始化时被重置。
          },
          fail: () => {
            // 即便 showModal 失败，也认为正在尝试导航，避免后续的弹窗
            // 实际项目中，这里可能也需要重置 isNavigatingToLogin 或有其他处理
          },
        });
      }
      // 中断promise链，无论是否是第一个触发的，后续的业务逻辑都不应该执行
      return Promise.reject(new Error(data.msg || "登录失效(104)"));
    }
    // 响应头中如果存在新的token，则更新

    const new_token =
      responseHeaders.Authorization || responseHeaders.authorization;
    const expiresIn =
      responseHeaders.Tokenexpiresin || responseHeaders.tokenExpiresIn;
    if (new_token) {
      console.log("成功刷新TOken", new_token);

      store.setToken(new_token);
      store.setTokenTimestamp(Date.now());
      store.setTokenExpiresIn(expiresIn);
      processPendingRequests(null);
    }
    if (requestArgs.url.includes("/login")) {
      // 如果静默登录，无论有没有队列，都执行一下
      processPendingRequests(null);
    }
    if (data.success !== undefined && !data.success) {
      uni.showToast({
        title: data.msg || "操作失败",
        icon: "none",
        duration: 3000,
      });

      return Promise.reject(new Error(data.msg || "操作失败"));
    }
    return response;
  },
  fail(err, requestArgs) {
    // const store = useUserStore();
    uni.showToast({
      title: `请求失败: ${err.errMsg || "操作失败"}`,
      icon: "none",
      duration: 3000,
    });
    return Promise.reject(new Error(err.errMsg || "操作失败"));
  },
});
