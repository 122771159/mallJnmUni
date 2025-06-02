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
              clearable
            >
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
        <uv-button
          type="default"
          shape="circle"
          @click="handleAccountLogin"
          customStyle="margin-top: 15px;"
        >
          账号登录
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
    </view>
  </layout>
</template>

<script setup>
import { ref } from "vue";
import md5 from "js-md5";
import { useUserStore } from "@/stores";
const SITE_NAME = uni.$com.env().SITE_NAME;
console.log(SITE_NAME);
// 表单数据
const form = ref({
  username: "",
  password: "",
});

// 协议勾选状态
const agreementChecked = ref([]);

// 微信登录处理
const handleWeChatLogin = async () => {
  if (!agreementChecked.value.includes("agree")) {
    uni.$com.toast({
      type: "error",
      icon: true,
      message: "请先阅读并同意用户协议",
    });
    return;
  }
  // 登录中
  uni.$com.toast({
    type: "loading",
    title: "登录中",
    message: "登录中",
  });
  uni.login({
    provider: "weixin",
    success: async function (loginRes) {
      const { data: openId } = await uni.$http.get(
        `/wx/getOpenid/${loginRes.code}`
      );
      uni.$http
        .post("/login", {
          userType: "CUSTOMER",
          openId,
        })
        .then((res) => {
          saveToken(res);
          uni.$com.toastHide();
          uni.$com.toast({
            type: "success",
            message: "登录成功",
          });
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/user/user",
            });
          }, 1000);
        })
        .catch(() => {
          uni.$com.toastHide();
        });
    },
    fail: function () {
      uni.$com.toastHide();
      uni.$com.toast({
        type: "error",
        message: "登录失败",
      });
    },
  });
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
};

// 账号登录处理
const handleAccountLogin = () => {
  if (!agreementChecked.value.includes("agree")) {
    uni.$com.toast({
      type: "error",
      icon: true,
      message: "请先阅读并同意用户协议",
    });
    return;
  }
  uni.$http
    .post("/login", {
      ...form.value,
      userType: "CUSTOMER",
      password: md5(form.value.password),
    })
    .then((res) => {
      saveToken(res);
      uni.$com.toast({
        type: "success",
        icon: true,
        message: "登录成功",
      });
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/user/user",
        });
      }, 1000);
    });
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
const saveToken = (res) => {
  useUserStore().setToken(res.data.token);
  useUserStore().setUserInfo(res.data.user);
  useUserStore().setRoles(res.data.roles);
  useUserStore().setTokenExpiresIn(res.data.tokenExpiresIn);
  useUserStore().setTokenTimestamp(Date.now());
};
</script>

<style lang="scss" scoped>
// login-container-inner 用于在 layout 内部进行布局
.login-container-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 尝试让内容在垂直方向上更居中
  padding: 40px; // 内边距，避免内容贴边
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
  margin-bottom: 30px;

  .uv-form-item {
    margin-bottom: 20px;
  }

  ::v-deep .uv-input {
    background-color: #ffffff;
    border-radius: 22px;
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

.agreement-section {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #888;
  width: 100%;
  max-width: 380px; // 限制协议区域最大宽度
  justify-content: center;
  text-align: center; // 确保换行时也居中

  .uv-checkbox-group {
    margin-right: 5px;
    // flex-shrink: 0; // 防止checkbox被压缩
  }
}

.agreement-text {
  line-height: 1.5;
  display: flex; // 改为flex布局以更好地控制换行和对齐
  flex-wrap: wrap; // 允许换行
  justify-content: center; // 文本内容居中
  align-items: center;

  .link {
    color: #2a79ff;
    text-decoration: none;
    padding: 0 2px; // 给链接之间一些空间
  }
}
</style>
