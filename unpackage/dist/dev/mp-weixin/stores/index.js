"use strict";
const common_vendor = require("../common/vendor.js");
const useAdminStore = common_vendor.defineStore("admin", () => {
  const token = common_vendor.ref(common_vendor.index.getStorageSync("token") || "");
  const roles = common_vendor.ref(common_vendor.index.getStorageSync("roles") || "");
  const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo") || "");
  function setToken(token_) {
    token_ = "Bearer " + token_;
    localStorage.setItem("token", token_);
    token.value = token_;
  }
  function setRoles(roles_) {
    localStorage.setItem("roles", roles_);
    roles.value = roles_;
  }
  function setUserInfo(userInfo_) {
    userInfo_ = JSON.stringify(userInfo_);
    userInfo.value = userInfo_;
    localStorage.setItem("userInfo", userInfo_);
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("userInfo");
    token.value = "";
    roles.value = "";
  }
  const isLogin = common_vendor.computed(() => token.value !== "");
  const getToken = common_vendor.computed(() => token.value);
  const getRoles = common_vendor.computed(() => JSON.parse(roles.value));
  const isAdmin = common_vendor.computed(() => {
    return getRoles.value.some((role) => role.includes("ADMIN"));
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
    isAdmin,
    getUserInfo
  };
});
exports.useAdminStore = useAdminStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/index.js.map
