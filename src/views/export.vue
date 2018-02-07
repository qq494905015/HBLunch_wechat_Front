<template>
  <div class="page-con export-con">
    <p class="export-tit">导出{{this.$route.query.date ? this.$route.query.date : '所有'}}的财务报表</p>
    <div class="export-box">
      <p>接收邮件地址:</p>
      <input type="text" placeholder="LLF@***.com" v-model="mail">
      <button class="btn" @click="fetchData">确定导出报表</button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        mail: ''
      }
    },
    methods: {
      fetchData () {
        if (!/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/.test(this.mail)) {
          this.$msg('请输入正确的邮箱地址')
          return
        }
        let query = this.$route.query
        this.$http.get('shop100004', {
          params: {
            mail: this.mail,
            startTime: query.startTime,
            endTime: query.endTime
          }
        }).then(({items}) => {
          this.$msg('导出成功!')
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .export-con {
    padding: 0;
    font-size: 15px;
  }

  .export-tit {
    padding: 15px;
    @extend .bottomBorder;
  }

  .export-box {
    padding: 15px;
    input {
      border: 1px solid #ccc;
      border-radius: 3px;
      padding: 0 5px;
      display: block;
      height: 35px;
      width: 100%;
      margin: 15px 0 30px;
    }
  }
</style>
