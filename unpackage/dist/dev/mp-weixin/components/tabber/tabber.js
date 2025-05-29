"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_tabbar_item2 = common_vendor.resolveComponent("uv-tabbar-item");
  const _easycom_uv_tabbar2 = common_vendor.resolveComponent("uv-tabbar");
  (_easycom_uv_tabbar_item2 + _easycom_uv_tabbar2)();
}
const _easycom_uv_tabbar_item = () => "../../node-modules/@climblee/uv-ui/components/uv-tabbar-item/uv-tabbar-item.js";
const _easycom_uv_tabbar = () => "../../node-modules/@climblee/uv-ui/components/uv-tabbar/uv-tabbar.js";
if (!Math) {
  (_easycom_uv_tabbar_item + _easycom_uv_tabbar)();
}
const _sfc_main = {
  __name: "tabber",
  props: {
    value: {
      type: String,
      default: "home"
    }
  },
  setup(__props) {
    const props = __props;
    const pageList = common_vendor.index.$com.getTabbers();
    const v = common_vendor.ref(props.value);
    const changePage = (name) => {
      pageList[name].go();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(pageList), (i, k0, i0) => {
          return {
            a: i.icon,
            b: "53b95d4c-1-" + i0 + ",53b95d4c-0",
            c: common_vendor.p({
              text: i.text,
              icon: i.icon,
              name: i.name
            })
          };
        }),
        b: common_vendor.o(changePage),
        c: common_vendor.p({
          value: common_vendor.unref(v),
          fixed: true
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/tabber/tabber.js.map
