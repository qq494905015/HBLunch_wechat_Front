<template>
  <div class="page-con txt-box">
    <h2 v-if="type === 'memberNotes'">会员须知</h2>
    <h2 v-if="type === 'aboutUs'">关于我们</h2>
    <h2 v-if="type === 'memberNotesUrl'">常见问题</h2>
    <div class="txt-con2" v-html="content">
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        content: '',
        type: ''
      }
    },
    created () {
      this.$http.get('help100000')
        .then(res => {
          this.type = this.$route.query.type || 'memberNotes'
          let url = res[this.type + 'Url']
          if (url) {
            window.location = url
          }
          this.content = res[this.type]
        })
    }
  }
</script>
