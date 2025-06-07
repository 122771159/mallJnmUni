<template>
  <layout title="登录">
    <view class="login-container-inner">
      <view class="logo-section">
        <image
          src="/static/logo.png"
          mode="aspectFit"
          class="logo-image"
        ></image>
        <text class="main-title">{{ SITE_NAME }}</text>
      </view>

      <view class="form-section">
        <uv-form :model="form" ref="uForm">
          <uv-form-item prop="username">
            <uv-input
              v-model="form.username"
              placeholder="请输入账号"
              prefixIcon="account-fill"
              border="bottom"
              clearable
            >
            </uv-input>
          </uv-form-item>
          <uv-form-item prop="password">
            <uv-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              prefixIcon="lock-fill"
              border="bottom"
              clearable
            >
            </uv-input>
          </uv-form-item>
          <uv-form-item prop="verifyCode">
            <uv-input
              placeholder="请输入验证码"
              v-model="form.verifyCode"
              clearable
              maxlength="4"
              border="bottom"
            >
              <template v-slot:prefix>
                <uv-icon
                  name="key"
                  custom-prefix="custom-icon"
                  size="18"
                ></uv-icon>
              </template>
              <template v-slot:suffix>
                <image
                  @click="getVerifyCode"
                  :src="verifyImage"
                  mode="scaleToFill"
                  style="width: 85px; height: 35px"
                />
              </template>
            </uv-input>
          </uv-form-item>
        </uv-form>
      </view>

      <view class="button-section">
        <!-- <uv-button type="success" shape="circle" @click="handleWeChatLogin">
          <uv-icon
            name="weixin-fill"
            color="#ffffff"
            size="20"
            customStyle="margin-right: 8px;"
          ></uv-icon>
          微信登录
        </uv-button> -->
        <uv-button type="default" shape="square" @click="handleAccountLogin">
          登录
        </uv-button>
      </view>

      <view class="agreement-section">
        <uv-checkbox-group v-model="agreementChecked">
          <uv-checkbox name="agree" shape="circle" activeColor="#2aac4a">
          </uv-checkbox>
        </uv-checkbox-group>
        <view class="agreement-text">
          我已阅读并同意
          <text class="link" @click="openPolicy">《用户隐私政策》</text>
          和
          <text class="link" @click="openServiceAgreement"
            >《用户服务协议》</text
          >
        </view>
      </view>
      <view class="change-type">
        <uv-button
          :type="userType == 'CUSTOMER' ? 'primary' : 'warning'"
          plain
          shape="square"
          @click="changeType"
          size="small"
        >
          切换登录类型 当前:{{ userType == "CUSTOMER" ? "客户" : "业务员" }}
        </uv-button>
      </view>
    </view>
  </layout>
</template>

<script setup>
import { ref } from "vue";
import md5 from "js-md5";
import { useUserStore } from "@/stores";
const SITE_NAME = uni.$com.env().SITE_NAME;
// 表单数据
const userType = ref("CUSTOMER");
const form = ref({
  username: "addmin22",
  password: "addmin22",
  verifyCode: "",
  verifyKey: "",
});
const verifyImage = ref("");
// 协议勾选状态
const agreementChecked = ref([]);
const navigationSource = ref("");
onLoad(() => {
  const pages = getCurrentPages();
  const pageStackLength = pages.length;
  if (pageStackLength === 1) {
    navigationSource.value = "reLaunch";
  } else {
    navigationSource.value = "navigateTo";
  }
});
// 微信登录处理
// const handleWeChatLogin = async () => {
//   if (!agreementChecked.value.includes("agree")) {
//     uni.$com.toast({
//       type: "error",
//       icon: true,
//       message: "请先阅读并同意用户协议",
//     });
//     return;
//   }
//   // 登录中
//   uni.$com.toast({
//     type: "loading",
//     title: "登录中",
//     message: "登录中",
//   });
//   uni.login({
//     provider: "weixin",
//     success: async function (loginRes) {
//       const { data: openId } = await uni.$http.get(
//         `/wx/getOpenid/${loginRes.code}`
//       );
//       uni.$http
//         .post("/login", {
//           userType: "CUSTOMER",
//           openId,
//         })
//         .then((res) => {
//           saveToken(res);
//           uni.$com.toastHide();
//           uni.$com.toast({
//             type: "success",
//             message: "登录成功",
//           });
//           setTimeout(() => {
//             uni.reLaunch({
//               url: "/pages/user/user",
//             });
//           }, 1000);
//         })
//         .catch(() => {
//           uni.$com.toastHide();
//         });
//     },
//     fail: function () {
//       uni.$com.toastHide();
//       uni.$com.toast({
//         type: "error",
//         message: "登录失败",
//       });
//     },
//   });
// if (loginErr) {
//   uni.$com.toast({
//     type: "error",
//     icon: true,
//     message: "微信登录失败",
//   });
// }
// console.log(loginRes);
// const [getUserInfoErr, getUserInfoRes] = await uni.getUserProfile({
//   desc: "获取用户信息",
// });
// if (getUserInfoErr) {
//   uni.$com.toast({
//     type: "error",
//     icon: true,
//     message: "获取用户信息失败",
//   });
// }

// console.log(getUserInfoRes);
// };
const getVerifyCode = async () => {
  const res = await uni.$http.get("/verify");
  verifyImage.value = res.data.image;
  form.value.verifyKey = res.data.key;
};
// 账号登录处理
const handleAccountLogin = async () => {
  uni.$com.toast(
    {
      type: "loading",
      title: "正在加载",
      message: "正在加载",
    },
    true
  );
  if (!agreementChecked.value.includes("agree")) {
    const flag = await showPolicy();
    if (!flag) {
      return;
    }
  }
  if (!form.value.verifyCode) {
    uni.$com.toast({
      type: "error",
      icon: false,
      message: "验证码不能为空",
    });
    return;
  }
  if (!form.value.username) {
    uni.$com.toast({
      type: "error",
      icon: false,
      message: "账号不能为空",
    });
    return;
  }
  if (!form.value.password) {
    uni.$com.toast({
      type: "error",
      icon: false,
      message: "密码不能为空",
    });
    return;
  }

  try {
    const openId = await uni.$com.getOpenId();
    const res = await uni.$http.post("/login", {
      ...form.value,
      userType: userType.value,
      password: md5(form.value.password),
      openId,
    });
    saveToken(res);
    uni.$com.toast({
      type: "success",
      message: "登录成功",
    });
    setTimeout(() => {
      const redirect = uni.getStorageSync("redirect");
      uni.removeStorageSync("redirect");
      if (redirect) {
        uni.reLaunch({
          url: redirect,
        });
      } else {
        if (navigationSource.value === "navigateTo") {
          uni.navigateBack();
        } else {
          uni.reLaunch({
            url: "/pages/index/index",
          });
        }
      }
    }, 500);
  } catch (error) {
    console.log(error);

    getVerifyCode();
  }
};

const openPolicy = () => {
  uni.navigateTo({
    url: "/pages/policy/privacy",
  });
};

const openServiceAgreement = () => {
  uni.navigateTo({
    url: "/pages/policy/service",
  });
};
const showPolicy = () => {
  return new Promise((resolve) => {
    uni.showModal({
      title: "用户协议",
      content: "未登录用户请先阅读并同意用户协议,是否阅读并同意",
      confirmText: "同意",
      confirmColor: "#2aac4a",
      success: (res) => {
        if (res.confirm) {
          agreementChecked.value.push("agree");
          resolve(true);
        } else {
          resolve(false);
        }
      },
    });
  });
};
const saveToken = (res) => {
  useUserStore().setToken(res.data.token);
  useUserStore().setUserInfo(res.data.user);
  useUserStore().setRoles(res.data.roles);
  useUserStore().setTokenExpiresIn(res.data.tokenExpiresIn);
  useUserStore().setTokenTimestamp(Date.now());
  useUserStore().setTokenFreeTimeout(res.data.tokenFreeTimeout);
  if (res.data.roles == "CUSTOMER") {
    useUserStore().setPayUser(res.data.user);
  }
};
const changeType = () => {
  if (userType.value == "CUSTOMER") {
    userType.value = "";
    return;
  }
  if (userType.value == "") {
    userType.value = "CUSTOMER";
    return;
  }
};
onMounted(() => {
  getVerifyCode();
});
</script>

<style lang="scss" scoped>
// login-container-inner 用于在 layout 内部进行布局
.login-container-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 尝试让内容在垂直方向上更居中
  padding: 28px; // 内边距，避免内容贴边
  padding-top: 20px; // 考虑到 Navbar,适当减少顶部内边距
  box-sizing: border-box;
  // min-height: calc(100vh - var(--status-bar-height) - 44px); // 减去navbar高度，如果layout内部已处理则不需要
  // background-color: #f7f8fa; // 如果 layout 未提供背景色
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px; // 顶部留白
  margin-bottom: 40px; // 与表单间距
}

.logo-image {
  width: 90px; // 根据您的logo图片实际尺寸调整
  height: 90px; // 根据您的logo图片实际尺寸调整
  // border-radius: 50%; // 如果您的logo本身不是圆形，但希望显示为圆形，可以取消注释
  // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.main-title {
  font-size: 20px;
  color: #333;
  margin-top: 15px; // logo图片与主标题间距
  font-weight: bold;
}

.form-section {
  width: 100%;
  max-width: 380px; // 限制表单最大宽度，使其在大屏幕上不会过宽
  margin-bottom: 20px;

  .uv-form-item {
    margin-bottom: 25px;
  }

  ::v-deep .uv-input {
    background-color: #ffffff;
  }
  ::v-deep .uv-input__content__prefix-icon {
    margin-right: 5px;
  }
}

.button-section {
  width: 100%;
  max-width: 380px; // 限制按钮区域最大宽度
  margin-bottom: 25px;

  .uv-button {
    height: 44px;
    font-size: 16px;
  }

  ::v-deep .uv-button--default {
    background-color: #f0f0f0;
    color: #333333;
  }
}
.change-type {
  margin-top: 25px;
}
.agreement-section {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #888;
  width: 100%;
  justify-content: center;
  text-align: center; // 确保换行时也居中

  // .uv-checkbox-group {
  //   margin-right: 5px;
  //   // flex-shrink: 0; // 防止checkbox被压缩
  // }
}

.agreement-text {
  width: 100%;
  line-height: 1.5;
  display: flex; // 改为flex布局以更好地控制换行和对齐
  // flex-wrap: wrap; // 允许换行
  justify-content: center; // 文本内容居中
  align-items: center;

  .link {
    color: #2a79ff;
    text-decoration: none;
  }
}
</style>
