"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", () => {
  const token = common_vendor.ref(common_vendor.index.getStorageSync("token") || "");
  const roles = common_vendor.ref(common_vendor.index.getStorageSync("roles") || "");
  const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo") || "");
  function setToken(token_) {
    token_ = "Bearer " + token_;
    common_vendor.index.setStorageSync("token", token_);
    token.value = token_;
  }
  function setRoles(roles_) {
    common_vendor.index.setStorageSync("roles", roles_);
    roles.value = roles_;
  }
  function setUserInfo(userInfo_) {
    userInfo_ = JSON.stringify(userInfo_);
    userInfo.value = userInfo_;
    common_vendor.index.setStorageSync("userInfo", userInfo_);
  }
  function logout() {
    common_vendor.index.removeStorageSync("token");
    common_vendor.index.removeStorageSync("roles");
    common_vendor.index.removeStorageSync("userInfo");
    token.value = "";
    roles.value = "";
    userInfo.value = {};
  }
  const isLogin = common_vendor.computed(() => token.value !== "");
  const getToken = common_vendor.computed(() => token.value);
  const getRoles = common_vendor.computed(() => roles.value);
  const isSales = common_vendor.computed(() => {
    return roles.value.includes("SALES");
  });
  const getUserInfo = common_vendor.computed(() => JSON.parse(userInfo.value));
  return {
    getToken,
    getRoles,
    setToken,
    setRoles,
    logout,
    setUserInfo,
    isLogin,
    isSales,
    getUserInfo
  };
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/index.js.map
