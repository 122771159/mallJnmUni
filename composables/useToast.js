// composables/useToast.js

// 导出一个组合式函数
export function toast(params) {
  uni.$emit("show-toast", params);
}
export function toastHide() {
  uni.$emit("hide-toast");
}
