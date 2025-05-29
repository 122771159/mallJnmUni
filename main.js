import App from './App'
import * as Pinia from 'pinia';
import { createSSRApp } from 'vue'
import http from '@/utils/request.js'; 
import myComposable from '@/composables/index';
import uvUI from '@climblee/uv-ui'
uni.$http = http
uni.$com = myComposable
export function createApp() {
  const app = createSSRApp(App) 
  app.use(Pinia.createPinia());
  app.use(uvUI)

  return {
    app,
	Pinia
  }
}
