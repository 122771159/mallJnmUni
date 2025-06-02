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
    <slot></slot>
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
});
const navigationSource = ref();

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
  uni.reLaunch({
    url: "/pages/user/user",
  });
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
</style>
