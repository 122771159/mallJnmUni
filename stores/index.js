import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", () => {
  const token = ref(uni.getStorageSync("token") || "");
  const roles = ref(uni.getStorageSync("roles") || "");
  const userInfo = ref(uni.getStorageSync("userInfo") || "");
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
  const isLogin = computed(() => token.value !== "");
  const getToken = computed(() => token.value);
  const getRoles = computed(() => JSON.parse(roles.value));
  const isAdmin = computed(() => {
    return getRoles.value.some((role) => role.includes("ADMIN"));
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
    isAdmin,
    getUserInfo,
  };
});
