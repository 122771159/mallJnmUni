<template>
  <view class="content" :style="{ height: tabberFreeHeight - 44 + 'px' }">
    <uv-vtabs
      :chain="chain"
      :list="list"
      :barItemBadgeStyle="{ right: '20px', top: '12px' }"
      :height="tabberFreeHeight - 44"
      @change="change"
      barWidth="165rpx"
      keyName="categoryName"
      :barItemStyle="{ textAlign: 'center' }"
      :barItemActiveStyle="{ textAlign: 'center' }"
    >
      <uv-vtabs-item>
        <view class="item" v-for="(item2, index2) in list2" :key="index2">
          <my-BaseImage
            :src="item2.mainImage"
            width="200rpx"
            height="170rpx"
            @click="handleClick(item2)"
          ></my-BaseImage>
          <view style="width: 100%">
            <my-ShopInfo :product="item2"></my-ShopInfo>
          </view>
        </view>
        <view class="bottom-end"></view>
      </uv-vtabs-item>
    </uv-vtabs>
  </view>
</template>

<script setup>
const { tabberFreeHeight } = uni.$com.getHeight();

const list = ref([]);
const chain = ref(false);
const value = ref(0);
const store = uni.$com.getStore();
const list2 = computed(() => {
  const _list = list.value[value.value]?.childrens;
  return _list ? _list : [];
});

const change = (index) => {
  value.value = index;
};
const getList = async () => {
  const cid = store.payUser.id;
  const res = await uni.$http.get("/wx/products", { cid });
  list.value = res.data;
};
onMounted(async () => {
  uni.showLoading({
    title: "加载中",
  });
  setTimeout(async () => {
    getList();
    uni.hideLoading();
  }, 200);
});
const handleClick = (item) => {
  uni.navigateTo({
    url: `/pages/product/product?id=${item.id}&name=${item.name}`,
  });
};
watch(
  () => store.payUser.id,
  (newValue, old) => {
    console.log(newValue, old);
    if (newValue) {
      getList();
    }
  }
);
</script>
<style scoped lang="scss">
.header {
  padding: 30rpx;
  font-size: 30rpx;
  color: #333;
}
.item {
  padding: 10rpx 20rpx;
  padding-top: 0;
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
.gap {
  padding: 0 30rpx;
}
.bottom-end {
  width: 100%;
  height: 65px;
}
</style>
