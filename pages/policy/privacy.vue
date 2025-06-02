<template>
  <layout title="用户隐私政策" hiddenRightStrong>
    <view class="policy-container">
      <scroll-view :scroll-y="true" class="scroll-view-content">
        <view class="content-wrapper">
          <text class="title-text">用户隐私政策</text>
          <text class="update-date">最后更新日期：2025年5月29日</text>

          <text class="paragraph-title">引言</text>
          <text class="paragraph-content">
            欢迎使用[您的应用名称]！我们非常重视您的个人信息和隐私保护。本《用户隐私政策》（以下简称“本政策”）旨在向您说明我们如何收集、使用、存储、共享和保护您的个人信息以及您所享有的权利。请您在使用我们的服务前，仔细阅读并充分理解本政策的全部内容，特别是以粗体标识的条款。
          </text>

          <text class="paragraph-title"
            >一、我们如何收集和使用您的个人信息</text
          >
          <text class="paragraph-content">
            在您使用我们的服务的过程中，我们可能会收集您在使用服务时主动提供或因为使用服务而产生的信息，用于向您提供、优化我们的服务以及保障您的账户安全：
            1.
            账号注册信息：当您注册账户时，您可能需要提供手机号码、电子邮箱等信息。
            2. ...更多信息收集说明...
          </text>

          <text class="paragraph-title"
            >二、我们如何共享、转让、公开披露您的个人信息</text
          >
          <text class="paragraph-content">
            1.
            共享：我们不会与任何公司、组织和个人共享您的个人信息，除非获得您的明确同意或法律法规另有规定。
            2. ...更多共享、转让、披露说明...
          </text>

          <view style="height: 40px"></view>
        </view>
      </scroll-view>
    </view>
  </layout>
</template>

<script setup>
// 假设 layout 组件已通过 easycom 自动引入或您已手动引入
// 此页面通常不需要太多复杂的逻辑，主要是静态内容展示
</script>

<style lang="scss" scoped>
.policy-container {
  width: 100%;
  height: 100%; // 确保容器占满 layout 的内容区域
  display: flex;
  flex-direction: column;
}

.scroll-view-content {
  flex: 1;
  overflow-y: auto; // 允许垂直滚动
  background-color: #ffffff; // 白色背景
}

.content-wrapper {
  padding: 15px;
  font-size: 14px;
  line-height: 1.8;
  color: #333;
}

.title-text {
  display: block;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #000;
}

.update-date {
  display: block;
  font-size: 12px;
  color: #888;
  text-align: center;
  margin-bottom: 20px;
}

.paragraph-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 8px;
  color: #111;
}

.paragraph-content {
  display: block;
  margin-bottom: 15px;
  text-align: justify; // 两端对齐，更美观
  white-space: pre-wrap; // 保留换行和空格
}
</style>
