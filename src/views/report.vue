<template>
  <div class="page-con user-list">
    <div class="toll-header">
      <div class="toll-cell" style="margin-bottom: 10px;">
        <p>开始日期：</p>
        <datetime v-model="date" title="选择日期" :show.sync="visibility">
          <input type="text" placeholder="请选择开始日期" v-model="date" readonly>
        </datetime>
      </div>
      <div class="toll-cell">
        <p>结束日期：</p>
        <datetime v-model="date2" title="选择日期" :show.sync="visibility2">
          <input type="text" placeholder="请选择结束日期" v-model="date2" readonly>
        </datetime>
      </div>
      <div class="toll-cell" style="margin-top: 10px;">
        <p>总金额：</p>
        <em>{{toll.consumeTotal * 0.01}}元</em>
        <button class="btn-air" @click="search" style="margin-right: 10px;">查询</button>
        <button class="btn-air" @click="goPage">导出报表</button>
      </div>
    </div>
    <ul>
      <li>
        <p>姓名</p>
        <p>手机号码</p>
        <p>余额</p>
      </li>
      <li v-for="item in toll.items">
        <p>{{item.realName}}</p>
        <p>{{item.phone}}</p>
        <p>{{item.money * 0.01}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import { Datetime } from 'vux'
  export default {
    components: {
      Datetime
    },
    data () {
      return {
        date: '',
        date2: '',
        toll: '',
        visibility: false,
        visibility2: false
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.$http.get(`shop100002?pageNum=1&pageSize=99&startTime=${this.date}&endTime=${this.date2}`)
          .then((result) => {
            this.toll = result
            if (result.consumeTotal === 0) {
              this.$msg('暂无数据')
            }
          })
      },
      search (date) {
        if (this.date && this.date2) {
          this.fetchData()
        } else {
          this.$msg('请选择开始时间和结束时间')
        }
      },
      goPage () {
        if (this.date && this.date2) {
          this.$router.push({name: 'export', query: {startTime: this.date, endTime: this.date2}})
        } else {
          this.$msg('请选择开始时间和结束时间')
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .toll-header {
    padding: 15px;
    border-bottom: 10px solid #eee;
  }

  .toll-cell {
    display: flex;
    line-height: 35px;
    font-size: 15px;
    .vux-datetime {
      flex-grow: 1;
      border: 1px solid #ccc;
      border-radius: 3px;
      padding: 0 5px;
      display: block;
    }
    input {
      display: block;
      width: 100%;
      height: 100%;
    }
    em {
      flex-grow: 1;
      color: #fec963;
    }
    .btn-air {
      display: block;
      height: 25px;
      line-height: 23px;
      margin-top: 5px;
      padding: 0 5px;
    }
  }
</style>
