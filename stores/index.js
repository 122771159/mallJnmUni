import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const token = ref(uni.getStorageSync("token") || "");
  const roles = ref(uni.getStorageSync("roles") || "");
  const userInfo = ref(uni.getStorageSync("userInfo") || "");
  function setToken(token_) {
    token_ = "Bearer " + token_;
    uni.setStorageSync("token", token_);
    token.value = token_;
  }
  function setRoles(roles_) {
    uni.setStorageSync("roles", roles_);
    roles.value = roles_;
  }
  function setUserInfo(userInfo_) {
    userInfo_ = JSON.stringify(userInfo_);
    userInfo.value = userInfo_;
    uni.setStorageSync("userInfo", userInfo_);
  }
  function logout() {
    uni.removeStorageSync("token");
    uni.removeStorageSync("roles");
    uni.removeStorageSync("userInfo");
    token.value = "";
    roles.value = "";
    userInfo.value = {};
  }
  const isLogin = computed(() => token.value !== "");
  const getToken = computed(() => token.value);
  const getRoles = computed(() => roles.value);
  const isSales = computed(() => {
    return roles.value.includes("SALES");
  });
  const getUserInfo = computed(() => JSON.parse(userInfo.value));
  return {
    getToken,
    getRoles,
    setToken,
    setRoles,
    logout,
    setUserInfo,
    isLogin,
    isSales,
    getUserInfo,
  };
});
