<template>
  <div class="home">
    <h1>Get article</h1>
    <p>{{article.title}}</p>
  </div>
</template>

<script>
import axios from '@/utils/request'

export default {
  name: 'Home',
  data() {
    return {
      article: '',
    }
  },
  mounted() {
    axios.get('/vue-element-admin/article/list')
    .then(res => {
      console.log(res)
      this.article = res.data
    })
  }
}
</script>
