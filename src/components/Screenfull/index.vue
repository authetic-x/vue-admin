<template>
  <div class="screenfull">
    <svg-icon :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'" @click="handleClick"/>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullScreen: false,
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    handleClick() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'your browser can not work',
          type: 'warning'
        })
      }
      screenfull.toggle()
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    change() {
      this.isFullScreen = screenfull.isFullscreen
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.screenfull {
  display: inline-block;
}
</style>