<template>
  <layout title="用户隐私政策" hiddenRightStrong>
    <view class="policy-container">
      <scroll-view :scroll-y="true" class="scroll-view-content">
        <view class="content-wrapper">
          <text class="title-text">用户隐私政策</text>
          <text class="update-date">最后更新日期：2025年5月29日</text>

          <text class="paragraph-title">引言</text>
          <text class="paragraph-content">
            欢迎使用{{
              SITE_NAME
            }}！我们非常重视您的个人信息和隐私保护。本《用户隐私政策》（以下简称"本政策"）旨在向您说明我们如何收集、使用、存储、共享和保护您的个人信息以及您所享有的权利。请您在使用我们的服务前，仔细阅读并充分理解本政策的全部内容，特别是以粗体标识的条款。
          </text>

          <text class="paragraph-title"
            >一、我们如何收集和使用您的个人信息</text
          >
          <text class="paragraph-content">
            在您使用我们的服务的过程中，我们可能会收集您在使用服务时主动提供或因为使用服务而产生的信息，用于向您提供、优化我们的服务以及保障您的账户安全：
            1.
            账号注册信息：当您注册账户时，您可能需要提供手机号码、电子邮箱等信息。
            2. 个人基本信息：包括姓名、性别、出生日期、身份证号码等。 3.
            交易信息：当您使用我们的服务进行交易时，我们会收集交易记录、支付信息、收货地址等。
            4.
            设备信息：我们会收集设备型号、操作系统版本号、设备设置、唯一设备标识符等信息。
            5.
            位置信息：当您使用与位置相关的服务时，我们可能会收集和处理您的位置信息。
            6.
            日志信息：包括您使用我们服务的操作日志、搜索查询内容、IP地址、浏览器类型、电信运营商等信息。
            7. 其他信息：根据具体服务需要，我们可能会收集其他必要的信息。
          </text>

          <text class="paragraph-title"
            >二、我们如何共享、转让、公开披露您的个人信息</text
          >
          <text class="paragraph-content">
            1.
            共享：我们不会与任何公司、组织和个人共享您的个人信息，但以下情况除外：
            - 获得您的明确同意后 -
            与授权合作伙伴共享：我们可能会与合作伙伴共享必要的信息，以提供更好的服务
            - 基于法律法规的要求、强制性的行政或司法要求 -
            在涉及合并、收购、资产转让或类似的交易时 2.
            转让：我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
            - 获得您的明确同意后 - 在涉及合并、收购、资产转让或类似的交易时 3.
            公开披露：我们不会公开披露您的个人信息，但以下情况除外： -
            获得您的明确同意后 - 基于法律法规的要求、强制性的行政或司法要求
          </text>

          <text class="paragraph-title">三、我们如何保护您的个人信息</text>
          <text class="paragraph-content">
            1.
            数据安全技术措施：我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。
            2.
            数据安全管理制度：我们建立了完善的数据安全管理制度，对可能接触到您信息的工作人员采取严格的管理措施。
            3.
            安全事件处理：若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并及时告知您。
          </text>

          <text class="paragraph-title">四、您的权利</text>
          <text class="paragraph-content">
            您对自己的个人信息享有以下权利： 1.
            访问权：您有权访问您的个人信息，了解我们如何使用您的个人信息。 2.
            更正权：您有权要求我们更正不准确的个人信息。 3.
            删除权：在特定情况下，您有权要求我们删除您的个人信息。 4.
            撤回同意权：您有权随时撤回您之前作出的同意。 5.
            注销权：您有权注销您的账号。 6.
            投诉权：您有权向监管部门投诉我们的个人信息处理行为。
          </text>

          <text class="paragraph-title"
            >五、我们如何处理未成年人的个人信息</text
          >
          <text class="paragraph-content">
            1. 我们非常重视对未成年人个人信息的保护。 2.
            若您是未满18周岁的未成年人，在使用我们的服务前，应事先取得您的家长或法定监护人的同意。
            3. 我们不会在明知对方为未成年人的情况下收集其个人信息。
          </text>

          <text class="paragraph-title">六、本政策的更新</text>
          <text class="paragraph-content">
            1. 我们可能会适时对本政策进行修订。 2.
            当本政策发生重大变更时，我们会通过显著方式通知您。 3.
            若您继续使用我们的服务，即表示您同意受经修订的本政策的约束。
          </text>

          <text class="paragraph-title">七、如何联系我们</text>
          <text class="paragraph-content">
            如果您对本政策有任何疑问、意见或建议，请通过以下方式与我们联系： 1.
            客服电话：[您的客服电话] 2. 电子邮箱：[您的客服邮箱] 3.
            在线客服：[您的在线客服入口]
          </text>

          <view style="height: 40px"></view>
        </view>
      </scroll-view>
    </view>
  </layout>
</template>

<script setup>
// 假设 layout 组件已通过 easycom 自动引入或您已手动引入
const { SITE_NAME } = uni.$com.env();
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
