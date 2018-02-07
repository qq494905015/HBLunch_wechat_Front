<template>
  <div class="page-con">
    <div class="money-header">
      <p>会员卡号:  {{user.cardNo}}</p>
      <p>会员姓名:  {{user.realName}}</p>
      <p>手机号码:  {{user.phone}}</p>
    </div>
    <div class="money-detail">
      <h2>输入消费金额</h2>
      <input type="number" v-model="money">
      <p>* 请确认会员信息无误</p>
      <p>* 请和会员确认好消费金额</p>
    </div>
    <button :disabled="disabled" class="btn" style="margin-top: 40px;" @click="submit">确定收费</button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        money: '',
        user: {},
        code: '',
        ids: '',
        disabled: false
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    methods: {
      fetchData () {
        let ids = this.$route.query.id.split(',')
        this.ids = ids
        this.$http.get(`card100004?code=${ids[0]}`)
          .then((result) => {
            this.user = result
          })
      },
      submit () {
        if (this.money <= 0) {
          this.$msg('金额不能小于0!')
          return
        }
        this.disabled = true
        this.$http.get(`shop100003?money=${this.money * 100}&codeId=${this.ids[1]}`)
          .then((result) => {
            this.$msg('收费成功')
            this.disabled = false
            setTimeout(() => {
              this.$router.push({name: 'index'})
            }, 1000)
          }).catch(() => {
            this.disabled = false
          })
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .money-header {
    font-size: 13px;
    line-height: 1.8;
    color: #999999;
    @extend .bottomBorder;
    padding-bottom: 10px;
  }

  .money-detail {
    P {
      color: #ff6060;
    }
    h2 {
      font-size: 15px;
      line-height: 50px;
    }
    input {
      border: 1px solid #ccc;
      border-radius: 3px;
      padding: 0 5px;
      display: block;
      height: 35px;
      width: 100%;
      margin-bottom: 15px;
    }
  }
</style>
