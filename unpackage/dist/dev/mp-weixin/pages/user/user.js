"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_index = require("../../stores/index.js");
if (!Array) {
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_grid_item2 = common_vendor.resolveComponent("uv-grid-item");
  const _easycom_uv_grid2 = common_vendor.resolveComponent("uv-grid");
  const _easycom_layout2 = common_vendor.resolveComponent("layout");
  const _easycom_my_tabber2 = common_vendor.resolveComponent("my-tabber");
  (_easycom_uv_avatar2 + _easycom_uv_icon2 + _easycom_uv_grid_item2 + _easycom_uv_grid2 + _easycom_layout2 + _easycom_my_tabber2)();
}
const _easycom_uv_avatar = () => "../../node-modules/@climblee/uv-ui/components/uv-avatar/uv-avatar.js";
const _easycom_uv_icon = () => "../../node-modules/@climblee/uv-ui/components/uv-icon/uv-icon.js";
const _easycom_uv_grid_item = () => "../../node-modules/@climblee/uv-ui/components/uv-grid-item/uv-grid-item.js";
const _easycom_uv_grid = () => "../../node-modules/@climblee/uv-ui/components/uv-grid/uv-grid.js";
const _easycom_layout = () => "../../layout/index.js";
const _easycom_my_tabber = () => "../../components/tabber/tabber.js";
if (!Math) {
  (_easycom_uv_avatar + _easycom_uv_icon + _easycom_uv_grid_item + _easycom_uv_grid + _easycom_layout + _easycom_my_tabber)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userStore = stores_index.useUserStore();
    const isLoggedIn = common_vendor.computed(() => userStore.isLogin);
    const currentUser = common_vendor.computed(() => userStore.getUserInfo);
    const userRoles = common_vendor.computed(() => userStore.getRoles);
    const topHeight = common_vendor.index.$com.getHeight().topHeight;
    const bottomHeight = common_vendor.index.$com.getHeight().bottomHeight;
    const username = common_vendor.computed(() => {
      var _a;
      if (isLoggedIn.value) {
        return ((_a = currentUser.value) == null ? void 0 : _a.username) || "未登录";
      }
      return "未登录";
    });
    const userType = common_vendor.computed(() => {
      if (isLoggedIn.value) {
        if (userRoles.value.includes("SALES")) {
          return "业务员";
        } else if (userRoles.value.includes("CUSTOMER")) {
          return "普通客户";
        } else {
          return "未登录";
        }
      }
      return "请先登录";
    });
    const paymentActions = common_vendor.ref([
      {
        icon: "order",
        text: "待支付",
        path: "/pages/payment/to-pay",
        customPrefix: "uvicon"
      },
      { icon: "order", text: "发票申请", path: "/pages/invoice/apply" },
      { icon: "coupon", text: "我的返款", path: "/pages/refund/my-refunds" },
      { icon: "tags", text: "税金凭证", path: "/pages/tax-voucher/tax-voucher" },
      { icon: "bag", text: "我的钱包", path: "/pages/wallet/my-wallet" }
    ]);
    const handleActionClick = (item) => {
      if (item.path) {
        common_vendor.index.navigateTo({ url: item.path });
      } else {
        common_vendor.index.showToast({ title: `${item.text} 功能暂未开放`, icon: "none" });
      }
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            userStore.logout();
            common_vendor.index.navigateTo({ url: "/pages/login/login" });
          }
        }
      });
    };
    const goToLogin = () => {
      common_vendor.index.navigateTo({ url: "/pages/login/login" });
    };
    const goToUpgrade = () => {
      common_vendor.index.switchTab({ url: "/pages/index/index" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          text: username.value.slice(0, 1),
          fontSize: "18",
          randomBgColor: true,
          customStyle: "margin-right: 10px"
        }),
        b: common_vendor.t(username.value),
        c: common_vendor.p({
          name: "level",
          size: "14",
          color: "#f9ae3d"
        }),
        d: common_vendor.t(userType.value),
        e: isLoggedIn.value
      }, isLoggedIn.value ? {
        f: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#909399"
        }),
        g: common_vendor.o(logout)
      } : {}, {
        h: !isLoggedIn.value
      }, !isLoggedIn.value ? {
        i: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#909399"
        }),
        j: common_vendor.o(goToLogin)
      } : {}, {
        k: common_vendor.p({
          name: "level",
          size: "20",
          color: "#429FFB"
        }),
        l: common_vendor.o(goToUpgrade),
        m: common_vendor.f(paymentActions.value, (item, index, i0) => {
          return {
            a: "0f7520f0-8-" + i0 + "," + ("0f7520f0-7-" + i0),
            b: common_vendor.p({
              name: item.icon,
              ["custom-prefix"]: item.customPrefix,
              size: "28",
              color: item.iconColor || "#333"
            }),
            c: common_vendor.t(item.text),
            d: index,
            e: common_vendor.o(($event) => handleActionClick(item), index),
            f: "0f7520f0-7-" + i0 + ",0f7520f0-6"
          };
        }),
        n: common_vendor.p({
          col: 5,
          border: false
        }),
        o: "calc(100vh - " + common_vendor.unref(topHeight) + "px - " + common_vendor.unref(bottomHeight) + "px)",
        p: common_vendor.p({
          title: "我的",
          hiddenAllStrong: true
        }),
        q: common_vendor.p({
          value: "account"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
