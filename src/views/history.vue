<template>
  <div class="page-con">
    <ul class="history-list" v-if="list.total > 0">
      <li v-for="item in list.items">
        <div class="detail">
          <h3>
            <template v-if="item.fromType == 1">购买会员卡</template>
            <template v-else-if="item.fromType == 2">充值</template>
            <template v-else>{{item.shopName}}</template>
          </h3>
          <p>{{item.createTime}}</p>
        </div>

        <div class="money">
          <template v-if="item.fromType == 2">+</template>
          <template v-else>-</template>
          {{((item.money || 0) * 0.01).toFixed(2)}}
        </div>
      </li>
    </ul>
    <template v-else>
      暂无消费记录
    </template>
  </div>
</template>
<script>
  export default {
    created () {
      this.$http.post('userbusiness100002', {
        pageNum: 1,
        pageSize: 99
      }).then((data) => {
        this.list = data
      })
    },
    data () {
      return {
        list: {}
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/helpers/mixin";

  .history-list {
    font-size: 15px;
    margin: -15px;
    li {
      display: flex;
      line-height: 1;
      padding: 8px 15px;
      @extend .bottomBorder;
    }
    .detail {
      flex-grow: 1;
      p {
        margin-top: 6px;
        color: #999999;
        font-size: 12px;
      }
    }
    .money {
      line-height: 33px;
    }
  }
</style>
