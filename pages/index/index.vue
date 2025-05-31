<template>
  <layout title="首页" hiddenLeft>
    <ShopList />
    <my-tabber></my-tabber>
  </layout>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
</script>

<style>
.logo {
  height: 200rpx;
  width: 200rpx;
}
</style>
