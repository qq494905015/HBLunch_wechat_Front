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
          <label><img src="../assets/img/icon-login2.png" width="13" height="13"></label>
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div style="height: 25px;margin-top: 10px;">
          <router-link :to="{name: 'update', params: {redirect: this.$route.params.redirect}}"
                       style="line-height: 25px;float: left;color: #fec963;">修改密码
          </router-link>
          <router-link :to="{name: 'sign-up', params: {redirect: this.$route.params.redirect}}" tag="button"
                       class="btn-air" style="height: 25px;float: right;">首次注册
          </router-link>
        </div>
      </div>
      <button class="btn" style="margin-top: 30px;" @click="signIn">登录</button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        password: '',
        phone: ''
      }
    },
    created () {
      console.log(this.$route.params.redirect)
      console.log(this.$router.match(window.location))
    },
    methods: {
      signIn () {
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          this.$msg('请输入正确的手机号码!')
          return
        }
        if (this.password.length < 6) {
          this.$msg('密码不能小于6位!')
          return
        }
        this.$http.get('user100003', {
          params: {
            phone: this.phone,
            pwd: this.password
          }
        }).then(result => {
          let redirect = this.$route.params.redirect
          if (redirect) {
            this.$router.push({path: redirect})
          } else {
            this.$router.push({path: '/mine'})
          }
          // this.$router.push({name: 'mine'})
        })
      }
    }
  }
</script>
