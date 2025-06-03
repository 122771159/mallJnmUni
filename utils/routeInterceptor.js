const whiteList = ["/pages/login/login", "/pages/user/user"];

const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];

function hasPermission(url) {
  // 在白名单中或有token，直接跳转
  if (
    whiteList.some((item) => url.includes(item)) ||
    uni.getStorageSync("token")
  ) {
    return true;
  }
  return false;
}

list.forEach((item) => {
  uni.addInterceptor(item, {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转

    invoke(e) {
      if (!hasPermission(e.url)) {
        uni.$com.toast({
          type: "none",
          message: "请先登录再访问",
        });
        uni.setStorageSync("redirect", e.url);
        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/login/login",
          });
        }, 1000);

        return false;
      }
      return true;
    },
  });
});
