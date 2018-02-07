<template>
  <div class="page-con" style="padding:0 0 80px;">
    <ul class="apply-nav">
      <template v-for="i in 4">
        <li class="line" v-if="i > 1"></li>
        <li class="round" :class="{active: activeIndex >= i}"></li>
      </template>
    </ul>
    <div class="apply-content">
      <img src="../assets/img/card.png" style="height: 4.5rem;">
      <div class="apply-item" v-show="activeIndex === 1">
        <div class="apply-tit"><em>1</em>选号</div>
        <ul class="select-list">
          <li @click="numberRandom = false" :class="{active: !numberRandom}">选号</li>
          <li @click="numberRandom = true" :class="{active: numberRandom}">随机分配</li>
        </ul>
        <div v-show="!numberRandom">
          <div class="apply-search">
            <div class="form">
              <input type="number" v-model="searchWord" placeholder="搜索您喜欢的号码，如8888">
              <button type="button" @click="submitSearch"></button>
            </div>
          </div>
          <div class="search-con" v-if="searchNumber.length">
            <div class="apply-tit">搜索结果</div>
            <ul class="select-list number-list">
              <li v-for="item in searchNumber" @click="checkNumber(item)" :class="{active: number === item.cardNo}">
                {{item.cardNo}}
















              </li>
            </ul>
          </div>
          <div class="apply-tit"><img src="../assets/img/icon1.png">
            <p>自选号码</p> <span @click="getNormalNumber" class="refresh-number">换一批</span></div>
          <ul class="select-list number-list">
            <li v-for="item in normalNumber" @click="checkNumber(item)" :class="{active: number === item.cardNo}">
              {{item.cardNo}}
















            </li>
          </ul>
          <div class="apply-tit"><img src="../assets/img/icon2.png">
            <p>顶级号码</p></div>
          <ul class="select-list number-list">
            <li v-for="item in goodsNumber" @click="checkNumber(item)" :class="{active: number === item.cardNo}">
              {{item.cardNo}}
              <em>({{item.price * 0.01}}元)</em>
            </li>
          </ul>
        </div>
        <p class="randomTxt" v-show="numberRandom">若您选择随机分配，我们将在当前已开放的号段内帮您分配卡号。</p>
      </div>
      <div class="apply-item" v-show="activeIndex === 2">
        <div class="apply-tit"><em>2</em>定制姓名</div>
        <ul class="select-list">
          <li @click="custom = false" :class="{active: !custom}">不定制</li>
          <li @click="custom = true" :class="{active: custom}">定制姓名</li>
        </ul>
        <p class="randomTxt" v-show="!custom">标准发卡时间约付款后的5-7个工作日</p>
        <div v-show="custom" class="apply-form topBorder">
          <input type="text" placeholder="您的姓氏，拼音如LUO" v-model="surname">
          <input type="text" placeholder="您的名字，拼音如LINFENG" v-model="name">
        </div>
      </div>
      <div class="apply-item" v-show="activeIndex === 3">
        <div class="apply-tit"><em>3</em>收件信息</div>
        <div class="apply-form">
          <input type="text" placeholder="收件人" v-model="realName">
          <input type="text" placeholder="手机号码" v-model="phone">
          <input type="text" placeholder="推荐人手机号码，非必填" v-model="recommendPhone">
          <x-address title="" value-text-align="left" v-model="city" :list="addressData"
                     placeholder="请选择地址"></x-address>

          <textarea placeholder="详细地址" v-model="address"></textarea>
        </div>
      </div>
      <div class="apply-item" v-show="activeIndex === 4">
        <div class="apply-tit"><em>4</em>提交</div>
        <div class="apply-txt topBorder">
          万味黑卡: {{number}}<br>
          收件人: {{realName}} <br>
          联系电话: {{phone}} <br>
          收件地址: {{fullAddress}}





        </div>
      </div>
    </div>
    <footer class="apply-footer" :class="{one: activeIndex === 4 || activeIndex === 1}">
      <div class="top">
        <p>万味黑卡基础办理费用</p>
        <p class="price">¥{{price * 0.01}}元</p>
      </div>
      <div class="btns">
        <button type="button" @click="prevStep" class="btn-air">上一步</button>
        <button type="button" @click="nextStep" class="btn" v-text="activeIndex === 4 ? '提交' : '下一步'"></button>
      </div>
    </footer>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import 'mint-ui/lib/toast/style.css'
  import { XAddress, ChinaAddressV3Data, Group, Value2nameFilter as value2name } from 'vux'
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
      this.getNormalNumber()
      this.$http.get('card100000?pageNum=1&pageSize=10&isGoods=1')
        .then(({items}) => {
          this.goodsNumber = items
        })
      this.$http.get(`wechatAuth?code=${this.getUrlParam('code')}&state=${this.getUrlParam('state')}`, {noMsg: true})
        .then(({items}) => {
          console.log(items)
        })
    },
    data () {
      return {
        addressData: ChinaAddressV3Data,
        number: 0,
        numberId: 0,
        activeIndex: 1,
        numberRandom: false,
        surname: '',
        name: '',
        realName: '',
        phone: '',
        recommendPhone: '',
        city: [],
        address: '',
        custom: true,
        normalNumber: [],
        goodsNumber: [],
        searchWord: '',
        searchNumber: [],
        pageNum: 0,
        price: 0
      }
    },
    methods: {
      getUrlParam (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      },
      checkNumber (item) {
        this.number = item.cardNo
        this.numberId = item.id
        this.price = item.price
      },
      prevStep () {
        this.activeIndex--
      },
      nextStep () {
        if (this.activeIndex === 2) {
          if (this.custom && (!this.surname || !this.name)) {
            Toast('请填写所有字段')
            return
          }
        }
        if (this.activeIndex === 3) {
          if (!this.realName) {
            Toast('请填写收件人姓名')
            return
          }
          if (!this.phone) {
            Toast('请填写手机号码')
            return
          }
          if (this.city.length === 0) {
            Toast('请选择省市区')
            return
          }
          if (!this.address) {
            Toast('请输入详细地址')
            return
          }
        }
        if (this.activeIndex === 4) {
          let that = this
          this.$http.get('order100000', {
            params: {
              cardId: this.numberId,
              surname: this.custom ? this.surname : '',
              name: this.custom ? this.name : '',
              realName: this.realName,
              phone: this.phone,
              address: this.fullAddress,
              recommendPhone: this.recommendPhone
            }
          }).then(({payInfo}) => {
            this.$wechat.chooseWXPay({
              timestamp: payInfo.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: payInfo.nonce_str, // 支付签名随机串，不长于 32 位
              package: `prepay_id=${payInfo.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: payInfo.sign, // 支付签名
              success: function (res) {
                // 支付成功后的回调函数
                that.$router.push({name: 'result', query: {type: 'success'}})
              },
              error: e => {
                that.$router.push({name: 'result'})
              }
            })
          })
        }
        this.activeIndex < 4 && this.activeIndex++
      },
      selectedNumber () {
        return this.normalNumber.some(item => item.cardNo === this.number) || this.goodsNumber.some(item => item.cardNo === this.number) || this.searchNumber.some(item => item.cardNo === this.number)
      },
      getNormalNumber () {
        this.$http.get(`card100000?pageNum=${++this.pageNum}&pageSize=10&isGoods=0`)
          .then(({items, pageNum}) => {
            console.log(pageNum)
            if (items.length === 0) {
              if (pageNum > 1) {
                this.pageNum = 0
                this.getNormalNumber()
              } else {
                this.$msg('没有更多了')
              }
              return
            }
            this.normalNumber = items
            if (!this.selectedNumber()) {
              this.number = items[0].cardNo
              this.numberId = items[0].id
              this.price = items[0].price
            }
          })
      },
      submitSearch () {
        this.$http.get('card100000?pageNum=1&pageSize=10&isGoods=0&search=' + this.searchWord)
          .then(({items}) => {
            for (let i = 0; i < items.length; i++) {
            }
            this.searchWord = ''
            this.searchNumber = items
            if (!this.selectedNumber()) {
              this.number = items[0].cardNo
              this.numberId = items[0].id
              this.price = items[0].price
            }
          })
      }
    },
    computed: {
      fullAddress () {
        return value2name(this.city, ChinaAddressV3Data) + ' ' + this.address
      }
    },
    components: {
      XAddress,
      Group
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .apply-nav {
    @extend %vertical;
    height: 75px;
    padding: 0 50px;
    .line {
      flex-grow: 1;
      width: 1%;
      height: 2px;
      background-color: $gray-dark;
    }
    .round {
      background-color: $gray-dark;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      box-shadow: 0 0 0 6px rgba($gray-dark, 0.2);
      &.active {
        background-color: $color-primary;
        box-shadow: 0 0 0 6px rgba($color-primary, 0.4);
      }
    }
  }

  .apply-tit {
    padding: .3rem;
    display: flex;
    line-height: 15px;
    em {
      color: #ffffff;
      background-color: $color-primary;
      text-align: center;
      font-size: 12px;
      width: 15px;
      display: block;
      border-radius: 50%;
      margin-right: 5px;
    }
    p {
      flex-grow: 1;
      margin-left: 5px;
    }
    img {
      height: 15px;
    }
  }

  .refresh-number {
    display: block;
    background: url("../assets/img/icon-refresh.png") left center / 12px no-repeat;
    padding-left: 16px;
    color: $color-primary;
  }

  .select-list {
    padding-right: .3rem;
    @extend .clearfix;
    li {
      float: left;
      margin-left: .3rem;
      margin-bottom: .3rem;
      width: 3.3rem;
      line-height: .7rem;
      text-align: center;
      @extend .thumbBorder;
      &.active {
        color: $color-primary;
        &:after {
          border-color: $color-primary;
        }
      }
    }
  }

  .randomTxt {
    padding: .3rem;
    @extend .topBorder;
    color: $gray-dark;
  }

  .number-list {
    border-bottom: 1px solid $gray-dark;
    .active {
      background: url("../assets/img/icon-active.png") right bottom / .25rem no-repeat;
    }
    em {
      color: $color-primary;
    }
  }

  .apply-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #313035;
    padding: 6px 14px;
    z-index: 10;
    .top {
      @extend %vertical-center;
      color: #ffffff;
      margin-bottom: 8px;
      line-height: 1.2;
    }
    .price {
      color: $color-primary;
    }
    .btns {
      display: flex;
      flex-grow: 1;
    }
    button {
      flex: 1;
      &:first-child {
        margin-right: 14px;
      }
    }
    &.one {
      flex-direction: inherit;
      button {
        &:first-child {
          display: none;
        }
      }
      .top {
        flex-direction: column;
        margin-bottom: 0;
        margin-right: 60px;
      }
    }
  }

  .apply-form {
    padding: .3rem;
    input {
      display: block;
      line-height: 35px;
      padding: 0 10px;
      border: 1px solid $gray-dark;
      border-radius: $radius-normal;
      width: 100%;
      margin-bottom: 14px;
    }
    textarea {
      display: block;
      line-height: 35px;
      padding: 0 10px;
      border: 1px solid $gray-dark;
      border-radius: $radius-normal;
      width: 100%;
    }
  }

  .apply-txt {
    padding: .3rem;
    color: $black-lighter;
    line-height: 2.5;
  }

  .vux-cell-box {
    &:before {
      display: none;
    }
    line-height: 35px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 14px;
  }
</style>
