"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_my_tabber2 = common_vendor.resolveComponent("my-tabber");
  const _easycom_layout2 = common_vendor.resolveComponent("layout");
  (_easycom_my_tabber2 + _easycom_layout2)();
}
const _easycom_my_tabber = () => "../../components/tabber/tabber.js";
const _easycom_layout = () => "../../layout/index.js";
if (!Math) {
  (_easycom_my_tabber + _easycom_layout)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      value: "cart"
    }),
    b: common_vendor.p({
      title: "购物车"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cart/cart.js.map
