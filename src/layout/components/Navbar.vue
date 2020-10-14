<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" :isActive="sidebar.opened" @toggleClick="toggleSidebar"/>

    <Breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <Search class="right-menu-item"/>
        <Screenfull class="right-menu-item hover-effect"/>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Search from '@/components/Search'
import Screenfull from '@/components/Screenfull'

export default {
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
    Search,
    Screenfull
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('app/toggleSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    float: left;
    width: 50px;
    height: 100%;
    line-height: 50px;
    transition: background .3s;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, .025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      color: #5a5e66;
      font-size: 18px;
    }
    .hover-effect {
      cursor: pointer;
      transition: background .3s;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }
}
</style>