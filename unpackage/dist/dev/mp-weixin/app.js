"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_request = require("./utils/request.js");
const composables_index = require("./composables/index.js");
require("./utils/requestInterceptor.js");
require("./utils/routeInterceptor.js");
if (!Math) {
  "./pages/user/user.js";
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/policy/privacy.js";
  "./pages/policy/service.js";
  "./pages/product/product.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
const towxml = require("./wxcomponents/towxml/index");
common_vendor.index.$http = utils_request.http;
common_vendor.index.$com = composables_index.modules;
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.config.globalProperties.$towxml = towxml;
  app.use(common_vendor.createPinia());
  app.use(common_vendor.uvUI);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
