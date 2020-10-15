<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" :isActive="sidebar.opened" @toggleClick="toggleSidebar"/>

    <Breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <Search class="right-menu-item"/>

        <Screenfull class="right-menu-item hover-effect"/>

        <el-tooltip content="Layout Size" effect="dark" placement="bottom">
          <SizeSelect class="right-menu-item hover-effect"/>
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu>
          <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a href="https://github.com/authetic-x" target="_blank">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a href="https://github.com/authetic-x" target="_blank">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">Log Out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Search from '@/components/Search'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'

export default {
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
    Search,
    Screenfull,
    SizeSelect
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
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
      vertical-align: text-bottom;
    }
    .hover-effect {
      cursor: pointer;
      transition: background .3s;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        position: relative;
        margin-top: 5px;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
        }
        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>