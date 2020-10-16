<template>
  <div class="tags-view-container">
    <ScrollPane class="tags-view-wrapper" ref="scrollPane">
      <router-link 
        v-for="tag in visitedViews"
        :key="tag.path"
        ref="tag"
        class="tags-view-item"
        :class="{'active': isActive(tag)}"
        tag="span"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </ScrollPane>
  </div>
</template>

<script>
import path from 'path'
import ScrollPane from './ScrollPane'

export default {
  name: 'TagsView',
  components: {
    ScrollPane
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedView
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.addEventListener('click', this.closeMenu)
      } else {
        document.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    initTags() {
      this.affixTags = this.filterAffixTags(this.routes)
      this.affixTags.forEach(tag => {
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      })
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
        console.log('tagsView--Route', this.$route)
      }
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name || 'no-name',
            meta: {...route.meta}
          })
        }
        if (route.children) {
          const subTags = this.filterAffixTags(route.children, route.path)
          if (subTags.length) {
            tags = tags.concat(subTags)
          }
        }
      })
      return tags
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for(const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$route.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    closeSelectedTag(tag) {
      // TODO: close tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss">
.tags-view-container {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      text-align: center;
      vertical-align: 2px;
      border-radius: 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="scss" >
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    // display: flex;
    // align-items: center;
    // height: 100%;
    .tags-view-item {
      position: relative;
      display: inline-block;
      margin-left: 5px;
      margin-top: 4px;
      padding: 0 8px;
      line-height: 26px;
      font-size: 12px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      cursor: pointer;
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: ' ';
          display: inline-block;
          margin-right: 2px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
        }
      }
    }
  }
}
</style>