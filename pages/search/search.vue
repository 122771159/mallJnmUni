<template>
  <layout needLogin>
    <template v-slot:layout-left>
      <view class="search-container">
        <uv-icon name="arrow-left" size="24" @click="leftClick"></uv-icon>
        <view>
          <uv-search
            placeholder="请输入搜索内容"
            v-model="keyword"
            @custom="search"
            @search="search"
          ></uv-search>
        </view>
      </view>
    </template>
    <view class="main-container" :style="{ height: navHeight }">
      <uv-empty
        mode="car"
        icon="/static/images/empty.png"
        v-if="products.length === 0"
        text="暂无搜索结果"
      ></uv-empty>
      <view class="item" v-for="(item2, index2) in products" :key="index2">
        <my-BaseImage
          :src="item2.mainImage"
          width="200rpx"
          height="170rpx"
        ></my-BaseImage>
        <view style="width: 100%">
          <my-ShopInfo :product="item2"></my-ShopInfo>
        </view>
      </view>
      <my-DianDi></my-DianDi>
    </view>
  </layout>
</template>

<script setup>
const keyword = ref("");
const navHeight = uni.$com.getHeight().navHeight;
const leftClick = () => {
  uni.navigateBack();
};
const products = ref([]);
const search = async () => {
  if (!keyword.value) {
    uni.showToast({
      title: "关键词不能为空",
      icon: "none",
    });
    return;
  }
  const { data } = await uni.$http.get("/wx/product-search", {
    keyword: keyword.value,
  });
  products.value = [...data, ...data, ...data, ...data, ...data, ...data];
};
</script>

<style lang="scss" scoped>
.search-container {
  width: 532rpx;
  display: flex;
  gap: 5px;
}
.main-container {
  overflow: auto;
  background-color: #f5f5f5;
}
.item {
  padding: 10rpx 20rpx;
  display: flex;
  gap: 8px;
  height: 170rpx;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px 10px 0 10px;
  &-title {
    .text {
      font-weight: 700;
      font-size: 32rpx;
      color: #111;
      word-break: break-all;
    }
  }
}
</style>
