// composables/useToast.js

// 导出一个组合式函数
export function toast(params, overlay = false) {
  toastHide();
  uni.$emit("show-toast", { ...params, overlay });
}
export function toastHide() {
  uni.$emit("hide-toast");
}
