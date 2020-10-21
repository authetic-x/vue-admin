<template>
  <div class="dashboard-container">
    <GithubCorner class="github-corner"/>

    <el-row class="first-row" :gutter="8">
      <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 12 }">
        <InfiniteList />
      </el-col>
      <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 12 }">
        <ObserverList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import InfiniteList from './components/InfiniteList'
import ObserverList from './components/ObserverList'

export default {
  name: 'Dashboard',
  components: {
    GithubCorner,
    InfiniteList,
    ObserverList
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 32px;
  min-height: 100%;
  background: rgb(240, 242, 245);
  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
  }
  .first-row {
    margin-top: 18px;
  }
}
</style>