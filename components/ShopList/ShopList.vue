<template>
  <view class="content" :style="{ height: tabberHeight }">
    <uv-vtabs
      :chain="chain"
      :list="list"
      :barItemBadgeStyle="{ right: '20px', top: '12px' }"
      :height="tabberFreeHeight"
      @change="change"
      keyName="categoryName"
    >
      <uv-vtabs-item>
        <view class="item" v-for="(item2, index2) in list2" :key="index2">
          <view class="item-title">
            <text class="text">{{ item2.name }}</text>
          </view>
          <view class="item-content">
            <text class="text">{{ item2.desc }}</text>
          </view>
        </view>
      </uv-vtabs-item>
    </uv-vtabs>
  </view>
</template>

<script setup>
const { tabberHeight, tabberFreeHeight } = uni.$com.getHeight();

const list = ref([]);
const chain = ref(false);
const value = ref(0);

const list2 = computed(() => {
  const _list = list.value[value.value]?.childrens;
  return _list ? _list : [];
});

const change = (index) => {
  console.log("选项改变：", index);
  value.value = index;
};

onMounted(async () => {
  uni.showLoading({
    title: "加载中",
  });
  setTimeout(async () => {
    const res = await uni.$http.get("/wx/products");
    list.value = res.data;
    uni.hideLoading();
  }, 200);
});
</script>
<style scoped lang="scss">
.header {
  padding: 30rpx;
  font-size: 30rpx;
  color: #333;
}
.item {
  padding: 10rpx 20rpx;
  &-title {
    .text {
      font-weight: 700;
      font-size: 32rpx;
      color: #111;
    }
  }
  &-content {
    padding: 20rpx 0;
    .text {
      line-height: 48rpx;
      font-size: 30rpx;
      color: #111;
      /* #ifndef APP-NVUE */
      word-break: break-all;
      /* #endif */
    }
  }
}
.gap {
  padding: 0 30rpx;
}
</style>
