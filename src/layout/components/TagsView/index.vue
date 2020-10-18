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
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </ScrollPane>
    <ul v-if="visible" class="contextMenu" :style="{left: left + 'px', top: top + 'px'}">
      <li @click="refreshTag">Refresh</li>
    </ul>
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
            // TODO: full of bugs
            // this.$refs.scrollPane.moveToTarget(tag)
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$route.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    closeSelectedTag(tag) {
      this.$store.dispatch('tagsView/delView', tag).then(({ visitedView }) => {
        if (this.isActive(tag)) {
          this.toLastView(visitedView, tag)
        }
      })
    },
    toLastView(visitedViews, view) {
      const lastView = visitedViews[visitedViews.length - 1]
      if (lastView) {
        this.$router.push(lastView.fullPath)
      } else {
        if (view.name === 'Dashboard') {
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const minMenuWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().x
      const containerWidth = this.$el.offsetWidth
      const maxLeft = containerWidth - minMenuWidth
      const left = e.clientX - offsetLeft + 15
      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    refreshTag() {
      this.$store.dispatch('tagsView/delView', this.selectedTag).then(() => {
        // 强制刷新
        this.$router.replace({ path: '/redirect' + this.selectedTag.fullPath })
      })
    },
    closeOtherTags() {
      // TODO:
    },
    closeAllTags() {
      // TODO:
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

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
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
  .contextMenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    border-radius: 4px;
    list-style-type: none;
    z-index: 3000;
    font-size: 12px;
    font-weight: 400;
    background: #fff;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>