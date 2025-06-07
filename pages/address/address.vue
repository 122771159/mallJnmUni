<template>
  <layout title="地址管理">
    <view>
      <view class="add-address j-py-8 j-px-8">
        <view>
          <uv-text type="info" size="12" text="左滑删除地址"></uv-text>
        </view>
        <view class="manage">
          <view class="add" @click="manage" v-if="startManage == false">
            <uv-icon name="setting-fill" color="#FE5900" size="18"></uv-icon>
            管理
          </view>
          <view class="add" @click="finish" v-if="startManage">
            <uv-icon name="checkbox-mark" color="#FE5900" size="18"></uv-icon>
            完成
          </view>
          <view
            class="add"
            @click="addressForm.add()"
            v-if="startManage == false"
          >
            <uv-icon name="plus" color="#FE5900" size="18"></uv-icon>
            新增地址
          </view>
        </view>
      </view>
      <uv-divider text="地址管理" :dashed="true"></uv-divider>

      <uv-swipe-action>
        <uv-swipe-action-item
          :options="options"
          v-for="(item, index) in addressList"
          :key="item.id"
          @click="deleteAddress"
          :name="item.id"
        >
          <view class="j-border-top j-boder-bottom j-py-8">
            <view
              class="swipe-action uv-border-top uv-border-bottom j-px-8"
              :class="{ selected: item.id === selectedAddressId }"
              @click="selectAddress(item)"
            >
              <view class="address-info">
                <view class="address-header">
                  <text class="address-title j-line-2">{{ item.address }}</text>
                </view>
                <view class="address-detail">
                  <text class="address-name">{{ item.name }}</text>
                  <text class="address-phone">{{ item.phone }}</text>
                </view>
              </view>
              <view class="address-right">
                <view @click.stop="addressForm.edit(item)">
                  <uv-icon name="edit-pen" size="22"> </uv-icon>
                </view>
              </view>
            </view>
            <view class="swipe-footer j-px-8" v-if="startManage">
              <view class="radio">
                <uv-radio-group
                  v-model="defaultAddress.id"
                  @change="radioChange"
                >
                  <uv-radio label="设为默认" :name="item.id"> </uv-radio>
                </uv-radio-group>
              </view>
              <view class="delete">
                <uv-button
                  type="info"
                  size="small"
                  @click="deleteAddress1(item.id)"
                  >删除</uv-button
                >
              </view>
            </view>
          </view>
        </uv-swipe-action-item>
      </uv-swipe-action>
    </view>
    <view class="diandi" v-if="selectedAddressId"></view>
    <my-AddressForm
      ref="addressForm"
      @submit="addAddress"
      @edit="editAddress"
    ></my-AddressForm>
    <view class="footer" v-if="selectedAddressId">
      <uv-button type="warning" plain size="small" @click="select"
        >确定</uv-button
      >
    </view>
  </layout>
</template>

<script setup>
const addressForm = ref(null);
const startManage = ref(false);
const selectedAddressId = ref(null);
const store = uni.$com.getStore();
const payUser = computed(() => {
  return store.payUser || {};
});
const addressList = ref([]);
let eventChannel = null;
onLoad((options) => {
  selectedAddressId.value = options.id;
  if (selectedAddressId.value) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    eventChannel = currentPage.getOpenerEventChannel();
  }
});
const options = [
  {
    text: "删除",
    style: {
      backgroundColor: "#f56c6c",
    },
  },
];
const defaultAddress = computed(() => {
  return addressList.value.find((item) => item.isDefault == 1) || {};
});
const getData = async () => {
  const { data } = await uni.$http.get(`/address/${payUser.value.id}`);
  addressList.value = data;
};
onMounted(() => {
  getData();
});
const addAddress = async (address) => {
  await uni.$http.post(`/address/${payUser.value.id}`, address);
  uni.showToast({
    title: "增加成功",
    icon: "success",
    mask: true,
  });
  getData();
};
const editAddress = async (address) => {
  await uni.$http.put(`/address/${payUser.value.id}`, address);
  uni.showToast({
    title: "修改成功",
    icon: "success",
    mask: true,
  });
  getData();
};
const deleteAddress = ({ name }) => {
  uni.showModal({
    title: "提示",
    content: "确定要删除该地址吗？",
    showCancel: true,
    success: async ({ confirm, cancel }) => {
      if (confirm) {
        await uni.$http.delete(`/address/${payUser.value.id}/${name}`);
        getData();

        uni.showToast({
          title: "删除成功",
          icon: "success",
          mask: true,
        });
      }
    },
  });
};
const deleteAddress1 = (name) => {
  uni.showModal({
    title: "提示",
    content: "确定要删除该地址吗？",
    showCancel: true,
    success: async ({ confirm, cancel }) => {
      if (confirm) {
        await uni.$http.delete(`/address/${payUser.value.id}/${name}`);
        getData();

        uni.showToast({
          title: "删除成功",
          icon: "success",
          mask: true,
        });
      }
    },
  });
};
const selectAddress = (item) => {
  if (selectedAddressId.value) {
    selectedAddressId.value = item.id;
  }
};
const select = () => {
  const address = addressList.value.find(
    (item) => item.id == selectedAddressId.value
  );
  eventChannel.emit("selectAddress", address);
  selectedAddressId.value = null;
  uni.navigateBack();
};
const manage = () => {
  startManage.value = true;
};
const finish = () => {
  startManage.value = false;
};
const radioChange = async (e) => {
  await uni.$http.put(
    `/address/setDefault/${payUser.value.id}?address_id=${e}`
  );
  uni.showToast({
    title: "设置并排序成功",
  });
  getData();
};
onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.swipe-action {
  display: flex;
  gap: 7rpx;
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
:deep(.uv-divider) {
  margin: 10rpx 0 !important;
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
}
.swipe-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-address {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .manage {
    display: flex;
    gap: 25rpx;
    .add {
      display: flex;
      gap: 5rpx;
      justify-content: center;
      align-items: center;
      color: #fe5900;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  height: 30px;
  left: 0;
  right: 0;
  padding: 10px;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
}
.selected {
  background-color: #fcf4f0;
  color: #fe5900 !important;
}
.diandi {
  height: calc(33px + constant(safe-area-inset-bottom));
  height: calc(33px + env(safe-area-inset-bottom));
}
</style>
