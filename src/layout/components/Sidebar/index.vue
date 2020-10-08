<template>
  <div :class="{'hasLogo': showLogo}">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    activeMenu() {
      const { path, meta } = this.$route
      return meta.activeMenu ? meta.activeMenu : path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    varibles() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    variables() {
      return variables
    }
  }
}
</script>

<style>

</style>