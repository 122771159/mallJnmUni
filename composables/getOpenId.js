export function getOpenId() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: "weixin",
      success: async function (loginRes) {
        try {
          const { data: openId } = await uni.$http.get(
            `/wx/getOpenid/${loginRes.code}`
          );
          console.log("openId", openId);
          resolve(openId);
        } catch (error) {
          console.log("error", error);

          reject(error);
        }
      },
      fail: function () {
        reject(new Error("获取微信openId失败"));
      },
    });
  });
}
