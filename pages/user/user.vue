<template>
  <layout title="我的" :hidden-left-arrow="true">
    <view
      class="user-page-container"
      :style="{
        minHeight: 'calc(100vh - ' + topHeight + 'px - ' + bottomHeight + 'px)',
      }"
    >
      <view class="user-header-card">
        <view class="user-info">
          <image class="avatar" :src="avatarUrl" mode="aspectFill"></image>
          <view class="username">{{ username }}</view>
          <view class="user-type">
            <uv-icon name="level" size="14" color="#f9ae3d"></uv-icon>
            <text class="user-type-text">普通客户</text>
          </view>
        </view>
        <view
          v-if="isLoggedIn"
          class="member-center-link"
          @click="goToMemberCenter"
        >
          会员中心
          <uv-icon name="arrow-right" size="14" color="#909399"></uv-icon>
        </view>
        <view v-if="!isLoggedIn" class="member-center-link" @click="goToLogin">
          点击登录
          <uv-icon name="arrow-right" size="14" color="#909399"></uv-icon>
        </view>
        <!-- <view class="user-stats">
          <view v-for="(stat, index) in stats" :key="index" class="stat-item">
            <text class="stat-value">{{ stat.value }}</text>
            <text class="stat-label">{{ stat.label }}</text>
          </view>
        </view> -->
      </view>

      <view class="membership-banner-card">
        <view class="membership-info">
          <uv-icon name="level" size="20" color="#f9ae3d"></uv-icon>
          <text class="membership-title">至尊会员</text>
          <text class="membership-perks">全年尊享6大权益</text>
        </view>
        <button class="upgrade-button" size="mini" @click="goToUpgrade">
          去升级
        </button>
      </view>

      <!-- <view class="section-card">
        <uv-grid :col="5" :border="true">
          <uv-grid-item
            v-for="(item, index) in mainActions"
            :key="index"
            @click="handleActionClick(item)"
          >
            <uv-icon
              :customStyle="{ paddingTop: 20 + 'rpx' }"
              :name="item.icon"
              :custom-prefix="item.customPrefix"
              size="28"
              :color="item.iconColor || '#333'"
            ></uv-icon>
            <text class="grid-text">{{ item.text }}</text>
          </uv-grid-item>
        </uv-grid>
      </view> -->

      <view class="section-card">
        <view class="section-title-bar">
          <text class="section-title">支付发票</text>
        </view>
        <uv-grid :col="5" :border="false">
          <uv-grid-item
            v-for="(item, index) in paymentActions"
            :key="index"
            @click="handleActionClick(item)"
          >
            <uv-icon
              :name="item.icon"
              :custom-prefix="item.customPrefix"
              size="28"
              :color="item.iconColor || '#333'"
            ></uv-icon>
            <text class="grid-text">{{ item.text }}</text>
          </uv-grid-item>
        </uv-grid>
      </view>
    </view>
  </layout>
  <my-tabber value="account"></my-tabber>
</template>

<script setup>
import { ref, computed } from "vue";
// import { useAdminStore } from '@/stores'; // 暂时忽略

// const adminStore = useAdminStore(); // 暂时忽略
// const isLoggedIn = computed(() => adminStore.isLogin); // 登录状态，后续对接 Pinia
// const currentUser = computed(() => adminStore.userInfo); // 用户信息，后续对接 Pinia
const topHeight = uni.$com.getHeight().topHeight;
const bottomHeight = uni.$com.getHeight().bottomHeight;

// --- 未对接 Pinia 前的临时状态 ---
const isLoggedIn = ref(false); // 手动切换 true/false 查看效果
const tempUsername = "商场用户1111"; // 登录后的用户名
const defaultAvatar = "/static/images/default-avatar.png"; // 确保此路径有默认头像图片

const username = computed(() => {
  if (isLoggedIn.value) {
    // return currentUser.value?.nickname || tempUsername; // 对接Pinia后使用
    return tempUsername;
  }
  return "未登录";
});

const avatarUrl = computed(() => {
  if (isLoggedIn.value) {
    // return currentUser.value?.avatar || defaultAvatar; // 对接Pinia后使用
    return "/static/logo.png"; // 假设登录后使用logo作为头像示例
  }
  return defaultAvatar;
});
// --- 临时状态结束 ---

// const stats = ref([
//   { value: 0, label: "积分" },
//   { value: 0, label: "优惠券" },
//   { value: 0, label: "卡余额" },
//   { value: 0, label: "我的奖品" },
//   { value: 0, label: "碳能量" },
// ]);

// const mainActions = ref([
//   { icon: "car", text: "我的快递", path: "/pages/my-express/my-express" },
//   { icon: "map", text: "地址薄", path: "/pages/address-book/address-book" },
//   { icon: "setting", text: "偏好设置", path: "/pages/preferences/preferences" },
//   {
//     icon: "server-man",
//     customPrefix: "uvicon",
//     text: "专属快递员",
//     path: "/pages/exclusive-courier/exclusive-courier",
//   }, // 假设uv-ui有此图标
//   { icon: "scan", text: "签收码", path: "/pages/sign-code/sign-code" },
//   {
//     icon: "server-man",
//     text: "客服中心",
//     path: "/pages/customer-service/customer-service",
//   },
//   {
//     icon: "search",
//     text: "服务查询",
//     path: "/pages/service-query/service-query",
//   },
//   {
//     icon: "calendar",
//     text: "我的月报",
//     path: "/pages/monthly-report/monthly-report",
//   },
//   {
//     icon: "server-fill",
//     text: "通关服务",
//     path: "/pages/customs-clearance/customs-clearance",
//   }, // 假设uv-ui有此图标
//   {
//     icon: "file-text",
//     text: "行业模板库",
//     path: "/pages/template-library/template-library",
//   },
// ]);

const paymentActions = ref([
  {
    icon: "order",
    text: "待支付",
    path: "/pages/payment/to-pay",
    customPrefix: "uvicon",
  },
  { icon: "order", text: "发票申请", path: "/pages/invoice/apply" },
  { icon: "coupon", text: "我的返款", path: "/pages/refund/my-refunds" },
  { icon: "tags", text: "税金凭证", path: "/pages/tax-voucher/tax-voucher" },
  { icon: "bag", text: "我的钱包", path: "/pages/wallet/my-wallet" },
]);

const handleActionClick = (item) => {
  if (item.path) {
    uni.navigateTo({ url: item.path });
  } else {
    uni.showToast({ title: `${item.text} 功能暂未开放`, icon: "none" });
  }
};

const goToMemberCenter = () => {
  uni.navigateTo({ url: "/pages/member-center/member-center" });
};
const goToLogin = () => {
  uni.navigateTo({ url: "/pages/login/login" });
};
const goToUpgrade = () => {
  uni.navigateTo({ url: "/pages/member-upgrade/member-upgrade" });
};
</script>

<style lang="scss" scoped>
.user-page-container {
  /* 纹理背景 */
  // 方式一：使用图片 (假设你有一张名为 texture-bg.png 的细微纹理图片放在 static/images/ 目录下)
  // background-image: url('/static/images/texture-bg.png');
  // background-repeat: repeat;
  // background-size: auto; // 或者指定大小，如 50px 50px

  // 方式二：使用渐变模拟 (如果不想用图片，可以用非常淡的线性或径向渐变)
  //   background-color: #f4f6f8; // 一个非常浅的灰色作为底色
  background-image: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.01) 25%,
    transparent 25%,
    transparent 50%,
    rgba(0, 0, 0, 0.01) 50%,
    rgba(0, 0, 0, 0.01) 75%,
    transparent 75%,
    transparent
  );
  background-size: 30px 30px; // 调整大小控制纹理密度
  padding: 15px;
  box-sizing: border-box;
}

.user-header-card {
  background-color: #fff;
  padding: 20px 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 15px;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  .user-type {
    display: flex;
    align-items: center;
    margin-left: 10px;
    .user-type-text {
      font-size: 12px;
      color: #909399;
    }
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  background-color: #eee; // 头像加载前的占位符颜色
}

.username {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.member-center-link {
  position: absolute;
  top: 20px;
  right: 15px;
  font-size: 13px;
  color: #909399;
  display: flex;
  align-items: center;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.membership-banner-card {
  background: linear-gradient(to right, #f9ae3d, #f7cb72);
  color: #fff;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(249, 174, 61, 0.2);
}
.membership-info {
  display: flex;
  align-items: center;
  .membership-title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 8px;
    color: #4e3607;
  }
  .membership-perks {
    font-size: 12px;
    margin-left: 10px;
    color: #7a561a;
  }
}

.upgrade-button {
  background-color: #4e3607;
  color: #f3ca7e;
  border-radius: 15px;
  padding: 0 12px;
  height: 28px;
  line-height: 28px;
  font-size: 13px;
  border: none; // 去掉uv-button的默认边框
  &:after {
    // 去掉微信小程序按钮的默认边框
    border: none;
  }
}

.section-card {
  background-color: #fff;
  padding: 15px 10px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  margin-bottom: 15px;
}
.section-title-bar {
  margin-bottom: 15px;
  padding-left: 5px; // 与宫格内容对齐
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.grid-text {
  font-size: 12px;
  color: #333;
  padding: 10rpx 0 20rpx 0rpx;
}

/* 积分活动特殊样式 */
.points-grid .uv-grid-item {
  padding-bottom: 10px !important; // 确保uv-grid-item内部样式被覆盖
}
.points-activity-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;

  .activity-title-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
  }
  .activity-main-title {
    font-size: 13px;
    font-weight: 500;
    color: #333;
  }
  .activity-tag {
    font-size: 10px;
    padding: 1px 4px;
    border-radius: 3px;
    margin-left: 4px;
    font-weight: bold;
  }

  .activity-subtitle {
    font-size: 10px;
    color: #999;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%; // 防止过长文字换行
  }
  .activity-image {
    width: 30px;
    height: 30px;
  }
}
</style>
