"use strict";
const common_vendor = require("../common/vendor.js");
function toast(params) {
  const showToast = (params2) => {
    common_vendor.index.$emit("show-toast", params2);
  };
  return showToast(params);
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toast
}, Symbol.toStringTag, { value: "Module" }));
exports.__vite_glob_0_2 = __vite_glob_0_2;
//# sourceMappingURL=../../.sourcemap/mp-weixin/composables/useToast.js.map
