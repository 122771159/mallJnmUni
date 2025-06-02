<template>
  <view class="product-card">
    <view class="product-info" @click="navShopInfo">
      <view class="title-section">
        <view class="main-title"> {{ product.name }}</view>
      </view>
      <view class="subtitle-section">
        <text class="subtitle-text">剩余库存:{{ product.stock }}</text>
      </view>
    </view>
    <view class="product-details">
      <view class="price-section">
        <view class="estimated-price">
          <text class="currency-symbol">¥</text>
          <text class="price-value">{{ product.displayPrice }}</text>
        </view>
      </view>
      <view class="add-to-cart-section">
        <uv-number-box
          v-model="value"
          min="0"
          :max="product.stock"
          @overlimit="over"
        >
          <template v-slot:minus>
            <view class="minus" v-if="value > 0">
              <uv-icon name="minus" size="12"> </uv-icon>
            </view>
          </template>
          <template v-slot:input>
            <text
              style="width: 35px; text-align: center"
              class="input"
              v-show="value > 0"
            >
              {{ value }}
            </text>
          </template>
          <template v-slot:plus>
            <view class="plus">
              <uv-icon name="plus" color="#FFFFFF" size="12"> </uv-icon>
            </view>
          </template>
        </uv-number-box>
      </view>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  product: {
    type: Object,
    require: true,
  },
});
const store = uni.$com.getStore();

const value = ref(store.getCount(props.product));
watch(
  () => {
    const product = store.cart.find((item) => item.id == props.product.id);
    return product ? product.count : 0;
  },
  (newPrice, oldPrice) => {
    value.value = newPrice;
  }
);
watch(value, (newVal) => {
  store.setCart(props.product, newVal);
});
const over = (e) => {
  if (e == "plus")
    uni.showToast({
      title: "库存不足",
      icon: "none",
    });
};
const navShopInfo = () => {
  uni.navigateTo({
    url: `/pages/product/product?id=${props.product.id}&name=${props.product.name}`,
  });
};
</script>
<style lang="scss" scoped>
.product-card {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-info {
  width: 100%;
}
.title-section {
  .main-title {
    font-size: 17px;
    font-weight: bold;
    color: #333333;
    /* 新增样式开始 */
    word-break: break-all; // 允许在单词内换行，对于连续的长字符或英文单词有效
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 超出部分显示省略号
    // 如果希望它最多显示N行，然后出现省略号 (需要浏览器兼容性支持较好的方案)
    // 可以考虑以下组合，但注意兼容性和效果微调：
    display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
    -webkit-line-clamp: 2; // 限制在一个块元素显示的文本的行数 (这里假设最多2行)
    -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式
    /* 新增样式结束 */
  }
}

.subtitle-section {
  .subtitle-text {
    font-size: 10px;
    color: #888888;
    background-color: #f0f0f0; // 根据图片背景色
    padding: 2px 6px;
    border-radius: 4px;
  }
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; // 使价格和加号按钮底部对齐
}

.price-section {
  display: flex;
  flex-direction: column;
}

.estimated-price {
  display: flex;
  align-items: baseline; // 使得 ¥ 和数字基线对齐

  .currency-symbol {
    font-size: 18px;
    color: #fa3534; // 红色
    font-weight: bold;
    margin-right: 2px;
  }

  .price-value {
    font-size: 18px;
    color: #fa3534; // 红色
    font-weight: bold;
    margin-right: 4px;
  }
}

.add-to-cart-section {
  display: flex;
  align-items: center;
}

// .add-button {
//   width: 20px;
//   height: 20px;
//   background-color: #007aff; // 主题蓝色
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

.minus {
  width: 22px;
  height: 22px;
  border-width: 1px;
  border-color: #e6e6e6;
  border-style: solid;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
}
.input {
  padding: 0;
}
.plus {
  width: 22px;
  height: 22px;
  background-color: #007aff;
  border-radius: 50%;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
}
</style>
