<template>
  <uv-popup
    ref="popup"
    mode="bottom"
    customStyle="max-height:60vh;padding: 20rpx"
    closeable
    :closeOnClickOverlay="false"
  >
    <uv-divider text="收货地址" :dashed="true"></uv-divider>
    <uv-form
      labelPosition="left"
      :model="address_details"
      :rules="rules"
      labelWidth="70px"
      labelAlign="right"
      ref="form"
    >
      <uv-form-item label="姓名:" prop="name" borderBottom>
        <uv-input v-model="address_details.name" border="none"> </uv-input>
      </uv-form-item>
      <uv-form-item label="手机号:" prop="phone" borderBottom>
        <uv-input v-model="address_details.phone" border="none"> </uv-input>
      </uv-form-item>
      <uv-form-item label="收货地址:" prop="address" borderBottom>
        <uv-input v-model="address_details.address" border="none"> </uv-input>
      </uv-form-item>
      <uv-form-item label="是否默认:" prop="isDefault" borderBottom>
        <uv-radio-group
          :customStyle="{ margin: '8px' }"
          v-model="address_details.isDefault"
          @change="radioChange"
        >
          <uv-radio
            :customStyle="{ margin: '8px' }"
            label="是"
            :name="1"
          ></uv-radio>

          <uv-radio
            :customStyle="{ margin: '8px' }"
            label="否"
            :name="0"
          ></uv-radio>
        </uv-radio-group>
      </uv-form-item>
      <view class="button-group">
        <view>
          <uv-button
            type="primary"
            :text="buttonText"
            customStyle="margin-top: 10px"
            @click="submit"
          ></uv-button>
        </view>

        <view>
          <uv-button
            type="error"
            text="重置"
            customStyle="margin-top: 10px"
            @click="reset"
          ></uv-button>
        </view>
      </view>
    </uv-form>
  </uv-popup>
</template>

<script setup>
const popup = ref(null);
const form = ref(null);
const buttonText = ref("保存");
const address_details = ref({
  name: "",
  phone: "",
  address: "",
  isDefault: 0,
});
const emit = defineEmits(["submit", "edit"]);
const rules = {
  name: {
    type: "string",
    required: true,
    message: "请填写姓名",
    trigger: ["blur", "change"],
  },
  phone: {
    type: "string",
    required: true,
    message: "请输入手机号",
    trigger: ["blur", "change"],
  },
  address: {
    type: "string",
    required: true,
    message: "请输入收货地址",
    trigger: ["blur", "change"],
  },
};
const reset = () => {
  address_details.value.name = "";
  address_details.value.phone = "";
  address_details.value.address = "";
  address_details.value.isDefault = 0;
};
const submit = () => {
  form.value
    .validate()
    .then((res) => {
      popup.value.close();

      if (buttonText.value === "保存") {
        emit("submit", { ...address_details.value });
      } else {
        emit("edit", { ...address_details.value });
      }
    })
    .catch((errors) => {
      uni.showToast({
        icon: "error",
        title: errors.length ? errors[0].message : "填写错误",
      });
    });
};
const radioChange = (e) => {
  address_details.value.isDefault = e;
};
// const close = () => {
//   popup.value.close();
// };
defineExpose({
  add: () => {
    buttonText.value = "保存";
    address_details.value = {
      name: "",
      phone: "",
      address: "",
      isDefault: 0,
    };
    popup.value.open();
  },
  //   close: close,
  edit: (address) => {
    address_details.value = { ...address };
    buttonText.value = "修改";
    popup.value.open();
  },
  submit,
});
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  align-items: center;
  gap: 10px;
  view {
    flex: 1;
  }
}
</style>
