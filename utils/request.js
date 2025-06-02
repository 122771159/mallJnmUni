// utils/request.js

import { useUserStore } from "@/stores"; // 引入你的 pinia store

// 后端接口基础路径
const BASE_URL = import.meta.env.VITE_APP_BASE_API;

// 封装的请求函数
const request = (options) => {
  return new Promise((resolve, reject) => {
    // --- 请求拦截器逻辑 ---
    const header = {
      "Content-Type": "application/json;charset=utf-8",
      ...options.header, // 允许覆盖默认header
    };

    // // 获取并设置token
    // const token = uni.getStorageSync("token");
    // if (token) {
    //   header["Authorization"] = token;
    // }

    uni.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: header,
      timeout: options.timeout || 50000, // 默认50秒超时

      // --- 响应成功拦截器逻辑 ---
      success: (res) => {
        const { data, header: responseHeaders } = res;

        // // 响应头中如果存在新的token，则更新
        // const new_token =
        //   responseHeaders.Authorization || responseHeaders.authorization;
        // if (new_token) {
        //   // 更新 pinia store 和本地存储
        //   useUserStore().setToken(new_token);
        // }

        // 登录失效处理 (code: 104)
        // if (data.code === 104) {
        //   uni.showModal({
        //     title: "提示",
        //     content: "您的登录已失效，请重新登录",
        //     confirmText: "再次登录",
        //     showCancel: false, // 一般不给用户取消的机会
        //     success: (modalRes) => {
        //       if (modalRes.confirm) {
        //         // 清除本地token和store
        //         useUserStore().clearToken();
        //         // 跳转到登录页
        //         uni.navigateTo({
        //           url: "/pages/login/login",
        //         });
        //       }
        //     },
        //   });
        //   // 中断promise链
        //   return reject(new Error("登录失效"));
        // }

        // // 业务逻辑错误处理 (success: false)
        // if (data.success !== undefined && !data.success) {
        //   uni.showToast({
        //     title: data.msg || "操作失败",
        //     icon: "none",
        //     duration: 3000,
        //   });
        //   // 中断promise链
        //   return reject(new Error(data.msg || "操作失败"));
        // }

        // 成功，返回核心数据
        resolve(data);
      },

      // --- 响应失败拦截器逻辑 (网络错误等) ---
      fail: (error) => {
        // uni.showToast({
        //   title: `请求失败: ${error.errMsg || "网络错误"}`,
        //   icon: "none",
        //   duration: 3000,
        // });
        reject(error);
      },
    });
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
    const token = uni.getStorageSync("token");
    return new Promise((resolve, reject) => {
      uni.downloadFile({
        url: BASE_URL + url,
        header: {
          Authorization: token,
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
