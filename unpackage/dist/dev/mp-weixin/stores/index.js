"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", () => {
  const token = common_vendor.ref(common_vendor.index.getStorageSync("token") || "");
  const roles = common_vendor.ref(common_vendor.index.getStorageSync("roles") || "");
  const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo") || "");
  const cart = common_vendor.ref(common_vendor.index.getStorageSync("cart") || []);
  const tokenTimestamp = common_vendor.ref(common_vendor.index.getStorageSync("tokenTimestamp") || 0);
  const tokenExpiresIn = common_vendor.ref(
    common_vendor.index.getStorageSync("tokenExpiresIn") || 7200 * 1e3
  );
  function addCart(product) {
    const index = cart.value.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cart.value[index].count += 1;
    } else {
      product.count = 1;
      cart.value.push(product);
    }
    common_vendor.index.setStorageSync("cart", cart.value);
  }
  function setCart(product, count) {
    product.count = count;
    const index = cart.value.findIndex((item) => item.id === product.id);
    if (count > 0) {
      if (index !== -1) {
        cart.value[index] = product;
      } else {
        cart.value.push(product);
      }
    } else {
      if (index !== -1) {
        cart.value.splice(index, 1);
      }
    }
    common_vendor.index.setStorageSync("cart", cart.value);
  }
  function removeCart(product) {
    const index = cart.value.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cart.value[index].count -= 1;
      if (cart.value[index].count <= 0) {
        cart.value.splice(index, 1);
      }
    }
    common_vendor.index.setStorageSync("cart", cart.value);
  }
  function clearCart() {
    cart.value = [];
    common_vendor.index.setStorageSync("cart", cart.value);
  }
  function getCount(product) {
    const index = cart.value.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      return cart.value[index].count;
    }
    return 0;
  }
  function setToken(token_) {
    token_ = "Bearer " + token_;
    common_vendor.index.setStorageSync("token", token_);
    token.value = token_;
  }
  function setTokenExpiresIn(tokenExpiresIn_) {
    tokenExpiresIn.value = tokenExpiresIn_;
    common_vendor.index.setStorageSync("tokenExpiresIn", tokenExpiresIn_);
  }
  function setTokenTimestamp(tokenTimestamp_) {
    tokenTimestamp.value = tokenTimestamp_;
    common_vendor.index.setStorageSync("tokenTimestamp", tokenTimestamp_);
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
    common_vendor.index.removeStorageSync("tokenTimestamp");
    common_vendor.index.removeStorageSync("tokenExpiresIn");
    clearCart();
    token.value = "";
    roles.value = "";
    userInfo.value = {};
  }
  function wxlogin() {
    return new Promise((resolve, reject) => {
      common_vendor.index.$com.getOpenId().then((openId) => {
        common_vendor.index.$http.post("/wxlogin", {
          userType: roles.value,
          openId
        }).then((res) => {
          setToken(res.data.token);
          setUserInfo(res.data.user);
          setRoles(res.data.roles);
          setTokenExpiresIn(res.data.tokenExpiresIn);
          setTokenTimestamp(Date.now());
          resolve(res.data);
        }).catch((err) => {
          reject(new Error(`微信登录请求失败: ${err.message}`));
        });
      }).catch((err) => {
        reject(new Error(`获取 openId 失败: ${err.message}`));
      });
    });
  }
  const isLogin = common_vendor.computed(() => token.value !== "");
  const getToken = common_vendor.computed(() => token.value);
  const getRoles = common_vendor.computed(() => roles.value);
  const isSales = common_vendor.computed(() => {
    return roles.value.includes("SALES");
  });
  const getUserInfo = common_vendor.computed(() => JSON.parse(userInfo.value));
  return {
    token,
    getToken,
    getRoles,
    setToken,
    setRoles,
    logout,
    setUserInfo,
    isLogin,
    isSales,
    getUserInfo,
    addCart,
    removeCart,
    clearCart,
    getCount,
    cart,
    setCart,
    setTokenExpiresIn,
    setTokenTimestamp,
    tokenTimestamp,
    tokenExpiresIn,
    wxlogin
  };
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/index.js.map
