<template>
  <div class="page-con" v-if="!loading">
    <div class="form" style="margin-top: 25px;">
      <div class="form-group">
        <label>卡号：</label>
        <input type="number" placeholder="暂无卡号" v-model="user.cardInfo.cardNo" readonly>
      </div>
      <div class="form-group">
        <label>姓名：</label>
        <input type="text" placeholder="请输入您的姓名" v-model="user.realName" readonly>
      </div>
      <div class="form-group">
        <label>手机号码：</label>
        <input type="number" placeholder="请输入您的手机号码" v-model="user.phone" readonly>
      </div>
    </div>
    <ul class="mine-money">
      <li><p>余额:  {{user.userWallet.balance * 0.01}}元</p></li>
      <li><p>佣金:  {{user.userWallet.commision * 0.01}}元</p></li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        user: {},
        loading: true
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.$http.get(`user100005?id=${this.$route.query.id}`)
          .then((items) => {
            this.user = items
            this.$nextTick(() => {
              this.loading = false
            })
          })
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";


</style>
