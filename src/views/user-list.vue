<template>
  <div class="page-con user-list" v-show="!loading">
    <div class="apply-search">
      <div class="form">
        <input type="number" v-model="searchWord" placeholder="请输入手机号码...">
        <button type="button" @click="submitSearch()"></button>
      </div>
    </div>
    <ul>
      <li>
        <p>姓名</p>
        <p>手机号码</p>
        <p>生日</p>
      </li>

      <router-link tag="li" v-for="item in userList" :key="item.id" :to="{ name: 'userDetail', query: { id: item.id }}">
        <p>{{item.realName}}</p>
        <p>{{item.phone}}</p>
        <p>{{item.birthday}}</p>
      </router-link>
      <li>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        userList: [],
        searchWord: '',
        loading: true
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
        this.$http.get(`user100008?pageNum=1&pageSize=99&sign=&search=${this.$route.query.search || ''}`)
          .then(({items}) => {
            this.userList = items
            this.searchWord = ''
            this.loading = false
          })
      },
      submitSearch () {
        this.$router.push({name: 'userList', query: {search: this.searchWord}})
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

</style>
