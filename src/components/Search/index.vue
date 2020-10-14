<template>
  <div class="header-search" :class="{'show': show}">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="handleClick"/>

    <el-select
      class="header-search-select"
      ref="search"
      v-model="search"
      :remote-method="querySearch"
      remote
      filterable
      default-first-open
      placeholder="Search"
      @change="handleChange"
    >
      <el-option v-for="opt in options" :key="opt.item.path" :value="opt.item" 
        :label="opt.item.title.join('>')"></el-option>
    </el-select>
  </div>
</template>

<script>
import path from 'path'
import Fuse from 'fuse.js'

export default {
  name: 'Search',
  data() {
    return {
      search: '',
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined
    }
  },
  watch: {
    show(value) {
      if (value) {
        document.addEventListener('click', this.handleClose)
      } else {
        document.removeEventListener('click', this.handleClose)
      }
    },
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    handleClick() {
      this.show = !this.show
      if (this.show) {
        this.$refs.search && this.$refs.search.focus()
      }
    },
    handleChange(route) {
      this.$router.push(route.path)
      this.search = ''
      this.options = []
      this.$nextTick(() => this.show = false)
    },
    handleClose() {
      this.$refs.search && this.$refs.search.blur()
      this.options = []
      this.show = false
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternlength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7,
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    },
    querySearch(query) {
      if (query) {
        this.options = this.fuse.search(query)
        console.log('query options:', this.options)
      } else {
        this.options = []
      }
    },
    generateRoutes(routes, basePath='/', prefixTitle=[]) {
      let res = []

      for (const route of routes) {
        if (route.hidden) continue
        const data = {
          path: path.resolve(basePath, route.path),
          title: [...prefixTitle]
        }
        if (route.meta && route.meta.title) {
          data.title = [...data.title, route.meta.title]
          if (route.redirect !== 'noRedirect') {
            res.push(data)
          }
        }
        if (route.children) {
          const tmpRoutes = this.generateRoutes(route.children, data.path, data.title)
          res = [...res, ...tmpRoutes]
        }
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  height: 100%;
  .search-icon {
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    overflow: hidden;
    display: inline-block;
    width: 0;
    border-radius: 0;
    font-size: 18px;
    vertical-align: middle;
    transition: width .2s;
    ::v-deep .el-input__inner {
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid #d9d9d9;
      border-color: #d9d9d9 !important;
      padding-left: 0;
      padding-right: 0;
    }
  }
  &.show {
    .header-search-select {
      margin-left: 10px;
      width: 210px;
    }
  }
}
</style>