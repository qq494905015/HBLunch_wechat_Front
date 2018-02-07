<template>
  <div class="page-con">
    <div class="form">
      <div class="form-group">
        <label>姓名：</label>
        <input type="text" placeholder="请输入您的姓名" v-model="userName">
      </div>
      <div class="form-group">
        <label>银行：</label>
        <select v-model="bankName" style="flex-grow: 1">
          <option :value="name" v-for="name in bankList">{{name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label>银行卡号：</label>
        <input type="number" placeholder="请输入您的银行卡号" v-model="bankNumber">
      </div>
      <div class="form-group">
        <label>手机号码：</label>
        <input type="number" placeholder="请输入您的手机号码" v-model="phone">
      </div>
      <button class="btn" style="margin-top: 50px;" @click="submit">添加</button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        userName: '',
        bankName: '中国工商银行',
        bankNumber: '',
        phone: '',
        bankList: ['中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '中国邮政储蓄银行', '中信银行', '中国光大银行', '华夏银行', '民生银行', '广发银行', '深圳发展银行', '招商银行', '兴业银行', '浦发银行', '平安银行', '恒丰银行', '渤海银行', '浙商银行', '上海银行', '花旗银行', '东亚银行', '渣打银行', '法兴银行', '大华银行', '新韩银行', '企业银行', '韩亚银行', '南洋商行', '星展银行']
      }
    },
    methods: {
      submit () {
        if (!this.userName) {
          this.$msg('请输入您的姓名!')
          return
        }
        if (!this.bankName) {
          this.$msg('请输入银行名字!')
          return
        }
        if (!(/^\d{16}|\d{19}$/.test(this.bankNumber))) {
          this.$msg('请输入正确的银行卡号!')
          return
        }
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          this.$msg('请输入正确的手机号码!')
          return
        }
        this.$http.get('userbank100000', {
          params: {
            bankNo: this.bankNumber,
            realName: this.userName,
            bank: this.bankName,
            phone: this.phone
          }
        }).then(result => {
          this.$msg('添加成功')
          this.$router.go(-1)
        })
      }
    }
  }
</script>
