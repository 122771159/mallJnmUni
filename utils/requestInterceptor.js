import { useUserStore } from "@/stores";
const store = useUserStore();
// store.js 或一个专门的 auth.js 模块
let isRefreshingToken = false;
let isLoseToken = false;
let pendingRequests = [];

// 将挂起的请求重新执行
function processPendingRequests(error) {
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
    const token = store.token;
    const tokenTimestamp = store.tokenTimestamp;
    const tokenExpiresIn = store.tokenExpiresIn; // 假设存的是毫秒

    const publicApis = ["/login", "/getOpenid"];
    if (publicApis.some((apiPath) => args.url.includes(apiPath))) {
      return args;
    }

    if (token && tokenTimestamp && tokenExpiresIn) {
      // 如果登录了
      const currentTime = Date.now();
      const fifteenMinutes = 15 * 60 * 1000; // 15分钟容错时长
      const tokenExpiryTime = tokenTimestamp + tokenExpiresIn;

      if (tokenExpiryTime - currentTime <= fifteenMinutes) {
        // 如果快过期了
        // Token 即将过期
        if (!isRefreshingToken) {
          isRefreshingToken = true;
          return args; // 继续当前请求
        } else {
          console.log("Token refresh in progress, queuing request:", args.url);
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
      } else if (currentTime >= tokenExpiryTime) {
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
      } else {
        // 没有过期
        args.header = args.header || {};
        args.header["Authorization"] = `${token}`;
      }
    }

    return args;
  },
  success(response, requestArgs) {
    // 检查响应头中是否有后端返回的新token (通常在请求本身就会刷新token时使用)
    const { data, header: responseHeaders } = response;
    // 登录失效处理 (code: 104)
    if (data.code === 104) {
      uni.showModal({
        title: "提示",
        content: "先请登录再访问",
        confirmText: "请先登录",
        showCancel: false, // 一般不给用户取消的机会
        success: (modalRes) => {
          if (modalRes.confirm) {
            // 清除本地token和store
            useUserStore().clearToken();
            // 跳转到登录页
            uni.navigateTo({
              url: "/pages/login/login",
            });
          }
        },
      });
      // 中断promise链
      return Promise.reject(new Error("登录失效"));
    }
    // 响应头中如果存在新的token，则更新
    const new_token =
      responseHeaders.Authorization || responseHeaders.authorization;
    if (new_token) {
      store.setToken(new_token);
      store.setTokenTimestamp(Date.now());
      store.setTokenExpiresIn(responseHeaders.tokenExpiresIn);
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
    uni.showToast({
      title: `请求失败: ${err.errMsg || "操作失败"}`,
      icon: "none",
      duration: 3000,
    });
    return Promise.reject(new Error(err.errMsg || "操作失败"));
  },
});
