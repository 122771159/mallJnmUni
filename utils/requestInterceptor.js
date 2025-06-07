import { useUserStore } from "@/stores";

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
    const publicApis = [
      "/login",
      "/getOpenid",
      "/image",
      "/wxlogin",
      "/verify",
    ];
    args.header = args.header || {};
    args.header["Authorization"] = `${token}`;
    if (publicApis.some((apiPath) => args.url.includes(apiPath))) {
      return args;
    }

    if (token && tokenTimestamp && tokenExpiresIn) {
      // 如果登录了
      const currentTime = Date.now();
      const tokenFreeTimeout = store.tokenFreeTimeout; // 15分钟容错时长
      // 计算token过期时间
      const tokenExpiryTime =
        parseInt(tokenTimestamp) + parseInt(tokenExpiresIn);
      // 计算token剩余时间
      const FreeTime = tokenExpiryTime - currentTime;

      if (FreeTime <= tokenFreeTimeout && FreeTime > 0) {
        // 如果快过期了
        console.log("Token 即将过期", args.url);

        // Token 即将过期
        if (!isRefreshingToken) {
          console.log("Token 正在刷新");
          args.header.refreshToken_ = true;
          isRefreshingToken = true;
          return args; // 继续当前请求
        } else {
          console.log("Token 正在刷新，将当前请求加入队列", args.url);
          // Token 正在刷新，将当前请求加入队列+++˘
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
          isLoseToken = true;
          await store.wxlogin();
          const token = store.token;
          args.header["Authorization"] = `${token}`;
          args.header.silentLogin_ = true;
          return args;
        } else {
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
    const tokenTimestamp = store.tokenTimestamp;
    const tokenExpiresIn = store.tokenExpiresIn; // 假设存的是毫秒
    const currentTime = Date.now();
    // 计算token过期时间
    const tokenExpiryTime = parseInt(tokenTimestamp) + parseInt(tokenExpiresIn);
    // 计算token剩余时间
    const FreeTime = tokenExpiryTime - currentTime;
    // 检查响应头中是否有后端返回的新token (通常在请求本身就会刷新token时使用)
    const { data, header: responseHeaders } = response;
    const { header: requestHeader } = requestArgs;
    // 登录失效处理 (code: 104)
    if (data.code === 104) {
      // 防止恶意更改token
      if (!isNavigatingToLogin) {
        isNavigatingToLogin = true; // <--- 设置标志位，表示开始处理跳转登录
        uni.showModal({
          title: "提示",
          content: `${data.msg} 请先进行登录`, // 可以使用后端返回的msg
          confirmText: "去登录",
          showCancel: false,
          success: (modalRes) => {
            if (modalRes.confirm) {
              store.logout(); // 清除 Pinia store 中的 token 及相关信息
              // 跳转到登录页，建议使用 reLaunch 关闭所有页面，打开到应用的新页面栈
              uni.reLaunch({
                url: "/pages/login/login", // 你的登录页面路径
              });
            }
          },
        });
      }
      return Promise.reject(new Error(data.msg || "登录失效(104)"));
    }
    // 判断是不是刷新token的请求
    if (requestHeader.refreshToken_) {
      console.log("发现刷新token的请求头");

      const new_token =
        responseHeaders.Authorization || responseHeaders.authorization;
      const expiresIn =
        responseHeaders.Tokenexpiresin || responseHeaders.tokenExpiresIn;
      const FreeTime =
        responseHeaders.tokenfreetimeout || responseHeaders.tokenFreeTimeout;
      if (new_token) {
        store.setToken(new_token);
        store.setTokenTimestamp(Date.now());
        store.setTokenExpiresIn(expiresIn);
        console.log("FreeTime", FreeTime);
        store.setTokenFreeTimeout(FreeTime);
        processPendingRequests(null);
      }
    }
    // 判断是否有静默登录的请求头或者是/login的请求
    if (requestHeader.silentLogin_ || requestArgs.url.includes("/login")) {
      processPendingRequests(null);
    }

    return response;
  },
  fail(err, requestArgs) {
    // const store = useUserStore();
    uni.$com.toastHide();
    uni.showToast({
      title: `请求失败: ${err.errMsg || "操作失败"}`,
      icon: "none",
      duration: 3000,
    });
    return Promise.reject(new Error(err.errMsg || "操作失败"));
  },
});
