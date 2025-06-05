<template>
  <layout title="用户服务协议" hiddenRightStrong>
    <view class="policy-container">
      <scroll-view :scroll-y="true" class="scroll-view-content">
        <view class="content-wrapper">
          <text class="title-text">用户服务协议</text>
          <text class="update-date">最后更新日期：2025年5月29日</text>

          <text class="paragraph-title">特别提示</text>
          <text class="paragraph-content">
            欢迎使用{{
              SITE_NAME
            }}提供的服务！为使用我们的服务，您应当阅读并遵守本《用户服务协议》（以下简称“本协议”）。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。
          </text>

          <text class="paragraph-title">一、服务内容</text>
          <text class="paragraph-content">
            1. 本协议项下的服务是指{{
              SITE_NAME
            }}向用户提供的包括但不限于商品浏览、购买、评价、会员服务、积分管理、优惠券使用、售后服务等功能及单项服务。
            2. {{ SITE_NAME }}保留随时修改或中断服务的权利，且无需事先通知用户。
            3. 用户理解，{{
              SITE_NAME
            }}仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为访问互联网而支付的电话费及上网费）均应由用户自行负担。
          </text>

          <text class="paragraph-title">二、用户行为规范</text>
          <text class="paragraph-content">
            1.
            您在使用本服务时须遵守法律法规，不得利用本服务从事违法违规行为，包括但不限于：
            - 发布、传送、传播、储存违反国家法律法规的内容 -
            发布、传送、传播虚假信息，或冒充、利用他人名义 -
            从事任何可能对互联网或移动网正常运转造成不利影响的行为 -
            侵犯其他用户或第三方合法权益的行为 2.
            用户在使用本服务过程中，应当遵守以下规则： -
            遵守所有与网络服务有关的网络协议、规定和程序 -
            不得利用本服务进行任何可能对互联网的正常运行造成不利影响的行为 -
            不得利用本服务进行任何不利于{{ SITE_NAME }}的行为
          </text>

          <text class="paragraph-title">三、用户账号</text>
          <text class="paragraph-content">
            1.
            用户注册时应当提供真实、准确、完整的个人资料，并在资料发生变更时及时更新。
            2. 用户应当妥善保管账号和密码，对账号下的所有行为负责。 3.
            如发现任何未经授权使用用户账号的情况，应立即通知{{ SITE_NAME }}。
          </text>

          <text class="paragraph-title">四、隐私保护</text>
          <text class="paragraph-content">
            1.
            {{
              SITE_NAME
            }}重视对用户个人信息的保护，承诺按照相关法律法规保护用户的个人信息。
            2. 未经用户同意，{{
              SITE_NAME
            }}不会向任何第三方提供、公开或共享用户的个人信息，但法律法规另有规定的除外。
          </text>

          <text class="paragraph-title">五、知识产权</text>
          <text class="paragraph-content">
            1.
            {{
              SITE_NAME
            }}在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归{{
              SITE_NAME
            }}所有。 2. 未经{{
              SITE_NAME
            }}或相关权利人的书面同意，用户不得以任何方式使用、复制、修改、传播或发布上述内容。
          </text>

          <text class="paragraph-title">六、免责声明</text>
          <text class="paragraph-content">
            1. 用户理解并同意，{{
              SITE_NAME
            }}不对因下列情况导致的任何损害赔偿承担责任： -
            因不可抗力导致的服务中断或数据丢失 - 因用户自身原因导致的任何损失 -
            因第三方原因导致的任何损失 2.
            {{
              SITE_NAME
            }}不保证服务一定能满足用户的要求，也不保证服务不会中断。
          </text>

          <text class="paragraph-title">七、协议修改</text>
          <text class="paragraph-content">
            1.
            {{
              SITE_NAME
            }}有权在必要时修改本协议条款，协议条款一旦发生变动，将会在相关页面上公布修改后的协议条款。
            2.
            如果用户不同意修改后的协议条款，可以主动取消已获得的服务；如果用户继续使用服务，则视为用户接受修改后的协议条款。
          </text>

          <text class="paragraph-title">八、法律适用</text>
          <text class="paragraph-content">
            1. 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。
            2.
            如发生本协议相关的任何争议，应友好协商解决；协商不成的，任何一方均可向{{
              SITE_NAME
            }}所在地有管辖权的人民法院提起诉讼。
          </text>

          <view style="height: 40px"></view>
        </view>
      </scroll-view>
    </view>
  </layout>
</template>

<script setup>
const { SITE_NAME } = uni.$com.env();
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
