<template>
  <layout title="客户选择">
    <view :style="{ height: navHeight }">
      <uv-search
        placeholder="请输入客户的名或账号"
        :showAction="false"
        margin="10rpx 30rpx 10rpx 30rpx"
        v-model="keyword"
        @custom="getList"
        @search="getList"
      ></uv-search>
      <uv-divider text="客户选择" :dashed="true"></uv-divider>
      <uv-list>
        <uv-list-item
          border
          :title="'姓名' + item.name"
          :note="'账号' + item.account"
          v-for="item in list"
          :key="item.id"
        >
          <template #footer>
            <uv-button size="small" plain type="primary" @click="select(item)">
              选择
            </uv-button>
          </template>
        </uv-list-item>
      </uv-list>
    </view>
  </layout>
</template>

<script setup>
const { navHeight } = uni.$com.getHeight();
const keyword = ref("");
const list = ref([]);
let eventChannel = null;
const sotre = uni.$com.getStore();
onLoad(() => {
  // 获取当前页面栈
  const pages = getCurrentPages();
  // 获取当前页面实例，数组中最后一个即为当前页面
  const currentPage = pages[pages.length - 1];
  // 从当前页面实例中获取 EventChannel 对象
  eventChannel = currentPage.getOpenerEventChannel();
});
const getList = async () => {
  const { data } = await uni.$http.get("/admin/getPayUser", {
    keyword: keyword.value,
  });
  list.value = data;
};
const select = (item) => {
  eventChannel.emit("acceptDataFromSelectPage", item);
  sotre.clearCart();
  uni.$com.toast(
    {
      message: "选择成功",
    },
    true
  );
  uni.navigateBack();
};
onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped></style>
