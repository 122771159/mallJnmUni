// utils/request.js

import { useUserStore } from "@/stores"; // 引入你的 pinia store

// 后端接口基础路径
const BASE_URL = import.meta.env.VITE_APP_BASE_API;

// // 封装的请求函数
// const request = (options) => {
//   return new Promise((resolve, reject) => {
//     // --- 请求拦截器逻辑 ---
//     const header = {
//       "Content-Type": "application/json;charset=utf-8",
//       ...options.header, // 允许覆盖默认header
//     };
//     uni.request({
//       url: BASE_URL + options.url,
//       method: options.method || "GET",
//       data: options.data || {},
//       header: header,
//       timeout: options.timeout || 50000, // 默认50秒超时
//       success: (res) => {
//         const { data } = res;
//         resolve(data);
//       },
//       fail: (error) => {
//         console.log("请求失败", error);
//         reject(error);
//       },
//     });
//   });
// };
const request = async (options) => {
  // 不再需要手动 new Promise 来包裹
  const header = {
    "Content-Type": "application/json;charset=utf-8",
    ...options.header, // 允许覆盖默认header
  };
  return uni
    .request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: header,
      timeout: options.timeout || 50000,
    })
    .then((res) => {
      const { data } = res;
      if (data.success !== undefined && !data.success) {
        uni.$com.toastHide();
        uni.showToast({
          title: data.msg || "操作失败",
          icon: "error",
          duration: 3000,
        });
        return Promise.reject(new Error(data.msg || "操作失败"));
      }
      return Promise.resolve(data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
// 导出封装好的方法
const http = {
  get(url, params = {}, header = {}) {
    return request({
      url,
      method: "GET",
      data: params,
      header,
    });
  },
  post(url, data = {}, header = {}) {
    return request({
      url,
      method: "POST",
      data,
      header,
    });
  },
  put(url, data = {}, header = {}) {
    return request({
      url,
      method: "PUT",
      data,
      header,
    });
  },
  delete(url, data = {}, header = {}) {
    return request({
      url,
      method: "DELETE",
      data,
      header,
    });
  },
  getFile(url, header = {}) {
    // const token = uni.getStorageSync("token");
    return new Promise((resolve, reject) => {
      uni.downloadFile({
        url: BASE_URL + url,
        header: {
          // Authorization: token,
          ...header,
        },
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },
  // 你可以继续封装 upload 等方法
};

export default http;
