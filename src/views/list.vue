<template>
  <div class="page-con">
    <p class="my-location" @click="getLocation">{{location ? location : '获取失败，点击重新获取'}}</p>
    <ul class="shop-list">
      <li v-for="shop in shops">
        <router-link :to="{ name: 'detail', query: { id: shop.id }}">
          <div class="img-warp">
            <img :src="shop.logo">
          </div>
          <div class="name"><p>{{shop.name}}</p>
            <span>{{shop.dist >= 1000 ? (shop.dist * 0.001 || 0).toFixed(3) + '千米' : shop.dist + '米'}}</span></div>
          <p class="address">地址: {{shop.address}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    created () {
      this.$http.post(`getWechatJSSDK`, {
        signUrl: location.href.split('#')[0]
      }).then(wx => {
        this.$wechat.config({
          appId: wx.appId, // 必填，公众号的唯一标识
          timestamp: wx.timestamp, // 必填，生成签名的时间戳
          nonceStr: wx.nonceStr, // 必填，生成签名的随机串
          signature: wx.signature, // 必填，签名，见附录1
          jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        this.$wechat.ready(res => {
          this.getLocation()
        })
      })
    },
    data () {
      return {
        shops: [],
        location: ''
      }
    },
    methods: {
      getLocation () {
        if (this.location) {
          return
        }
        let that = this
        that.$wechat.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success (res) {
//          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//          var speed = res.speed; // 速度，以米/每秒计
//          var accuracy = res.accuracy; // 位置精度
            that.$http.get(`shop100000?lng=${res.longitude}&lat=${res.latitude}`)
              .then((items) => {
                that.shops = items
              })
            that.$http.get(`shop100006?lng=${res.longitude}&lat=${res.latitude}`)
              .then(({addrList}) => {
                that.location = addrList[0].admName + addrList[0].name
              })
          },
          error () {
            this.$msg('获取地理位置失败!')
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .my-location {
    line-height: 40px;
    @include ellipsis(1);
    margin: -15px -15px 0;
    padding-left: 50px;
    background: url("../assets/img/icon-address.png") 15px center / 22px no-repeat #f5d8a0;
  }

  .shop-list {
    overflow: hidden;
    box-sizing: content-box;
    li {
      float: left;
      width: 48%;
      height: 230px;
      @extend .bottomBorder;
      padding: 10px 0;
      margin-bottom: -1px;
      &:nth-child(odd) {
        padding-right: 2%;
      }
      &:nth-child(even) {
        padding-left: 2%;
      }
    }
    .name {
      display: flex;
      p {
        flex-grow: 1;
      }
      span {
        color: $black-lighter;
      }
    }
    .address {
      font-size: 11px;
      color: $black-lighter;
      @include ellipsis(2);
    }
  }
</style>
