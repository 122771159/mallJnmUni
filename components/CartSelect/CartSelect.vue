<template>
  <!-- 先不用这个功能 -->
  <view>
    <uv-icon
      @click="handleClick"
      name="checkmark-circle-fill"
      :color="flag ? activeColor : defaultColor"
      size="20"
    ></uv-icon>
  </view>
</template>

<script setup>
const store = uni.$com.getStore();
const props = defineProps({
  // 商品
  product: {
    type: Object,
    default: () => {},
  },
  // 图标激活颜色，可以根据实际选购状态改变
  activeColor: {
    type: String,
    default: "#E6A23C", // 示例用了一个类似图片中的棕黄色
  },
  // 图标默认颜色
  defaultColor: {
    type: String,
    default: "#c0c4cc", // 未激活或数量为0时的颜色
  },
});
const flag = ref(false);
watch(
  () => {
    const product = store.products_select.find(
      (item) => item.id === props.product.id
    );
    return product ? true : false;
  },
  (newVal) => {
    flag.value = newVal;
  }
);
const handleClick = () => {
  store.chooseProduct(props.product);
};
</script>

<style lang="scss" scoped></style>
