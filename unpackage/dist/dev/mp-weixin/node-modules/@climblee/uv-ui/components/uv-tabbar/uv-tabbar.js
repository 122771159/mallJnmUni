"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "uv-tabbar",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$12],
  data() {
    return {
      placeholderHeight: 0
    };
  },
  computed: {
    tabbarStyle() {
      const style = {
        zIndex: this.zIndex
      };
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    },
    // 监听多个参数的变化，通过在computed执行对应的操作
    updateChild() {
      return [this.value, this.activeColor, this.inactiveColor];
    },
    updatePlaceholder() {
      return [this.fixed, this.placeholder];
    }
  },
  watch: {
    updateChild() {
      this.updateChildren();
    },
    updatePlaceholder() {
      this.setPlaceholderHeight();
    }
  },
  created() {
    this.children = [];
  },
  mounted() {
    this.setPlaceholderHeight();
  },
  methods: {
    updateChildren() {
      this.children.length && this.children.map((child) => child.updateFromParent());
    },
    // 设置用于防止塌陷元素的高度
    async setPlaceholderHeight() {
      if (!this.fixed || !this.placeholder)
        return;
      await this.$uv.sleep(20);
      this.$uvGetRect(".uv-tabbar__content").then(({ height = 50 }) => {
        this.placeholderHeight = height;
      });
    }
  }
};
if (!Array) {
  const _easycom_uv_safe_bottom2 = common_vendor.resolveComponent("uv-safe-bottom");
  _easycom_uv_safe_bottom2();
}
const _easycom_uv_safe_bottom = () => "../uv-safe-bottom/uv-safe-bottom.js";
if (!Math) {
  _easycom_uv_safe_bottom();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.safeAreaInsetBottom
  }, _ctx.safeAreaInsetBottom ? {} : {}, {
    b: common_vendor.o((...args) => _ctx.noop && _ctx.noop(...args)),
    c: common_vendor.n(_ctx.border && "uv-border-top"),
    d: common_vendor.n(_ctx.fixed && "uv-tabbar--fixed"),
    e: common_vendor.s($options.tabbarStyle),
    f: _ctx.placeholder
  }, _ctx.placeholder ? {
    g: $data.placeholderHeight + "px"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-20102e86"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/node-modules/@climblee/uv-ui/components/uv-tabbar/uv-tabbar.js.map
