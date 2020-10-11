<template>
  <div :class="{'hasLogo': showLogo}">
    <el-scrollbar wrap-class="scrollbar-wrapper">
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
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route"
          :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes'
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