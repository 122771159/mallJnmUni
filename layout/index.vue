<template>
  <view>
    <uv-navbar :title="title" :placeholder="true">
      <template v-slot:left>
        <slot name="layout-left">
          <view class="uv-nav-slot" v-if="!hiddenAllStrong">
            <uv-icon
              name="arrow-left"
              size="24"
              @click="leftClick"
              v-if="getIsHiidenLeft()"
            ></uv-icon>
            <uv-line
              direction="column"
              :hairline="false"
              length="20"
              margin="0 8px"
              v-if="getIsHiidenCenter()"
            ></uv-line>
            <uv-icon
              name="home"
              size="24"
              @click="bacHome"
              v-if="getIsHiidenRight()"
            ></uv-icon>
          </view>
        </slot>
      </template>
      <template v-slot:center>
        <slot name="layout-center">
          <text style="font-size: 16px; font-weight: bold" v-if="title">{{
            title
          }}</text>
        </slot>
      </template>
    </uv-navbar>
    <uv-toast ref="toastRef"></uv-toast>
    <template v-if="needLogin && !isLogin">
      <view :style="{ height: navHeight }" class="need-login-view">
        <image
          class="icon-image"
          src="/static/images/noLogin.png"
          mode="aspectFit"
          style="width: 500rpx; height: 500rpx"
        ></image>
        <text class="tip-text">您当前尚未登录</text>
        <text class="sub-tip-text">登录后即可体验更完整的功能服务</text>
        <uv-button
          type="primary"
          text="去登录"
          @click="goToLogin"
          class="login-button"
          size="large"
          shape="circle"
        ></uv-button>
      </view>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const prop = defineProps({
  title: {
    type: String,
    required: true,
  },
  leftClick: {
    type: Function,
    default: () => {
      uni.navigateBack();
    },
  },
  hiddenLeftStrong: {
    type: Boolean,
    default: false,
  },
  hiddenRightStrong: {
    type: Boolean,
    default: false,
  },
  hiddenAllStrong: {
    type: Boolean,
    default: false,
  },
  needLogin: {
    type: Boolean,
    default: false,
  },
});
const navigationSource = ref();
const { navHeight } = uni.$com.getHeight();
const store = uni.$com.getStore();
const isLogin = ref(store.isLogin);
watch(
  () => store.isLogin,
  (newVal) => {
    if (!prop.needLogin) return;
    isLogin.value = newVal;
    // if (!isLogin.value) {
    //   uni.showModal({
    //     title: "提示",
    //     content: "请登录",
    //     showCancel: false,
    //     success: ({ confirm, cancel }) => {
    //       if (confirm) {
    //         uni.navigateTo({ url: "/pages/login/login" });
    //       }
    //     },
    //   });
    // }
  },
  { immediate: true }
);
// false 代表隐藏
const getIsHiidenLeft = () => {
  if (prop.hiddenAllStrong) return false;
  if (prop.hiddenLeftStrong) return false;
  if (navigationSource.value == "reLaunch") return false;
  return true;
};
const getIsHiidenRight = () => {
  if (prop.hiddenAllStrong) return false;
  if (prop.hiddenRightStrong) return false;
  return true;
};
const getIsHiidenCenter = () => {
  if (getIsHiidenLeft() && getIsHiidenRight()) return true;
  return false;
};
const goToLogin = () => {
  uni.navigateTo({ url: "/pages/login/login" });
};
const toastRef = ref(null);
const handleShowToast = (params) => {
  if (toastRef.value) {
    toastRef.value.show({
      ...params,
    });
  }
};
const hide = () => {
  if (toastRef.value) {
    toastRef.value.hide();
  }
};
const bacHome = () => {
  if (store.isLogin) {
    uni.reLaunch({
      url: "/pages/index/index",
    });
  } else {
    uni.reLaunch({ url: "/pages/user/user" });
  }
};
onLoad(() => {
  const pages = getCurrentPages();
  const pageStackLength = pages.length;
  console.log("当前页面栈层级:", pageStackLength);
  // console.log('当前页面路由:', this.route); // 获取当前页面路由

  if (pageStackLength === 1) {
    navigationSource.value = "reLaunch";
    console.log("此页面可能是通过 uni.reLaunch 打开，或者是应用的初始启动页。");
    // 在这里执行针对 reLaunch 的逻辑
    // 例如：可能不显示返回按钮，或者需要加载完整数据
  } else if (pageStackLength > 1) {
    navigationSource.value = "navigateTo";
    console.log("此页面可能是通过 uni.navigateTo 打开。");
    // 在这里执行针对 navigateTo 的逻辑
    // 例如：显示返回按钮，或者从上一页获取参数进行增量更新
  } else {
    // 理论上 pageStackLength 至少为 1 (当前页面本身)
    console.warn("获取页面栈层级异常!");
  }
});
onMounted(() => {
  uni.$on("show-toast", handleShowToast);
  uni.$on("hide-toast", hide);
});

onUnmounted(() => {
  uni.$off("show-toast", handleShowToast);
  uni.$off("hide-toast", hide);
});
</script>
<style scoped lang="scss">
@mixin flex($direction: row) {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: $direction;
}

.uv-nav-slot {
  @include flex;
  border-style: solid;
  align-items: center;
  justify-content: space-between;
  border-width: 0.5px;
  border-radius: 100px;
  border-color: #dadbde;
  padding: 3px 7px;
  opacity: 0.8;
}
.need-login-view {
  @include flex;
  align-items: center;
  flex-direction: column;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px;
  background-color: #ffffff; // 卡片式背景
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); // 轻微阴影效果
}

.icon-image {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  // 确保您的 /static/images/unlogin_icon.png 路径下有对应的图标文件
  // 如果没有，可以暂时移除此行，或替换为 uv-icon 等其他图标方案
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
  margin-bottom: 30px;
}

.login-button {
  width: 100%; // 按钮宽度充满内容区域
  max-width: 280px; // 给按钮一个最大宽度，避免在大屏上过宽
  // uv-button 已经有很多内置样式，这里可以按需调整
  // 例如，如果想自定义按钮颜色，可以在 uv-button 上设置 customStyle
}
</style>
