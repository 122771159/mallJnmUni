<template>
  <layout title="首页" hiddenAllStrong needLogin>
    <uv-search
      placeholder="请输入搜索内容"
      :showAction="false"
      margin="10rpx 30rpx 10rpx 30rpx"
      disabled
      @click="search"
    ></uv-search>
    <my-ShopList></my-ShopList>
    <my-tabber></my-tabber>
    <my-CartFloat @openPopup="openPopup"></my-CartFloat>
    <uv-popup
      ref="popup"
      mode="bottom"
      customStyle="min-height:300px;max-height:60vh"
    >
      <view>
        <my-CartShow></my-CartShow>
        <my-CartSummaryBar></my-CartSummaryBar>
      </view>
    </uv-popup>
  </layout>
</template>

<script setup>
const popup = ref(null);

const openPopup = () => {
  popup.value.open();
};

const search = () => {
  uni.navigateTo({
    url: "/pages/search/search",
  });
};
</script>

<style>
.logo {
  height: 200rpx;
  width: 200rpx;
}
</style>
