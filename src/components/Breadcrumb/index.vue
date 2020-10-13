<template>
  <el-breadcrumb>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) of levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length-1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      if (route.path.startsWith('/redirect/')) return
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
    console.log(this.levelList)
  },
  methods: {
    isDashboard(route) {
      return route.name === 'Dashboard'
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [{path: '/dashboard', meta: {title: 'Dashboard'}}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title 
        && item.meta.breadcrumb !== false)
    },
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  display: inline-block;
  margin-left: 8px;
  line-height: 50px;
  font-size: 14px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>