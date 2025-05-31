"use strict";
const common_vendor = require("../common/vendor.js");
function toast(params) {
  common_vendor.index.$emit("show-toast", params);
}
function toastHide() {
  common_vendor.index.$emit("hide-toast");
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toast,
  toastHide
}, Symbol.toStringTag, { value: "Module" }));
exports.__vite_glob_0_3 = __vite_glob_0_3;
//# sourceMappingURL=../../.sourcemap/mp-weixin/composables/useToast.js.map
