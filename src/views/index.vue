<template>
  <div class="page-con business-index" v-if="!loading">
    <img src="../assets/img/btn1.png" @click="scanQRCode">
    <router-link to="/user-list">
      <img src="../assets/img/btn2.png" alt="">
    </router-link>
    <router-link to="report">
      <img src="../assets/img/btn3.png" alt="">
    </router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: true
      }
    },
    created () {
      let that = this
      that.$http.post(`getWechatJSSDK`, {
        signUrl: location.href.split('#')[0]
      }).then(wx => {
        that.$wechat.config({
          appId: wx.appId, // 必填，公众号的唯一标识
          timestamp: wx.timestamp, // 必填，生成签名的时间戳
          nonceStr: wx.nonceStr, // 必填，生成签名的随机串
          signature: wx.signature, // 必填，签名，见附录1
          jsApiList: ['getLocation', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        that.$wechat.ready(data => {
          console.log(data)
        })
      })
      this.$http.get('shop100005').then(() => {
        this.loading = false
      })
    },
    methods: {
      scanQRCode () {
        let that = this
        that.$wechat.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function ({resultStr}) {
            that.$router.push({name: 'toll', query: {id: resultStr}})
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              that.$msg('版本过低请升级')
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .business-index {
    img {
      display: block;
      margin-bottom: 15px;
    }
  }
</style>
