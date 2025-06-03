import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const token = ref(uni.getStorageSync("token") || "");
  const roles = ref(uni.getStorageSync("roles") || "");
  const userInfo = ref(uni.getStorageSync("userInfo") || "");
  const cart = ref(uni.getStorageSync("cart") || []);
  const tokenTimestamp = ref(uni.getStorageSync("tokenTimestamp") || 0);
  const tokenExpiresIn = ref(
    uni.getStorageSync("tokenExpiresIn") || 7200 * 1000
  );
  function addCart(product) {
    //添加商品到购物车
    const index = cart.value.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cart.value[index].count += 1;
    } else {
      product.count = 1;
      cart.value.push(product);
    }
    uni.setStorageSync("cart", cart.value);
  }
  function setCart(product, count) {
    //直接设置某个商品和数量到购物车，
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
    uni.setStorageSync("cart", cart.value);
  }
  function removeCart(product) {
    // 从购物车中移除商品
    const index = cart.value.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cart.value[index].count -= 1;
      if (cart.value[index].count <= 0) {
        cart.value.splice(index, 1);
      }
    }
    uni.setStorageSync("cart", cart.value);
  }
  function clearCart() {
    // 清空购物车
    cart.value = [];
    uni.setStorageSync("cart", cart.value);
  }
  function getCount(product) {
    // 获取购物车中某个商品的数量
    const index = cart.value.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      return cart.value[index].count;
    }
    return 0;
  }
  function setToken(token_) {
    // 设置token
    token_ = "Bearer " + token_;
    uni.setStorageSync("token", token_);
    token.value = token_;
  }
  function setTokenExpiresIn(tokenExpiresIn_) {
    tokenExpiresIn.value = tokenExpiresIn_;
    uni.setStorageSync("tokenExpiresIn", tokenExpiresIn_);
  }
  function setTokenTimestamp(tokenTimestamp_) {
    tokenTimestamp.value = tokenTimestamp_;
    uni.setStorageSync("tokenTimestamp", tokenTimestamp_);
  }
  function setRoles(roles_) {
    // 设置角色
    uni.setStorageSync("roles", roles_);
    roles.value = roles_;
  }
  function setUserInfo(userInfo_) {
    // 设置用户信息
    userInfo_ = JSON.stringify(userInfo_);
    userInfo.value = userInfo_;
    uni.setStorageSync("userInfo", userInfo_);
  }
  function logout() {
    // 退出登录
    uni.removeStorageSync("token");
    uni.removeStorageSync("roles");
    uni.removeStorageSync("userInfo");
    uni.removeStorageSync("tokenTimestamp");
    uni.removeStorageSync("tokenExpiresIn");
    clearCart();
    token.value = "";
    roles.value = "";
    userInfo.value = {};
  }
  function wxlogin() {
    return new Promise((resolve, reject) => {
      // 1. 获取 openId
      uni.$com
        .getOpenId()
        .then((openId) => {
          // 2. 发起登录请求
          uni.$http
            .post("/wxlogin", {
              userType: roles.value,
              openId,
            })
            .then((res) => {
              // 3. 存储登录状态
              setToken(res.data.token);
              setUserInfo(res.data.user);
              setRoles(res.data.roles);
              setTokenExpiresIn(res.data.tokenExpiresIn);
              setTokenTimestamp(Date.now());
              resolve(res.data); // 返回完整数据，方便调用方使用
            })
            .catch((err) => {
              reject(new Error(`微信登录请求失败: ${err.message}`));
            });
        })
        .catch((err) => {
          reject(new Error(`获取 openId 失败: ${err.message}`));
        });
    });
  }
  const isLogin = computed(() => token.value !== ""); // 是否登录
  const getToken = computed(() => token.value); // 获取token
  const getRoles = computed(() => roles.value); // 获取角色
  const isSales = computed(() => {
    // 是否是销售
    return roles.value.includes("SALES");
  });
  const getUserInfo = computed(() => JSON.parse(userInfo.value)); // 获取用户信息
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
    wxlogin,
  };
});
