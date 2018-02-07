<template>
  <div class="page-con result-page">
    <template v-if="$route.query.type === 'success'">
      <img src="../assets/img/success.png" alt="">
      <h2>支付成功</h2>
      <p>尊敬的会员： <br>您好，我们已收到您的购卡申请，我们将马上为您安排制卡和寄卡工作。请先绑定后使用</p>

      <router-link :to="{name: 'bind'}" class="btn-block">绑定</router-link>
    </template>
    <template v-else>
      <img src="../assets/img/failure.png" alt="">
      <h2>支付失败</h2>
    </template>
  </div>
</template>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .result-page {
    text-align: center;
    padding-top: 40px;
    img {
      width: 125px;
    }
    h2 {
      font-size: 15px;
      margin-top: 10px;
    }
    p {
      color: #999999;
      text-align: left;
    }
  }
</style>
