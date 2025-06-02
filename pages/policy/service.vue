<template>
  <layout title="用户服务协议" hiddenRightStrong>
    <view class="policy-container">
      <scroll-view :scroll-y="true" class="scroll-view-content">
        <view class="content-wrapper">
          <text class="title-text">用户服务协议</text>
          <text class="update-date">最后更新日期：2025年5月29日</text>

          <text class="paragraph-title">特别提示</text>
          <text class="paragraph-content">
            欢迎使用[您的应用名称]提供的服务！为使用我们的服务，您应当阅读并遵守本《用户服务协议》（以下简称“本协议”）。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。
          </text>

          <text class="paragraph-title">一、服务内容</text>
          <text class="paragraph-content">
            1.
            本协议项下的服务是指[您的应用名称]向用户提供的包括但不限于[具体服务描述，如商品浏览、购买、评价等]功能及单项服务。
            2. ...更多服务内容说明...
          </text>

          <text class="paragraph-title">二、用户行为规范</text>
          <text class="paragraph-content">
            1. 您在使用本服务时须遵守法律法规，不得利用本服务从事违法违规行为。
            2. ...更多用户行为规范说明...
          </text>

          <view style="height: 40px"></view>
        </view>
      </scroll-view>
    </view>
  </layout>
</template>

<script setup>
// 假设 layout 组件已通过 easycom 自动引入或您已手动引入
</script>

<style lang="scss" scoped>
.policy-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view-content {
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
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
  text-align: justify;
  white-space: pre-wrap;
}
</style>
