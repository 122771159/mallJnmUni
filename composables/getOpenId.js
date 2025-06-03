export function getOpenId() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: "weixin",
      success: async function (loginRes) {
        const { data: openId } = await uni.$http.get(
          `/wx/getOpenid/${loginRes.code}`
        );
        resolve(openId);
      },
      fail: function () {
        reject(new Error("获取微信openId失败"));
      },
    });
  });
}
