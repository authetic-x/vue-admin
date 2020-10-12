<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg"  @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <Navbar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, Navbar } from './components'
import { mapState } from 'vuex'
import ResizeMixin from './mixin/resizeHandler'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    }
  },
  mixins: [ResizeMixin],
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSidebar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  &.mobile .fixed-header {
    width: 100%;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  &.hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }
}
</style>