<template>
  <div class="page-con">
    <dl class="price-list">
      <dt>充值金额</dt>
      <dd v-for="money in list" @click="recharge(money)">{{money}}元</dd>
    </dl>
  </div>
</template>
<script>
  export default {
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
          jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      })
    },
    data () {
      return {
        list: [
          100,
          500,
          1000,
          2000,
          3000,
          5000,
          10000
        ]
      }
    },
    methods: {
      recharge (money) {
        let that = this
        this.$http.post('userbusiness100001', {money: money * 100})
          .then(({payInfo}) => {
            this.$wechat.chooseWXPay({
              timestamp: payInfo.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: payInfo.nonce_str, // 支付签名随机串，不长于 32 位
              package: `prepay_id=${payInfo.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: payInfo.sign, // 支付签名
              success: function (res) {
                // 支付成功后的回调函数
                that.$router.push({name: 'mine'})
              },
              error: e => {
                that.$router.push({name: 'result'})
              }
            })
          })
      }
    }
  }
</script>
