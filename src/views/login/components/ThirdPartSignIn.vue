<template>
  <div class="sign-container">
    <div class="sign-btn">
      <span class="wx-svg-container">
        <svg-icon icon-class="wechat" class="icon"/>
      </span>
      Wechat
    </div>
    <div class="sign-btn">
      <span class="qq-svg-container">
        <svg-icon icon-class="qq" class="icon"/>
      </span>
      QQ
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThirdPartSignIn',
  // TODO: o-auth login
}
</script>

<style lang="scss" scoped>
.sign-container {
  margin-top: 50px;
  .sign-btn {
    display: inline-block;
    cursor: pointer;
    .wx-svg-container,
    .qq-svg-container {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 4px;
      .icon {
        margin-top: 8px;
        font-size: 24px;
        color: #fff;
      }
    }
    .wx-svg-container {
      background-color: #24da70;
    }
    .qq-svg-container {
      background-color: #6BA2D6;
      margin-left: 50px;
    }
  }
}
</style>