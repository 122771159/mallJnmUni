"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "uv-tabbar-item",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$11],
  emits: ["click", "change"],
  data() {
    return {
      isActive: false,
      // 是否处于激活状态
      parentData: {
        value: null,
        activeColor: "",
        inactiveColor: "",
        iconSize: 20
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.updateParentData();
      if (!this.parent) {
        this.$uv.error("uv-tabbar-item必须搭配uv-tabbar组件使用");
      }
      const index = this.parent.children.indexOf(this);
      this.isActive = (this.name || index) === this.parentData.value;
    },
    updateParentData() {
      this.getParentData("uv-tabbar");
    },
    // 此方法将会被父组件uv-tabbar调用
    updateFromParent() {
      this.init();
    },
    clickHandler() {
      this.$nextTick(() => {
        const index = this.parent.children.indexOf(this);
        const name = this.name || index;
        if (name !== this.parent.value) {
          this.parent.$emit("change", name);
        }
        this.$emit("click", name);
      });
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_badge2 = common_vendor.resolveComponent("uv-badge");
  (_easycom_uv_icon2 + _easycom_uv_badge2)();
}
const _easycom_uv_icon = () => "../uv-icon/uv-icon.js";
const _easycom_uv_badge = () => "../uv-badge/uv-badge.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.icon
  }, _ctx.icon ? {
    b: common_vendor.p({
      name: _ctx.icon,
      color: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor,
      size: _ctx.iconSize ? _ctx.iconSize : $data.parentData.iconSize
    })
  } : common_vendor.e({
    c: $data.isActive
  }, $data.isActive ? {} : {}), {
    d: common_vendor.p({
      absolute: true,
      offset: [0, _ctx.dot ? "34rpx" : _ctx.badge > 9 ? "14rpx" : "20rpx"],
      customStyle: _ctx.badgeStyle,
      isDot: _ctx.dot,
      value: _ctx.badge || (_ctx.dot ? 1 : null),
      show: _ctx.dot || _ctx.badge > 0
    }),
    e: common_vendor.t(_ctx.text),
    f: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor,
    g: common_vendor.s(_ctx.$uv.addStyle(_ctx.customStyle)),
    h: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-095eeec5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/node-modules/@climblee/uv-ui/components/uv-tabbar-item/uv-tabbar-item.js.map
