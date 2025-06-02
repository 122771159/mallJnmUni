import App from "./App";
import * as Pinia from "pinia";
import { createSSRApp } from "vue";
import http from "@/utils/request.js";
import myComposable from "@/composables/index";
import uvUI from "@climblee/uv-ui";
const towxml = require("./wxcomponents/towxml/index");
uni.$http = http;
uni.$com = myComposable;
import "@/utils/requestInterceptor.js";
export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$towxml = towxml;
  app.use(Pinia.createPinia());
  // require("./utils/requestInterceptor.js");
  app.use(uvUI);
  return {
    app,
    Pinia,
  };
}
