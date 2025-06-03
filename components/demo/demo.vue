<template>
  <view class="login-protected-content-wrapper">
    <template v-if="isContentActive"> <slot></slot> </template>
    <template v-else-if="props.needLoginProtection">
      <view :style="{ height: navHeight }" class="need-login-prompt-view">
        <image
          class="icon-image"
          src="/static/images/noLogin.png"
          mode="aspectFit"
          style="width: 300rpx; height: 300rpx; margin-bottom: 20px"
        ></image>
        <text class="tip-text">您当前尚未登录</text>
        <text class="sub-tip-text">登录后即可体验更完整的功能服务</text>
        <uv-button
          type="primary"
          text="去登录"
          @click="goToLoginPage"
          class="login-button"
          size="normal"
          shape="circle"
          :customStyle="{ width: '200px', marginTop: '20px' }"
        ></uv-button>
      </view>
    </template>
  </view>
</template>

<script setup>
import { ref, watch, computed, defineProps, onMounted } from "vue";

const props = defineProps({
  // 属性名改为 needLoginProtection 以区别于 Layout 组件可能已有的 needLogin，避免混淆
  needLoginProtection: {
    type: Boolean,
    default: false, // 默认情况下，内容不需要登录保护
  },
});

// 1. 获取并监听登录状态
const store = uni.$com.getStore(); // 假设这是您获取 Pinia store 的方式
const isLoggedInState = ref(store.isLogin);

watch(
  () => store.isLogin,
  (newVal) => {
    isLoggedInState.value = newVal;
  }
);

// 2. 计算内容是否应该激活并显示
const isContentActive = computed(() => {
  if (!props.needLoginProtection) {
    return true; // 如果此内容区域不需要登录保护，则始终激活
  }
  return isLoggedInState.value; // 否则，其激活状态取决于用户的实际登录状态
});

// 动态计算内容区域的高度，以便登录提示可以撑满类似的高度
// 这部分是可选的，取决于您希望“未登录”提示占据多大空间
const contentHeight = ref("auto");
const { navHeight } = uni.$com.getHeight(); // 从您的 composables 获取高度

onMounted(() => {
  // 假设内容至少占据屏幕高度减去导航栏和状态栏的高度
  // 您可以根据实际情况调整这个计算逻辑
  // contentHeight.value = `${windowHeight - statusBarHeight - navBarHeight}px`;
  // 或者，如果这个组件通常填充父容器的剩余空间，可以保持 'auto' 或设置一个最小高度
  contentHeight.value = `calc(100vh - ${
    statusBarHeight + navBarHeight
  }px - 20px)`; // 减去一些padding
});

const goToLoginPage = () => {
  uni.navigateTo({
    url: "/pages/login/login", // 确保这是您正确的登录页路径
  });
};
</script>

<style lang="scss" scoped>
.login-protected-content-wrapper {
  width: 100%;
  height: 100%; // 尝试让包装器填充可用空间
}
.need-login-prompt-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  // min-height: 300px; // 给一个最小高度
  // 您可以从 Layout 组件的样式中复制或调整这里的样式
}

.icon-image {
  // 样式已内联，可以移到这里
}

.tip-text {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}

.sub-tip-text {
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
}

.login-button {
  // 样式已内联
}
</style>
