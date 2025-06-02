"use strict";
const composables_getEnv = require("./getEnv.js");
const composables_getHeight = require("./getHeight.js");
const composables_getStore = require("./getStore.js");
const composables_getTabbers = require("./getTabbers.js");
const composables_useToast = require("./useToast.js");
const modulesFiles = /* @__PURE__ */ Object.assign({ "./getEnv.js": composables_getEnv.__vite_glob_0_0, "./getHeight.js": composables_getHeight.__vite_glob_0_1, "./getStore.js": composables_getStore.__vite_glob_0_2, "./getTabbers.js": composables_getTabbers.__vite_glob_0_3, "./useToast.js": composables_useToast.__vite_glob_0_4 });
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
