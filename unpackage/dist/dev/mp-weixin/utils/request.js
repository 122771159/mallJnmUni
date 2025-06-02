"use strict";
const common_vendor = require("../common/vendor.js");
require("../stores/index.js");
const BASE_URL = "http://192.168.110.152:8080";
const request = (options) => {
  return new Promise((resolve, reject) => {
    const header = {
      "Content-Type": "application/json;charset=utf-8",
      ...options.header
      // 允许覆盖默认header
    };
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
        resolve(data);
      },
      // --- 响应失败拦截器逻辑 (网络错误等) ---
      fail: (error) => {
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
  },
  getFile(url, header = {}) {
    const token = common_vendor.index.getStorageSync("token");
    return new Promise((resolve, reject) => {
      common_vendor.index.downloadFile({
        url: BASE_URL + url,
        header: {
          Authorization: token,
          ...header
        },
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
  // 你可以继续封装 upload 等方法
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
