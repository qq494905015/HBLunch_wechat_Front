<template>
  <div class="page-con">
    <div class="shop-detail" v-if="shop">
      <div class="shop-info">
        <img :src="shop.logo" class="logo">
        <h2>{{shop.name}}</h2>
        <p @click="showMap(shop)" class="address">地址:{{shop.address}}</p>
        <p>电话:{{shop.phone}}</p>
      </div>
      <div class="shop-description" v-html="shop.description"></div>
    </div>
  </div>
</template>
<script>
  import coordtransform from 'coordtransform'
  export default {
    created () {
      this.$http.get('shop100001?id=' + this.$route.query.id)
        .then((items) => {
          this.shop = items
        })
      this.$http.post(`getWechatJSSDK`, {
        signUrl: location.href.split('#')[0]
      }).then(wx => {
        this.$wechat.config({
          appId: wx.appId, // 必填，公众号的唯一标识
          timestamp: wx.timestamp, // 必填，生成签名的时间戳
          nonceStr: wx.nonceStr, // 必填，生成签名的随机串
          signature: wx.signature, // 必填，签名，见附录1
          jsApiList: ['openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      })
    },
    data () {
      return {
        shop: ''
      }
    },
    methods: {
      showMap ({latitude, longitude, name}) {
        let bd09togcj02 = coordtransform.bd09togcj02(latitude, longitude)
        this.$wechat.openLocation({
          latitude: bd09togcj02[0], // 纬度，浮点数，范围为90 ~ -90
          longitude: bd09togcj02[1], // 经度，浮点数，范围为180 ~ -180。
          name // 位置名
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .shop-info {
    text-align: center;
    line-height: 1.8;
    padding-bottom: 10px;
    img {
      width: 65px;
      height: 65px;
      border-radius: 50%;
    }
    h2 {
      font-size: 15px;
    }
    p {
      color: $black-lighter;
    }
    .address {
      display: inline-block;
      padding-left: 12px;
      background: url("../assets/img/address.png") left center / 12px no-repeat;
      color: #1cade7;
    }
  }

  .shop-description {
    img {
      margin-bottom: 10px;
    }
  }

</style>
