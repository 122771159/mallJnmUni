"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  const _easycom_my_ShopList2 = common_vendor.resolveComponent("my-ShopList");
  const _easycom_my_tabber2 = common_vendor.resolveComponent("my-tabber");
  const _easycom_layout2 = common_vendor.resolveComponent("layout");
  const _easycom_my_CartFloat2 = common_vendor.resolveComponent("my-CartFloat");
  const _easycom_my_CartShow2 = common_vendor.resolveComponent("my-CartShow");
  const _easycom_my_CartSummaryBar2 = common_vendor.resolveComponent("my-CartSummaryBar");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  (_easycom_uv_search2 + _easycom_my_ShopList2 + _easycom_my_tabber2 + _easycom_layout2 + _easycom_my_CartFloat2 + _easycom_my_CartShow2 + _easycom_my_CartSummaryBar2 + _easycom_uv_popup2)();
}
const _easycom_uv_search = () => "../../node-modules/@climblee/uv-ui/components/uv-search/uv-search.js";
const _easycom_my_ShopList = () => "../../components/ShopList/ShopList.js";
const _easycom_my_tabber = () => "../../components/tabber/tabber.js";
const _easycom_layout = () => "../../layout/index.js";
const _easycom_my_CartFloat = () => "../../components/CartFloat/CartFloat.js";
const _easycom_my_CartShow = () => "../../components/CartShow/CartShow.js";
const _easycom_my_CartSummaryBar = () => "../../components/CartSummaryBar/CartSummaryBar.js";
const _easycom_uv_popup = () => "../../node-modules/@climblee/uv-ui/components/uv-popup/uv-popup.js";
if (!Math) {
  (_easycom_uv_search + _easycom_my_ShopList + _easycom_my_tabber + _easycom_layout + _easycom_my_CartFloat + _easycom_my_CartShow + _easycom_my_CartSummaryBar + _easycom_uv_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popup = common_vendor.ref(null);
    const openPopup = () => {
      popup.value.open();
    };
    const search = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(search),
        b: common_vendor.p({
          placeholder: "请输入搜索内容",
          showAction: false,
          margin: "10rpx 30rpx 10rpx 30rpx",
          disabled: true
        }),
        c: common_vendor.p({
          title: "首页",
          hiddenAllStrong: true
        }),
        d: common_vendor.o(openPopup),
        e: common_vendor.sr(popup, "069749a4-5", {
          "k": "popup"
        }),
        f: common_vendor.p({
          mode: "bottom",
          customStyle: "min-height:300px;max-height:60vh"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
