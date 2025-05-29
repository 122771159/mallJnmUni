"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_tabber2 = common_vendor.resolveComponent("my-tabber");
  const _easycom_layout2 = common_vendor.resolveComponent("layout");
  (_easycom_uv_button2 + _easycom_my_tabber2 + _easycom_layout2)();
}
const _easycom_uv_button = () => "../../node-modules/@climblee/uv-ui/components/uv-button/uv-button.js";
const _easycom_my_tabber = () => "../../components/tabber/tabber.js";
const _easycom_layout = () => "../../layout/index.js";
if (!Math) {
  (_easycom_uv_button + _easycom_my_tabber + _easycom_layout)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      common_vendor.index.$com.toast({
        type: "default",
        title: "默认主题",
        message: "锦瑟无端五十123123弦"
      });
    });
    function toast() {
      common_vendor.index.$com.toast({
        type: "default",
        title: "默认主题",
        message: "锦瑟无端五十弦111111"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(toast),
        c: common_vendor.p({
          text: "月落"
        }),
        d: common_vendor.o(toast),
        e: common_vendor.p({
          text: "月落"
        }),
        f: common_vendor.o(toast),
        g: common_vendor.p({
          text: "月落"
        }),
        h: common_vendor.p({
          title: "首页",
          hiddenLeft: true
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
