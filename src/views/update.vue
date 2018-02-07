<template>
  <div class="page-con login-bg">
    <div class="login-con">
      <div class="login-form">
        <img src="../assets/img/logo.png" class="logo">
        <div class="login-group">
          <label><img src="../assets/img/icon-login3.png" width="10" height="15"></label>
          <input type="number" placeholder="请输入手机号码" v-model.number="phone">
        </div>
        <div class="login-group">
          <label><img src="../assets/img/icon-login4.png" width="14" height="11"></label>
          <input type="text" placeholder="请输入验证码" v-model="code">
          <button class="btn-air" style="height: 25px;" @click="getCode" :disabled="time > 0">{{text}}</button>
        </div>
        <div class="login-group">
          <label><img src="../assets/img/icon-login2.png" width="13" height="13"></label>
          <input type="password" placeholder="请输入新密码" v-model="password">
        </div>
      </div>
      <button class="btn" style="margin-top: 30px;" @click="signUp">修改</button>
    </div>
  </div>
</template>
<script>
  export default {
    created () {
    },
    data () {
      return {
        password: '',
        phone: '',
        code: '',
        time: 0,
        disabled: false
      }
    },
    methods: {
      signUp () {
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          this.$msg('请输入正确的手机号码!')
          return
        }
        if (!this.code) {
          this.$msg('请输入验证码!')
          return
        }
        if (this.password < 6) {
          this.$msg('密码长度必须大于6位!')
          return
        }
        this.$http.get('user100002', {
          params: {
            phone: this.phone,
            pwd: this.password,
            code: this.code
          }
        }).then(result => {
          let redirect = this.$route.params.redirect
          if (redirect) {
            this.$router.push({path: redirect})
          } else {
            this.$router.push({path: '/mine'})
          }
        })
      },
      getCode () {
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          this.$msg('请输入正确的手机号码!')
          return
        }
        this.$http.get(`user100000?phone=${this.phone}&time=60&type=3`)
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
