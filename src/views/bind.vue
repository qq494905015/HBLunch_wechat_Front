<template>
  <div class="page-con login-bg">
    <div class="login-con">
      <div class="login-form">
        <img src="../assets/img/logo.png" class="logo">
        <div class="login-group">
          <label><img src="../assets/img/icon-login1.png" width="14" height="10"></label>
          <input type="text" placeholder="请输入卡号" v-model="cardNo">
        </div>
        <div class="login-group">
          <label><img src="../assets/img/icon-login3.png" width="10" height="15"></label>
          <input type="number" placeholder="请输入手机号码" v-model.number="phone">
        </div>
        <div class="login-group">
          <label><img src="../assets/img/icon-login4.png" width="14" height="11"></label>
          <input type="text" placeholder="请输入验证码" v-model="code">
          <button class="btn-air" style="height: 25px;" @click="getCode" :disabled="time > 0">{{text}}</button>
        </div>
      </div>
      <button class="btn" style="margin-top: 30px;" @click="bind">绑定</button>
    </div>
  </div>
</template>
<script>
  export default {
    created () {
      this.$http.get('card100006').then(res => {
        this.cardNo = res.cardNo
      })
      this.$http.get(`wechatAuth?code=${this.getUrlParam('code')}&state=${this.getUrlParam('state')}`, {noMsg: true})
        .then(({items}) => {
          console.log(items)
        })
    },
    data () {
      return {
        cardNo: '',
        phone: '',
        code: '',
        time: 0
      }
    },
    methods: {
      getUrlParam (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      },
      bind () {
        if (!this.cardNo) {
          this.$msg('请输入您的卡号!')
          return
        }
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          this.$msg('请输入正确的手机号码!')
          return
        }
        if (!this.code) {
          this.$msg('请输入验证码!')
          return
        }
        this.$http.get('card100002', {
          params: {
            cardNo: this.cardNo,
            code: this.code,
            phone: this.phone
          }
        }).then(result => {
          this.$msg('绑定成功')
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
