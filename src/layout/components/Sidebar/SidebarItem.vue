<template>
  <div v-if="!item.hidden">
    <template v-if="hasOnlyShowingChild(item.children, item) && 
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title"/>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title"/>
      </template>
      <sidebar-item 
        v-for="child in item.children"
        :key="child.path"
        class="nest-menu"
        :item="child"
        :base-path="item.path"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import AppLink from './Link'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: {
    AppLink,
    Item,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
       default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null,
    }
  },
  methods: {
    hasOnlyShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) return false
        this.onlyOneChild = item
        return true
      })
      if (showingChildren.length === 1) return true
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '',  noShowingChildren: true}
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style>

</style>