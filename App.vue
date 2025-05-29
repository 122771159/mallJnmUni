<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
body,
page,
#app {
  height: 100%;
}
/* #ifndef APP-NVUE */
// 历遍生成4个方向的底部安全区
:root {
  @each $d in top, right, bottom, left {
    // 定义我们自己的 CSS 变量，例如 --safe-area-top, --safe-area-bottom 等
    --safe-area-#{$d}: constant(safe-area-inset-#{$d}); // 兼容旧版
    --safe-area-#{$d}: env(
      safe-area-inset-#{$d},
      0px
    ); // 兼容新版，并提供 0px 作为回退
  }
}
/* #endif */
</style>
