<template>
  <el-scrollbar class="scroll-container" :vertical="false" ref="scrollbar">
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  name: 'ScrollPane',
  methods: {
    moveToTarget() {
      // TODO: 
    }
  }
}
</script>

<style>

</style>