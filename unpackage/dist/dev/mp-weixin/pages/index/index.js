"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_ShopList2 = common_vendor.resolveComponent("ShopList");
  const _easycom_my_tabber2 = common_vendor.resolveComponent("my-tabber");
  const _easycom_layout2 = common_vendor.resolveComponent("layout");
  (_easycom_ShopList2 + _easycom_my_tabber2 + _easycom_layout2)();
}
const _easycom_ShopList = () => "../../components/ShopList/ShopList.js";
const _easycom_my_tabber = () => "../../components/tabber/tabber.js";
const _easycom_layout = () => "../../layout/index.js";
if (!Math) {
  (_easycom_ShopList + _easycom_my_tabber + _easycom_layout)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "首页",
          hiddenLeft: true
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
