<template>
  <div class="page-con">
    <div class="form">
      <div class="form-group">
        <label>姓名：</label>
        <input type="text" placeholder="请输入您的姓名" v-model="name">
      </div>
      <div class="form-group">
        <label>手机号码：</label>
        <input type="number" placeholder="请输入您的手机号码" v-model.number="phone">
      </div>
      <div class="form-group">
        <label>问题描述：</label>
        <textarea placeholder="请输入您的问题描述" v-model="description"></textarea>
      </div>
      <button class="btn" style="margin-top: 50px;" @click="submit">提交</button>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        name: '',
        description: '',
        phone: ''
      }
    },
    methods: {
      submit () {
        if (!this.name) {
          Toast('请输入姓名!')
          return
        }
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          Toast('请输入正确的手机号码!')
          return
        }
        if (!this.description) {
          Toast('请输入问题描述!')
          return
        }
        this.$http.get(`feedback100000?userName=${this.name}&phone=${this.phone}&description=${this.description}`)
          .then((result) => {
            Toast('提交成功')
          })
      }
    }
  }
</script>
