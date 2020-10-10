<template>
  <div v-if="!item.hidden">
    <template v-if="hasOnlyShowingChild(item.chilren, item) && 
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      
    </template>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Link from './Link'

export default {
  name: 'SidebarItem',
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