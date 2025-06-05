<template>
  <view class="main-container">
    <view class="selected-header-container">
      <view class="selected-info">
        <text class="info-text">中裕内部商场系统</text>
      </view>
      <view class="clear-action" @click="handleClearCart">
        <uv-icon name="trash" color="#909399" size="16"></uv-icon>
        <text class="clear-text">清空购物车</text>
      </view>
    </view>
    <view class="cart-body">
      <uv-empty
        mode="car"
        icon="/static/images/empty-car.png"
        v-if="store.cart.length === 0"
        text="购物车为空"
      ></uv-empty>
      <view class="item" v-for="(item2, index2) in store.cart" :key="index2">
        <my-BaseImage
          :src="item2.mainImage"
          width="200rpx"
          height="170rpx"
        ></my-BaseImage>
        <view style="width: 100%">
          <my-ShopInfo :product="item2"></my-ShopInfo>
        </view>
      </view>
      <view class="diandi"></view>
    </view>
  </view>
</template>

<script setup>
const store = uni.$com.getStore();

const handleClearCart = () => {
  uni.showModal({
    title: "提示",
    content: "确定清空购物车吗？",
    success: (res) => {
      if (res.confirm) {
        store.clearCart();
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.main-container {
  padding-bottom: calc(30px + constant(safe-area-inset-bottom));
  padding-bottom: calc(30px + env(safe-area-inset-bottom));
}
.item {
  padding: 10rpx 30rpx;
  display: flex;
  gap: 8px;
  height: 170rpx;
  &-title {
    .text {
      font-weight: 700;
      font-size: 32rpx;
      color: #111;
      word-break: break-all;
    }
  }
}
.selected-header-container {
  height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 15px;
  background-color: #ffffff; // 通常背景是白色，具体根据您的页面背景
  border-bottom: 1px solid #f0f0f0; // 图片底部有一条细线
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

.selected-info {
  display: flex;
  align-items: center;

  .info-text {
    margin-left: 15rpx;
    font-size: 14px;
    color: #303133;
  }
}

.clear-action {
  display: flex;
  align-items: center;
  cursor: pointer; // H5 平台显示手型指针

  .uv-icon {
    margin-right: 4px;
  }

  .clear-text {
    font-size: 13px;
    color: #909399;
  }

  &:active {
    opacity: 0.7;
  }
}
.cart-body {
  height: calc(60vh - 45px);
  overflow-y: auto;
}
.diandi {
  height: calc(30px + 40px + constant(safe-area-inset-bottom));
  height: calc(30px + 40px + env(safe-area-inset-bottom));
  width: 100%;
}
</style>
