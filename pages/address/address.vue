<template>
  <layout title="地址管理">
    <view>
      <view class="add-address">
        <uv-button
          text="添加地址"
          type="primary"
          size="small"
          @click="addressForm.add()"
          plain
        />
      </view>
      <uv-swipe-action>
        <uv-swipe-action-item
          :options="options"
          v-for="(item, index) in addressList"
          :key="item.id"
          @click="deleteAddress"
          :name="item.id"
        >
          <view class="swipe-action uv-border-top uv-border-bottom">
            <view class="address-info">
              <view class="address-header">
                <text class="address-title">{{ item.address }}</text>
              </view>
              <view class="address-detail">
                <text class="address-name">{{ item.name }}</text>
                <text class="address-phone">{{ item.phone }}</text>
              </view>
            </view>
            <view class="address-right">
              <uv-icon
                name="edit-pen"
                size="28"
                @click="addressForm.edit(item)"
              >
              </uv-icon>
            </view>
          </view>
        </uv-swipe-action-item>
      </uv-swipe-action>
    </view>

    <my-AddressForm
      ref="addressForm"
      @submit="addAddress"
      @edit="editAddress"
    ></my-AddressForm>
  </layout>
</template>

<script setup>
const addressForm = ref(null);
const options = [
  {
    text: "删除",
    style: {
      backgroundColor: "#f56c6c",
    },
  },
];
const getData = async () => {
  const { data } = await uni.$http.get("/address");
  addressList.value = data;
};
onMounted(() => {
  getData();
});
const addressList = ref([]);
const addAddress = async (address) => {
  await uni.$http.post("/address", address);
  uni.showToast({
    title: "增加成功",
    icon: "success",
    mask: true,
  });
  addressList.value.push(address);
};
const editAddress = async (address) => {
  await uni.$http.put("/address", address);
  uni.showToast({
    title: "修改成功",
    icon: "success",
    mask: true,
  });
  addressList.value.forEach((item, index) => {
    if (item.id === address.id) {
      addressList.value[index] = address;
    }
  });
};
const deleteAddress = ({ name }) => {
  uni.showModal({
    title: "提示",
    content: "确定要删除该地址吗？",
    showCancel: true,
    success: ({ confirm, cancel }) => {
      if (confirm) {
        addressList.value = addressList.value.filter(
          (item) => item.id !== name
        );

        uni.showToast({
          title: "删除成功",
          icon: "success",
          mask: true,
        });
      }
    },
  });
};
onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.swipe-action {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
  &__content {
    padding: 25rpx 0;
    &__text {
      font-size: 15px;
      color: #222;
      padding-left: 30rpx;
    }
  }
}
.address-info {
  padding: 20rpx 0 20rpx 0;
  width: 90%;
}
.address-header {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}
.address-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 10rpx;
}

.edit-icon {
  margin-left: auto;
  color: #888;
}
.address-detail {
  color: #666;
  font-size: 15px;
  margin-top: 4rpx;
}
.address-name {
  margin: 0 16rpx;
}
.address-right {
  display: flex;
  justify-content: center;
  align-items: center;
  :deep(.uv-icon) {
    border: 1px solid #888;
    border-radius: 10px;
  }
}

.add-address {
  padding: 10px;
}
</style>
