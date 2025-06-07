<template>
  <layout title="首页" hiddenAllStrong needLogin>
    <template v-slot:layout-left v-if="roles != 'CUSTOMER'">
      <view>
        <uv-button size="small" type="warning" plain @click="leftClick">{{
          payUser.id ? payUser.account : "代客下单"
        }}</uv-button>
      </view>
    </template>
    <template v-if="payUser.id && isLogin">
      <uv-search
        placeholder="请输入搜索内容"
        :showAction="false"
        margin="10rpx 30rpx 10rpx 30rpx"
        disabled
        @click="search"
      ></uv-search>
      <my-ShopList></my-ShopList>

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
    </template>
    <template v-else>
      <view :style="{ height: navHeight }" class="need-login-view">
        <image
          class="icon-image"
          src="/static/images/noLogin.png"
          mode="aspectFit"
          style="width: 500rpx; height: 500rpx"
        ></image>
        <text class="tip-text">您当前未选择客户</text>
        <text class="sub-tip-text">请点击左上角按钮选择客户</text>
      </view>
    </template>
    <my-tabber></my-tabber>
  </layout>
</template>

<script setup>
const popup = ref(null);
const store = uni.$com.getStore();

const { navHeight } = uni.$com.getHeight();
const roles = computed(() => {
  return store.getRoles;
});
const isLogin = computed(() => {
  return store.isLogin;
});
const payUser = computed(() => {
  return store.payUser || {};
});
onMounted(() => {});
const openPopup = () => {
  popup.value.open();
};

const leftClick = () => {
  uni.navigateTo({
    url: "/pages/customer/select",
    events: {
      acceptDataFromSelectPage: (data) => {
        store.setPayUser(data);
      },
    },
  });
};
const search = () => {
  uni.navigateTo({
    url: "/pages/search/search",
  });
};
</script>

<style lang="scss" scoped>
.logo {
  height: 200rpx;
  width: 200rpx;
}
.need-login-view {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.icon-image {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  // 确保您的 /static/images/unlogin_icon.png 路径下有对应的图标文件
  // 如果没有，可以暂时移除此行，或替换为 uv-icon 等其他图标方案
}

.tip-text {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}

.sub-tip-text {
  font-size: 14px;
  color: #888;
  margin-bottom: 30px;
}

.login-button {
  width: 100%; // 按钮宽度充满内容区域
  max-width: 280px; // 给按钮一个最大宽度，避免在大屏上过宽
  // uv-button 已经有很多内置样式，这里可以按需调整
  // 例如，如果想自定义按钮颜色，可以在 uv-button 上设置 customStyle
}
</style>
