<template>
  <el-card class="list-container">
    <div slot="header">
      <span>Poor infinite scroll</span>
    </div>
    
    <div class="scrollable scrollbar">
      <ul class="list-wrapper" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <li v-for="i in count" :key="i" class="list-item">{{i}}</li>
      </ul>
      <p v-if="loading">Loading...</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'InfiniteList',
  data() {
    return {
      count: 10,
      loading: false,
    }
  },
  computed: {
    disabled() {
      return this.loading
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  .scrollable {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 400px;
    
  }
  .list-wrapper {
    margin: 0;
    padding: 0;
    list-style: none;
    .list-item {
      padding: 1em 0;
      &:hover {
        background: skyblue;
      }
    }
  }
}
</style>