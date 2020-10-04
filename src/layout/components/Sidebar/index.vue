<template>
  <div>Sidebar</div>
</template>

<script>
import { mapGetters } from 'vuex'
import varibles from '@/styles/variables.scss'

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
      return varibles
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style>

</style>