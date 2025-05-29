// composables/useToast.js

// 导出一个组合式函数
export function toast(params) {
	// 这个函数负责触发全局事件
	const showToast = (params) => {
		uni.$emit('show-toast', params);
	};
	// 返回这个方法，让外部可以使用
	return showToast(params)
}