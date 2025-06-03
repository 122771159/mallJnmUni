<template>
  <layout title="商品详情" hiddenLeftHome needLogin>
    <view
      class="product-detail-page"
      v-if="product"
      :style="{ height: tabberHeight }"
    >
      <view
        class="swiper-container"
        v-if="product.allImages && product.allImages.length > 0"
      >
        <uv-swiper
          :list="swiperImages"
          height="300px"
          imgMode="aspectFit"
          indicator
          circular
          @click="preImage"
        ></uv-swiper>
      </view>
      <view class="no-image-placeholder" v-else>
        <uv-icon name="photo-off" size="50" color="#c0c4cc"></uv-icon>
        <text>暂无图片</text>
      </view>

      <view class="product-info-card">
        <view class="price-section">
          <text class="current-price">
            <text class="currency-symbol">¥</text>{{ product.displayPrice }}
          </text>
        </view>
        <text class="product-name">{{ product.name }}</text>
        <view class="meta-info">
          <text>销量: {{ product.sales || 0 }}</text>
          <text>库存: {{ product.stock || 0 }}</text>
        </view>
      </view>

      <view class="description-card">
        <view class="card-title">商品详情</view>
        <towxml :nodes="nodes" />
        <view class="diandi"></view>
      </view>
    </view>
    <view class="loading-placeholder" v-else-if="isLoading">
      <uv-loading-icon mode="circle" size="30"></uv-loading-icon>
      <text>加载中...</text>
    </view>
    <view class="error-placeholder" v-else>
      <uv-icon name="error-circle-fill" size="50" color="#c0c4cc"></uv-icon>
      <text>商品信息加载失败</text>
    </view>

    <view class="bottom-actions-bar" v-if="product && !isLoading">
      <view class="buttons-group">
        <uv-button
          type="warning"
          shape="circle"
          text="加入购物车"
          @click="addToCart"
        ></uv-button>
      </view>
    </view>

    <uv-popup ref="quantityPopup" mode="bottom" round="10">
      <view class="quantity-popup-content">
        <view class="popup-header">
          <my-BaseImage
            :src="mainImageUrl"
            width="80px"
            height="80px"
            radius="5"
            mode="aspectFill"
            class="popup-product-image"
          ></my-BaseImage>
          <view class="popup-product-info">
            <text class="popup-price"
              >¥{{ product && product.displayPrice }}</text
            >
            <text class="popup-stock"
              >库存: {{ product && product.stock }}件</text
            >
          </view>
          <view class="close-icon" @click="closeQuantityPopup">
            <uv-icon name="close" size="20" color="#c0c4cc"></uv-icon>
          </view>
        </view>
        <view class="quantity-selector">
          <text class="selector-label">购买数量</text>
          <uv-number-box
            v-model="purchaseQuantity"
            :min="1"
            :max="product && product.stock"
          ></uv-number-box>
        </view>
        <uv-button
          type="warning"
          shape="circle"
          customStyle="margin-top: 20px;"
          text="确定加入"
          @click="confirmPurchase"
        ></uv-button>
      </view>
    </uv-popup>
  </layout>
</template>

<script setup>
const nodes = ref("");
let { appContext } = getCurrentInstance();
const API_BASE_URL = import.meta.env.VITE_APP_BASE_API;
const { tabberHeight } = uni.$com.getHeight();
const product = ref(null);
const isLoading = ref(true);
const swiperImages = ref([]);
const purchaseQuantity = ref(1);
const quantityPopup = ref(null);
const currentActionType = ref("");
const store = uni.$com.getStore();

const mainImageUrl = computed(() => {
  if (
    product.value &&
    product.value.allImages &&
    product.value.allImages.length > 0
  ) {
    const imgPath = product.value.allImages[0];
    return imgPath.startsWith("http")
      ? imgPath
      : `${API_BASE_URL}/image/${imgPath}`;
  }
  return ""; // 返回一个默认占位图或空
});

const getSwImage = async () => {
  const promises = [];
  for (let i = 0; i < product.value.allImages.length; i++) {
    promises.push(uni.$http.getFile("/image/" + product.value.allImages[i]));
  }
  const data = await Promise.all(promises);
  swiperImages.value = data.map((item) => item.tempFilePath);
  // previewUrl.value = response.tempFilePath;
};
onLoad(async (options) => {
  const productId = options.id || ""; // 从路由参数获取ID，如果没有则使用示例ID
  if (productId) {
    await fetchProductDetail(productId);
  } else {
    uni.showToast({ title: "缺少商品ID", icon: "none" });
    isLoading.value = false;
    uni.navigateBack();
  }
});
const preImage = (index) => {
  uni.previewImage({
    urls: swiperImages.value,
    current: index,
  });
};
const fetchProductDetail = async (id) => {
  isLoading.value = true;
  try {
    const { data } = await uni.$http.get(`/wx/product/${id}`);
    product.value = data;
    nodes.value = appContext.config.globalProperties.$towxml(
      replaceImageBaseUrlIfContainsImagesPath(
        product.value.description,
        API_BASE_URL
      ),
      "markdown"
    );
    if (product.value && product.value.allImages) {
      // swiperImages.value = product.value.allImages.map((img) =>
      //   img.startsWith("http") ? img : `${API_BASE_URL}/image/${img}`
      // );
      await getSwImage();
    }
  } catch (error) {
    console.error("获取商品详情失败:", error);
    uni.showToast({ title: "商品信息加载失败", icon: "none" });
  } finally {
    isLoading.value = false;
  }
};

const openQuantityPopup = (actionType) => {
  if (product.value && product.value.stock > 0) {
    currentActionType.value = actionType;
    purchaseQuantity.value = 1; // 重置数量
    quantityPopup.value.open();
  } else {
    uni.showToast({ title: "商品库存不足", icon: "none" });
  }
};

const closeQuantityPopup = () => {
  quantityPopup.value.close();
};

const addToCart = () => {
  openQuantityPopup("addToCart");
};

const confirmPurchase = () => {
  const count = store.getCount(product.value);
  if (count + purchaseQuantity.value > product.value.stock) {
    uni.showToast({ title: "剩余商品数量不足", icon: "none" });
    return;
  }
  store.setCart(product.value, count + purchaseQuantity.value);
  if (currentActionType.value === "addToCart") {
    uni.showToast({ title: "已加入购物车", icon: "success" });
  }
  closeQuantityPopup();
  setTimeout(() => {
    uni.navigateBack();
  }, 1000);
};
/**
 * 替换 Markdown 文本中路径包含 "/images/" 的图片链接的基础 URL。
 * @param {string} markdownText 原始 Markdown 文本。
 * @param {string} newBaseUrl 要替换成的新基础 URL (例如 "https://cdn.example.com" 或 "https://my-server.com/assets")。
 * @returns {string} 替换后的 Markdown 文本。
 */
function replaceImageBaseUrlIfContainsImagesPath(markdownText, newBaseUrl) {
  // 正则表达式解释:
  // \!\[(.*?)\]         - 捕获组1 (altText): 图片描述文字 "![]"
  // \(                 - 匹配 "("
  // (                  - 开始捕获组2 (originalFullUrl)
  //   (?:              - 非捕获组，匹配协议 (http 或 https)
  //     https?:\/\/      - "http://" 或 "https://"
  //   )
  //   (?:              - 非捕获组，匹配域名和可选端口
  //     [^/]+          - 匹配除了 "/" 之外的任何字符至少一次 (域名主体)
  //   )
  //   (?=\/images\/)   - 正向先行断言：确保接下来是 "/images/"，但不捕获它到基础 URL 部分
  //   (.*?\/images\/.*?) - 捕获组3 (pathStartingWithImages): 匹配以 "/images/" 开头的完整路径，直到链接结束
  // )                  - 结束捕获组2
  // \)                 - 匹配 ")"

  // 更精确地捕获基础 URL（协议+域名+端口）和 "/images/" 及之后的路径
  // \!\[(.*?)\]           - 捕获组1 (altText): 图片描述
  // \(                     - 匹配 (
  // ( (?:https?:\/\/)?[^/]+ ) - 捕获组2 (originalBaseUrl): 匹配协议(可选)+域名+端口 (直到第一个路径斜杠前)
  // ( \/images\/.*? )      - 捕获组3 (pathWithImages): 匹配以 /images/ 开头的路径
  // \)                     - 匹配 )
  const regex = /!\[(.*?)\]\(((?:https?:\/\/)?(?:[^/]+))(\/image\/.*?)\)/g;

  // 清理 newBaseUrl，确保末尾没有斜杠
  const cleanNewBaseUrl = newBaseUrl.endsWith("/")
    ? newBaseUrl.slice(0, -1)
    : newBaseUrl;

  const replacedText = markdownText.replace(
    regex,
    (match, altText, originalBaseUrl, pathWithImages) => {
      // originalBaseUrl 将是类似 "http://127.0.0.1:8080" 或 "https://another.com"
      // pathWithImages 将是类似 "/images/9c5d7fc5d5d84a13aa123ee02fea5034.png"

      // 直接使用捕获到的 pathWithImages，因为它已经包含了 "/images/"
      // 确保 pathWithImages 开头是斜杠 (虽然正则已经保证了)
      const cleanPathWithImages = pathWithImages.startsWith("/")
        ? pathWithImages
        : "/" + pathWithImages;

      return `![${altText}](${cleanNewBaseUrl}${cleanPathWithImages}?x-oss-process=image/resize,w_1000/quality,q_80)`;
    }
  );

  return replacedText;
}
</script>

<style lang="scss" scoped>
.product-detail-page {
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.swiper-container {
  width: 100%;
  height: 300px; // 1:1 比例
  uv-swiper {
    // 确保能选中组件内部
    height: 100% !important;
  }
}
.no-image-placeholder {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  color: #c0c4cc;
  font-size: 28rpx;
  .uv-icon {
    margin-bottom: 10rpx;
  }
}

.product-info-card {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;

  .price-section {
    display: flex;
    align-items: baseline;
    margin-bottom: 15rpx;
    .current-price {
      color: #fa3534;
      font-size: 44rpx;
      font-weight: bold;
      .currency-symbol {
        font-size: 28rpx;
        margin-right: 4rpx;
      }
    }
    .market-price {
      font-size: 24rpx;
      color: #909399;
      text-decoration: line-through;
      margin-left: 20rpx;
    }
  }

  .product-name {
    font-size: 32rpx;
    color: #303133;
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 10rpx;
    // 多行省略 (如果需要)
    // display: -webkit-box;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }

  .meta-info {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    color: #909399;
  }
}

.description-card {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
  flex: 1;
  .card-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #303133;
    margin-bottom: 20rpx;
  }
  .product-description {
    font-size: 28rpx;
    color: #606266;
    line-height: 1.6;
    // rich-text / uv-parse 内部的图片样式可以在 formattedDescription 中处理
    // 或者针对性地写样式，例如：
    // :deep(img) {
    //   max-width: 100%;
    //   display: block;
    // }
  }
}

.loading-placeholder,
.error-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100rpx 0;
  color: #909399;
  font-size: 28rpx;
  text {
    margin-top: 20rpx;
  }
}

.bottom-actions-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px; /* 50px */
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding: 0 20rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 99;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */

  .action-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20rpx;
    color: #606266;
    position: relative; // 为了 uv-badge 定位
    text {
      margin-top: 4rpx;
    }
  }

  .buttons-group {
    display: flex;
    gap: 20rpx; /* 按钮间距 */
    .uv-button {
      flex: 1; // 让按钮平分剩余空间
    }
  }
}

.quantity-popup-content {
  padding: 30rpx;
  .popup-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30rpx;
    position: relative;
    .popup-product-image {
      margin-right: 20rpx;
      flex-shrink: 0; /* 防止图片被压缩 */
    }
    .popup-product-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-top: 20rpx; // 让价格和库存稍微靠下，与图片底部对齐
      .popup-price {
        color: #fa3534;
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      .popup-stock {
        font-size: 24rpx;
        color: #909399;
      }
    }
    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      padding: 10rpx; // 增大点击区域
    }
  }
  .quantity-selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    .selector-label {
      font-size: 28rpx;
      color: #303133;
    }
  }
}
.diandi {
  height: calc(50px + constant(safe-area-inset-bottom));
  height: calc(50px + env(safe-area-inset-bottom));
  width: 100%;
}
</style>
