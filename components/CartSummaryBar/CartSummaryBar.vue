<template>
  <view class="cart-summary-bar">
    <view class="summary-left" @click="handleIconClick">
      <view class="cart-icon-container">
        <image
          src="/static/images/cart.gif"
          class="cart-icon-image"
          mode="aspectFit"
        ></image>
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
      <view class="price-details">
        <view class="estimated-total">
          <text class="label">预计到手</text>
          <text class="currency-symbol">¥</text>
          <text class="amount">{{ totalPrice }}</text>
        </view>
        <text class="discount-info">中裕内部商场系统</text>
      </view>
    </view>
    <view class="summary-right">
      <uv-button
        type="primary"
        shape="circle"
        text="去结算"
        custom-style="width: 100px; height: 40px;"
        @click="handleCheckout"
        :disabled="itemCount === 0"
      ></uv-button>
    </view>
  </view>
</template>

<script setup>
const store = uni.$com.getStore();
const totalPrice = computed(() => store.totalPrice);
const totalCount = computed(() => store.totalCount);
const emit = defineEmits(["checkout", "icon-click"]);

const handleCheckout = () => {
  if (props.itemCount > 0) {
    emit("checkout");
  }
};

const handleIconClick = () => {
  emit("icon-click");
};
</script>

<style lang="scss" scoped>
.cart-summary-bar {
  height: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #ffffff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.08);
  z-index: 100; // 确保在页面底部最上层
  padding-bottom: calc(
    10px + constant(safe-area-inset-bottom)
  ); // 适配 iPhone X 等底部安全区域
  padding-bottom: calc(
    10px + env(safe-area-inset-bottom)
  ); // 适配 iPhone X 等底部安全区域
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

.summary-left {
  display: flex;
  align-items: center;
  cursor: pointer; // H5 平台显示手型指针
}

.cart-icon-container {
  position: relative;
  margin-right: 10px;
  width: 40px; // 根据图片实际大小调整
  height: 40px; // 根据图片实际大小调整
  display: flex;
  align-items: center;
  justify-content: center;

  .cart-icon-image {
    width: 100%;
    height: 100%;
  }
}

.price-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.estimated-total {
  display: flex;
  align-items: baseline;
  margin-bottom: 2px;

  .label {
    font-size: 14px;
    color: #303133;
    margin-right: 4px;
  }

  .currency-symbol {
    font-size: 14px;
    color: #fa3534; // 红色
    font-weight: bold;
  }

  .amount {
    font-size: 18px;
    color: #fa3534; // 红色
    font-weight: bold;
  }
}

.discount-info {
  font-size: 11px;
  color: #909399;
}
</style>
