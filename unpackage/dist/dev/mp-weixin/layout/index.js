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
    hiddenLeftStrong: {
      type: Boolean,
      default: false
    },
    hiddenRightStrong: {
      type: Boolean,
      default: false
    },
    hiddenAllStrong: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const prop = __props;
    const navigationSource = common_vendor.ref();
    const getIsHiidenLeft = () => {
      if (prop.hiddenAllStrong)
        return false;
      if (prop.hiddenLeftStrong)
        return false;
      if (navigationSource.value == "reLaunch")
        return false;
      return true;
    };
    const getIsHiidenRight = () => {
      if (prop.hiddenAllStrong)
        return false;
      if (prop.hiddenRightStrong)
        return false;
      return true;
    };
    const getIsHiidenCenter = () => {
      if (getIsHiidenLeft() && getIsHiidenRight())
        return true;
      return false;
    };
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
        url: "/pages/user/user"
      });
    };
    common_vendor.onLoad(() => {
      const pages = getCurrentPages();
      const pageStackLength = pages.length;
      common_vendor.index.__f__("log", "at layout/index.vue:107", "当前页面栈层级:", pageStackLength);
      if (pageStackLength === 1) {
        navigationSource.value = "reLaunch";
        common_vendor.index.__f__("log", "at layout/index.vue:112", "此页面可能是通过 uni.reLaunch 打开，或者是应用的初始启动页。");
      } else if (pageStackLength > 1) {
        navigationSource.value = "navigateTo";
        common_vendor.index.__f__("log", "at layout/index.vue:117", "此页面可能是通过 uni.navigateTo 打开。");
      } else {
        common_vendor.index.__f__("warn", "at layout/index.vue:122", "获取页面栈层级异常!");
      }
    });
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
        a: !__props.hiddenAllStrong
      }, !__props.hiddenAllStrong ? common_vendor.e({
        b: getIsHiidenLeft()
      }, getIsHiidenLeft() ? {
        c: common_vendor.o(__props.leftClick),
        d: common_vendor.p({
          name: "arrow-left",
          size: "24"
        })
      } : {}, {
        e: getIsHiidenCenter()
      }, getIsHiidenCenter() ? {
        f: common_vendor.p({
          direction: "column",
          hairline: false,
          length: "20",
          margin: "0 8px"
        })
      } : {}, {
        g: getIsHiidenRight()
      }, getIsHiidenRight() ? {
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
