<template>
  <view
    class="image-container"
    :style="{ width: props.width, height: props.height }"
  >
    <view v-if="isLoading" class="loading-overlay">
      <view class="loading-spinner">
        <uv-loading-icon
          class="spinner-icon"
          mode="spinner"
          size="24"
          color="#409eff"
        ></uv-loading-icon>
      </view>
    </view>

    <template v-if="ableClick">
      <uv-image
        v-if="previewUrl && !isLoading && !showError"
        ref="imgRef"
        class="preview-image"
        :src="previewUrl"
        :show-loading="false"
        :show-error="false"
        :mode="mode"
        :width="width"
        :height="height"
        lazy-load
        @click="handlePreviewImage"
        @load="onImageLoad"
        @error="onImageError"
      />
    </template>
    <template v-else>
      <uv-image
        v-if="previewUrl && !isLoading && !showError"
        ref="imgRef"
        class="preview-image"
        :src="previewUrl"
        :show-loading="false"
        :show-error="false"
        :mode="mode"
        :width="width"
        :height="height"
        lazy-load
        @click="handleClick"
        @load="onImageLoad"
        @error="onImageError"
      />
    </template>
    <view v-if="showError && !isLoading" class="error-placeholder">
      <uv-icon name="photo-fill" size="32" color="#909399"></uv-icon>
      <text>图片加载失败</text>
    </view>

    <view
      v-if="!previewUrl && !isLoading && !showError"
      class="empty-placeholder"
    >
      <uv-icon name="photo" size="32" color="#c0c4cc"></uv-icon>
      <text>暂无图片</text>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, computed } from "vue";

// uni.$http 是在 main.js 中全局挂载的
const uniHttp = uni.$http;

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "100px",
  },
  height: {
    type: String,
    default: "100px",
  },
  // 新增 mode prop，允许外部控制图片裁剪、缩放的模式
  mode: {
    type: String,
    default: "scaleToFill", // 默认与 cover 行为类似
  },
  ableClick: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["click"]);
const imgRef = ref(null);
const previewUrl = ref("");
const isLoading = ref(true);
const showError = ref(false);

const fetchImage = async (url) => {
  isLoading.value = true;
  showError.value = false;
  previewUrl.value = ""; // 重置previewUrl确保旧图片不显示

  if (!url) {
    isLoading.value = false;
    // 根据需求，src为空时可以显示错误，也可以显示空占位符
    // 此处我们让 !previewUrl && !isLoading && !showError 条件来处理空占位
    return;
  }

  try {
    if (url.startsWith("http")) {
      previewUrl.value = url;
      onImageLoad();
      // 对于直接的 HTTP URL，uv-image 会自行处理加载，我们不需要显式结束 isLoading
      // isLoading 会在 @load 或 @error 事件中处理
    } else {
      const response = await uniHttp.getFile("/image/" + url);
      previewUrl.value = response.tempFilePath;
      onImageLoad();
    }
  } catch (error) {
    console.error("图片加载或处理失败:", error);
    onImageError(); // 统一调用错误处理
  }
  // 注意：isLoading 的最终状态由 onImageLoad 和 onImageError 控制
};

const onImageLoad = () => {
  isLoading.value = false;
  showError.value = false;
};

const onImageError = () => {
  isLoading.value = false;
  showError.value = true;
  previewUrl.value = ""; // 清除错误的URL
};

const handlePreviewImage = () => {
  if (previewUrl.value && !showError.value) {
    uni.previewImage({
      urls: [previewUrl.value],
      current: 0,
    });
  }
};

const handleClick = () => {
  emit("click");
};

watch(
  () => props.src,
  (newVal) => {
    fetchImage(newVal);
  },
  { immediate: true }
);
</script>

<style scoped>
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f0f2f5; /* 调整了背景色为更柔和的灰色 */
  position: relative; /* 用于绝对定位内部元素 */
}

.loading-overlay,
.error-placeholder,
.empty-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* 统一为纵向排列 */
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-sizing: border-box;
  padding: 10px;
}

.error-placeholder,
.empty-placeholder {
  color: #909399;
  font-size: 12px; /* 稍微调大字体 */
}

.error-placeholder .uv-icon,
.empty-placeholder .uv-icon {
  margin-bottom: 8px;
}

.preview-image {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
