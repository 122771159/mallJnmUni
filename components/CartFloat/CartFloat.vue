<template>
  <view
    class="float"
    :style="{ bottom: bottomHeight + 10 + 'px', right: right + 'px' }"
    @click="openPopup"
  >
    <view class="cart-float-content">
      <view class="cart-float-content-item">
        <view class="cart-float-content-item-img">
          <image src="/static/images/cart.gif" />
        </view>
      </view>
      <uv-badge
        type="error"
        :value="totalCount"
        :is-dot="false"
        :absolute="true"
        :offset="[-2, -2]"
        class="cart-badge"
        v-if="totalCount > 0"
      ></uv-badge>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  right: {
    type: Number,
    default: 20,
  },
});
const { bottomHeight } = uni.$com.getHeight();
const emit = defineEmits(["openPopup"]);
const store = uni.$com.getStore();
const totalCount = computed(() => store.totalCount);
const openPopup = () => {
  emit("openPopup");
};
</script>

<style lang="scss" scoped>
.float {
  position: fixed;

  z-index: 999;

  .cart-float-content {
    &-item {
      width: 50px;
      height: 50px;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;

      &-img {
        width: 30px;
        height: 30px;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
