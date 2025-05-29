<template>
	<layout title="首页" hiddenLeft>
		<view class="content">
			<image class="logo" src="/static/logo.png"></image>
			<uv-button text="月落" @click="toast"></uv-button>
			<uv-button text="月落" @click="toast"></uv-button>
			<uv-button text="月落" @click="toast"></uv-button>
		</view>
		<my-tabber></my-tabber>
	</layout>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		onMounted
	} from 'vue';
	const {
		proxy
	} = getCurrentInstance()
	// uni.$http.get('/adasd')
	onMounted(() => {
		uni.$com.toast({
			type: 'default',
			title: '默认主题',
			message: "锦瑟无端五十123123弦"
		})
	})

	function toast() {
		uni.$com.toast({
			type: 'default',
			title: '默认主题',
			message: "锦瑟无端五十弦111111"
		})
	}
</script>

<style>
	.logo {
		height: 200rpx;
		width: 200rpx;

	}
</style>