<template>
  <layout title="结算订单">
    <view class="main-container clearfix" :style="{ height: navHeight }">
      <view class="address-container j-p-12">
        <uv-text
          type="info"
          :text="payUser.username + ':当前使用地址'"
          size="12"
        ></uv-text>
        <view class="j-flex-between j-mt-8">
          <view class="now-address" v-if="!address.id">
            <uv-text
              type="warning"
              text="当前用户未设置默认地址"
              size="1"
            ></uv-text>
          </view>
          <view class="now-address" v-else>
            <uv-text :text="address.address" size="13" :lines="2"></uv-text>
            <uv-text type="info" :text="address.name" size="12"></uv-text>
            <uv-text type="info" :text="address.phone" size="12"></uv-text>
          </view>
          <view class="action" @click="againSelectAddress"> 重新选择 </view>
        </view>
      </view>

      <view class="shop-container j-p-12 j-mt-12 j-mb-12">
        <view class="j-mb-8">
          <uv-text text="商品" size="18" bold></uv-text>
        </view>
        <view class="shop-item j-py-4" v-for="i in cartShopList" :key="i.id">
          <view class="shop-item-left">
            <uv-text :text="i.name" size="13" :lines="1"></uv-text>
          </view>
          <view class="shop-item-center">
            <uv-text :text="'X ' + i.count" size="13" :lines="1"></uv-text>
          </view>
          <view class="shop-item-right">
            <uv-text
              :text="'¥ ' + i.displayPrice"
              size="13"
              :lines="1"
            ></uv-text
          ></view>
        </view>
        <uv-line dashed></uv-line>
        <view class="shop-footer j-mt-12">
          <view>
            <uv-text text="总计" size="15" bold></uv-text>
          </view>
          <view>
            <uv-text :text="'¥ ' + totalPrice" size="15" bold></uv-text>
          </view>
        </view>
      </view>
      <view class="diandi"></view>
    </view>
    <view class="footer">
      <view class="j-flex-1">
        <uv-button type="warning" plain shape="circle" @click="changeShop"
          >修改商品</uv-button
        >
      </view>
      <view class="j-flex-1">
        <uv-button type="warning" shape="circle" @click="submitOrder"
          >下单</uv-button
        >
      </view>
    </view>
  </layout>
</template>

<script setup>
const { navHeight } = uni.$com.getHeight();
const address = ref({});
const store = uni.$com.getStore();
const payUser = computed(() => {
  return store.payUser || {};
});
const totalPrice = computed(() => {
  return store.totalPrice;
});
const cartShopList = computed(() => {
  return store.cart || [];
});
const getAddress = async () => {
  const { data } = await uni.$http.get(`/address/default/${payUser.value.id}`);
  address.value = data;
};
const againSelectAddress = () => {
  const address_id = address.value.id || "";
  uni.navigateTo({
    url: `/pages/address/address?id=${address_id}`,
    events: {
      selectAddress: (data) => {
        address.value = data;
      },
    },
  });
};
const changeShop = () => {
  uni.navigateBack();
};
const submitOrder = () => {
  uni.showModal({
    title: "提示",
    content: "是否确认下单",
    showCancel: true,
    success: ({ confirm, cancel }) => {
      if (confirm) {
        uni.showToast({
          title: "下单成功",
          icon: "success",
          mask: true,
        });
      }
    },
  });
};
onMounted(() => {
  getAddress();
});
</script>

<style lang="scss" scoped>
.main-container {
  background-color: #f6f6f6;
}
.address-container {
  background-color: #fff;
  border-radius: 15px;
  margin: 10px;
}
.shop-container {
  background-color: #fff;
  border-radius: 15px;
  margin: 10px;
  .shop-item {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    .shop-item-left {
      width: 70%;
    }
    .shop-item-center {
      width: 10%;
    }
    .shop-item-right {
      :deep(.uv-text) {
        flex-direction: row-reverse !important;
      }
      width: 20%;
    }
  }
  .shop-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.now-address {
  flex: 1;

  font-size: 13px;
  color: #333;
}
.action {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rpx;
  font-size: 12px;
  color: #3c9cff;
}
.footer {
  position: fixed;
  bottom: 0;
  height: 30px;
  left: 0;
  right: 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  gap: 15px;
}
.diandi {
  height: calc(33px + constant(safe-area-inset-bottom));
  height: calc(33px + env(safe-area-inset-bottom));
}
</style>
