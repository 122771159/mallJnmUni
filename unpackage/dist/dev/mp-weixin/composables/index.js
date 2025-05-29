"use strict";
const composables_getTabbers = require("./getTabbers.js");
const composables_useToast = require("./useToast.js");
const modulesFiles = /* @__PURE__ */ Object.assign({ "./getTabbers.js": composables_getTabbers.__vite_glob_0_0, "./useToast.js": composables_useToast.__vite_glob_0_1 });
const modules = {};
for (const key in modulesFiles) {
  key.replace(/^\.\/([^.]+)\.js$/, "$1");
  const value = modulesFiles[key];
  if (value) {
    for (const exportKey in value) {
      modules[exportKey] = value[exportKey];
    }
  }
}
exports.modules = modules;
//# sourceMappingURL=../../.sourcemap/mp-weixin/composables/index.js.map
