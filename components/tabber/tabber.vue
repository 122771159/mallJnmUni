<template>
	<uv-tabbar :value="v" :fixed="true" @change="changePage">
		<uv-tabbar-item :text="i.text" :icon="i.icon" :name="i.name" v-for="i in pageList" :key="i.icon"></uv-tabbar-item>
	</uv-tabbar>
</template>
<script setup>
	const props = defineProps({
		value: {
			type: String,
			default: "home"
		}
	})
	const pageList = uni.$com.getTabbers()
	const v = ref(props.value)
	const changePage = (name) => {
		pageList[name].go()
	}
</script>