<template>
  <div class="page-con" v-show="!loading">
    <div class="tx-list">
      <div class="tx-group">
        <label>到账银行卡</label>
        <template v-if="bankList.length === 0">
          <router-link to="/bank-card">添加银行卡</router-link>
        </template>
        <template v-else>
          <select v-model="card" @change="change">
            <option v-for="(item, index) in bankList" :value="item.id" :selected="index === 0">{{item.bank}}</option>
            <option :value="-1">添加银行卡</option>
          </select>
        </template>
      </div>
      <div class="tx-group">
        <label>预留手机号码</label>
        <input type="number" v-model="phone" placeholder="请输入手机号码">
        <button class="btn-air" @click="getCode" :disabled="time > 0">{{text}}</button>
      </div>
      <div class="tx-group">
        <label>请输入验证码</label>
        <input type="number" v-model="code" placeholder="请输入验证码">
      </div>
      <p>提现金额</p>
      <div class="tx-group">
        <label style="width: auto;">¥</label>
        <input type="number" v-model="price" :placeholder="'（可提现金额¥' + money + '）'">
      </div>
    </div>
    <button class="btn" style="margin-top: 20px;" @click="submit">确认提现</button>
  </div>
</template>
<script>
  export default {
    created () {
      this.money = this.$route.query.money || 0
      this.$http.get('userbank100004')
        .then(data => {
          this.bankList = data
          this.bankList.length > 0 && (this.card = this.bankList[0].id)
          this.loading = false
        })
    },
    data () {
      return {
        loading: true,
        number: '',
        name: '',
        phone: '',
        money: 0,
        price: 0,
        code: '',
        bankList: [],
        card: '',
        time: 0
      }
    },
    methods: {
      change () {
        if (this.card === -1) {
          this.$router.push({name: 'bankCard'})
        }
      },
      submit () {
        if (!this.card) {
          this.$msg('请选择银行卡')
          return
        }
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          this.$msg('请输入正确的手机号码!')
          return
        }
        if (!this.code) {
          this.$msg('请输入验证码')
          return
        }
//        if (this.price > this.money) {
//          this.$msg(`提现金额不能超过${this.money}元`)
//          return
//        }
        this.$http.get('userbusiness100000', {
          params: {
            bankId: this.card,
            money: this.price * 100,
            phone: this.phone,
            code: this.code
          }
        }).then(data => {
          this.$msg('提现成功!')
          this.$router.push({name: 'mine'})
        })
      },
      getCode () {
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          this.$msg('请输入正确的手机号码!')
          return
        }
        this.$http.get(`user100000?phone=${this.phone}&time=60&type=4`)
          .then((result) => {
            this.time = 60
            this.timer()
          })
      },
      timer: function () {
        if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000)
        }
      }
    },
    computed: {
      text: function () {
        return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码'
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .tx-list {
    font-size: 15px;
    > p {
      margin: 10px 10px -10px;
    }
  }

  .tx-group {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid $gray-dark;
    line-height: 25px;
    label {
      width: 110px;
    }
    .btn-air {
      height: 25px;
      font-size: 12px;
    }
    input {
      flex-grow: 1;
      width: 1%;
    }
    select {
      color: #0088fc;
      flex-grow: 1;
      background: url("../assets/img/arrow1.png") right center / 10px auto no-repeat;
    }
  }
</style>
