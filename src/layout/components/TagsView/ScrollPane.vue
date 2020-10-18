<template>
  <el-scrollbar class="scroll-container" :vertical="false" ref="scrollbar">
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  name: 'ScrollPane',
  computed: {
    scrollWrapper() {
      return this.$refs.scrollbar.$el
    }
  },
  methods: {
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollbar.$el
      const containerWidth = $container.offsetWidth
      const tagList = this.$parent.$refs.tag
      let firstTag = null, lastTag = null
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }
      if (firstTag === currentTag) {
        this.scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        console.log(this.scrollWrapper.offsetWidth, containerWidth)
        this.scrollWrapper.scrollLeft = this.scrollWrapper.offsetWidth - containerWidth
      } else {
        //TODO: a little complicated, leave it alone temp...
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  white-space: nowrap;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>