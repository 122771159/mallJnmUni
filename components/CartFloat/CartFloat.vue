<template>
  <view
    class="float"
    :style="{ bottom: bottomHeight + 10 + 'px' }"
    @click="openPopup"
  >
    <view class="cart-float-content">
      <view class="cart-float-content-item">
        <view class="cart-float-content-item-img">
          <image src="/static/images/cart.gif" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const { bottomHeight } = uni.$com.getHeight();
const emit = defineEmits(["openPopup"]);
const openPopup = () => {
  emit("openPopup");
};
</script>

<style lang="scss" scoped>
.float {
  position: fixed;
  right: 20px;

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
