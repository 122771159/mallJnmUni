"use strict";
const common_vendor = require("../common/vendor.js");
const stores_index = require("../stores/index.js");
const BASE_URL = "http://127.0.0.1:8080";
const request = (options) => {
  return new Promise((resolve, reject) => {
    const header = {
      "Content-Type": "application/json;charset=utf-8",
      ...options.header
      // 允许覆盖默认header
    };
    const token = common_vendor.index.getStorageSync("token");
    if (token) {
      header["Authorization"] = token;
    }
    common_vendor.index.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header,
      timeout: options.timeout || 5e4,
      // 默认50秒超时
      // --- 响应成功拦截器逻辑 ---
      success: (res) => {
        const { data, header: responseHeaders } = res;
        const new_token = responseHeaders.Authorization || responseHeaders.authorization;
        if (new_token) {
          stores_index.useUserStore().setToken(new_token);
        }
        if (data.code === 104) {
          common_vendor.index.showModal({
            title: "提示",
            content: "您的登录已失效，请重新登录",
            confirmText: "再次登录",
            showCancel: false,
            // 一般不给用户取消的机会
            success: (modalRes) => {
              if (modalRes.confirm) {
                stores_index.useUserStore().clearToken();
                common_vendor.index.reLaunch({
                  url: "/pages/login/login"
                  // 请替换为你的登录页面路径
                });
              }
            }
          });
          return reject(new Error("登录失效"));
        }
        if (data.success !== void 0 && !data.success) {
          common_vendor.index.showToast({
            title: data.msg || "操作失败",
            icon: "none",
            duration: 3e3
          });
          return reject(new Error(data.msg || "操作失败"));
        }
        resolve(data);
      },
      // --- 响应失败拦截器逻辑 (网络错误等) ---
      fail: (error) => {
        common_vendor.index.showToast({
          title: `请求失败: ${error.errMsg || "网络错误"}`,
          icon: "none",
          duration: 3e3
        });
        reject(error);
      }
    });
  });
};
const http = {
  get(url, params = {}, header = {}) {
    return request({
      url,
      method: "GET",
      data: params,
      header
    });
  },
  post(url, data = {}, header = {}) {
    return request({
      url,
      method: "POST",
      data,
      header
    });
  },
  put(url, data = {}, header = {}) {
    return request({
      url,
      method: "PUT",
      data,
      header
    });
  },
  delete(url, data = {}, header = {}) {
    return request({
      url,
      method: "DELETE",
      data,
      header
    });
  }
  // 你可以继续封装 upload 等方法
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
