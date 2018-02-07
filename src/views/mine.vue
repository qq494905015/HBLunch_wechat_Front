<template>
  <div class="page-con mine-page" v-if="user.id">
    <img src="../assets/img/card2.png" style="height: 4.29rem;" @click="goPay">
    <div class="form" style="margin-top: 25px;">
      <div class="form-group" v-if="user.cardInfo.cardNo">
        <label>卡号：</label>
        <input type="text" placeholder="暂无卡号" v-model="user.cardInfo.cardNo" readonly>
      </div>
      <div class="form-group">
        <label>姓名：</label>
        <input type="text" placeholder="请输入您的姓名" @change="changeName" v-model="user.realName">
      </div>
      <div class="form-group">
        <label>手机号码：</label>
        <input type="number" placeholder="请输入您的手机号码" v-model="user.phone" readonly>
      </div>
      <div class="form-group">
        <label>出生日期：</label>
        <datetime v-model="user.birthday" :max-year="2018" title="出生日期" :min-year="1950" @on-change="changeBirthday"
                  :show.sync="visibility">
          <input type="text" placeholder="请选择您的出生日期" v-model="user.birthday" readonly>
        </datetime>
      </div>
    </div>
    <ul class="mine-money">
      <li><p>余额:  {{user.userWallet.balance * 0.01}}元</p>
        <router-link to="/recharge" class="btn-air">充值</router-link>
      </li>
      <li><p>佣金:  {{user.userWallet.commision * 0.01}}元</p>
        <router-link :to="{name: 'withdraw', query: {money: user.userWallet.commision * 0.01}}" class="btn-air">提现














        </router-link>
      </li>
    </ul>
    <router-link :to="{name: 'history'}" v-if="user.cardInfo.cardNo"
                 class="btn-block">消费记录查询

    </router-link>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img :src="codeStr" style="max-width:100%">
        </div>
        <p style="font-size: 16px;color: #fec963;">{{user.cardInfo.cardNo}}</p>
        <div @click="showHideOnBlur=false" style="padding: 5px;">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import { Datetime, XDialog, TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Datetime,
      XDialog
    },
    created () {
      this.$http.get('user100007')
        .then((result) => {
          this.user = result
        })

      this.$http.get('card100007')
        .then(({codeStr}) => {
          this.codeStr = codeStr
        })
    },
    data () {
      return {
        codeStr: '',
        pickerValue: '',
        visibility: false,
        user: {},
        date: '2016-5-6',
        showHideOnBlur: false
      }
    },
    methods: {
      changeName () {
        this.$http.get('user100009', {params: {realName: this.user.realName}})
      },
      changeBirthday (date) {
        this.$http.get(`user100009?birthday=${this.user.birthday}`)
      },
      goPay () {
        if (this.user.cardInfo.cardNo) {
          this.showHideOnBlur = true
        } else {
          this.$msg('您还没有绑定会员卡!')
        }
      }
    }
  }
</script>
<style lang="scss">
  .vux-close {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    color: #999;
    width: 24px;
    height: 24px;
  }

  .vux-close:before, .vux-close:after {
    content: '';
    position: absolute;
    left: 0;
    top: 11px;
    width: 24px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .vux-close:after {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .mine-page {
    font-size: 17px;
    .form-group {
      label {
        width: 90px;
      }
      input {
        font-size: 16px;
      }
    }
  }
</style>
