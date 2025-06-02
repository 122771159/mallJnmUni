"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_toast2 = common_vendor.resolveComponent("uv-toast");
  (_easycom_uv_icon2 + _easycom_uv_line2 + _easycom_uv_navbar2 + _easycom_uv_toast2)();
}
const _easycom_uv_icon = () => "../node-modules/@climblee/uv-ui/components/uv-icon/uv-icon.js";
const _easycom_uv_line = () => "../node-modules/@climblee/uv-ui/components/uv-line/uv-line.js";
const _easycom_uv_navbar = () => "../node-modules/@climblee/uv-ui/components/uv-navbar/uv-navbar.js";
const _easycom_uv_toast = () => "../node-modules/@climblee/uv-ui/components/uv-toast/uv-toast.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_line + _easycom_uv_navbar + _easycom_uv_toast)();
}
const _sfc_main = {
  __name: "index",
  props: {
    title: {
      type: String,
      required: true
    },
    leftClick: {
      type: Function,
      default: () => {
        common_vendor.index.navigateBack();
      }
    },
    hiddenLeft: {
      type: Boolean,
      default: false
    },
    hiddenLeftArrow: {
      type: Boolean,
      default: false
    },
    hiddenLeftHome: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const toastRef = common_vendor.ref(null);
    const handleShowToast = (params) => {
      if (toastRef.value) {
        toastRef.value.show({
          ...params
        });
      }
    };
    const hide = () => {
      if (toastRef.value) {
        toastRef.value.hide();
      }
    };
    const bacHome = () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    };
    common_vendor.onMounted(() => {
      common_vendor.index.$on("show-toast", handleShowToast);
      common_vendor.index.$on("hide-toast", hide);
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("show-toast", handleShowToast);
      common_vendor.index.$off("hide-toast", hide);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.hiddenLeft
      }, !__props.hiddenLeft ? common_vendor.e({
        b: !__props.hiddenLeftArrow
      }, !__props.hiddenLeftArrow ? {
        c: common_vendor.o(__props.leftClick),
        d: common_vendor.p({
          name: "arrow-left",
          size: "24"
        })
      } : {}, {
        e: !__props.hiddenLeftArrow && !__props.hiddenLeftHome
      }, !__props.hiddenLeftArrow && !__props.hiddenLeftHome ? {
        f: common_vendor.p({
          direction: "column",
          hairline: false,
          length: "20",
          margin: "0 8px"
        })
      } : {}, {
        g: !__props.hiddenLeftHome
      }, !__props.hiddenLeftHome ? {
        h: common_vendor.o(bacHome),
        i: common_vendor.p({
          name: "home",
          size: "24"
        })
      } : {}) : {}, {
        j: __props.title
      }, __props.title ? {
        k: common_vendor.t(__props.title)
      } : {}, {
        l: common_vendor.p({
          title: __props.title,
          placeholder: true
        }),
        m: common_vendor.sr(toastRef, "0d580bf3-4", {
          "k": "toastRef"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0d580bf3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/layout/index.js.map
