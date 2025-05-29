<template>
  <view>
    <uv-navbar :title="title" :placeholder="true">
      <template v-slot:left>
        <view class="uv-nav-slot" v-if="!hiddenLeft">
          <uv-icon
            name="arrow-left"
            size="24"
            @click="leftClick"
            v-if="!hiddenLeftArrow"
          ></uv-icon>
          <uv-line
            direction="column"
            :hairline="false"
            length="20"
            margin="0 8px"
            v-if="!hiddenLeftArrow && !hiddenLeftHome"
          ></uv-line>
          <uv-icon
            name="home"
            size="24"
            @click="bacHome"
            v-if="!hiddenLeftHome"
          ></uv-icon>
        </view>
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
  hiddenLeft: {
    type: Boolean,
    default: false,
  },
  hiddenLeftArrow: {
    type: Boolean,
    default: false,
  },
  hiddenLeftHome: {
    type: Boolean,
    default: false,
  },
});

const toastRef = ref(null);

const handleShowToast = (params) => {
  if (toastRef.value) {
    toastRef.value.show({
      ...params,
    });
  }
};
const bacHome = () => {
  uni.reLaunch({
    url: "/pages/index/index",
  });
};
onMounted(() => {
  uni.$on("show-toast", handleShowToast);
});

onUnmounted(() => {
  uni.$off("show-toast", handleShowToast);
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
