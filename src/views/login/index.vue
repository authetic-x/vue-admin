<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          name="username"
          placeholder="Username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item>
        <el-input 
          ref="password"
          v-model="loginForm.password"
          name="password"
          placeholder="Password"
          :type="passwordType"
          :key="passwordType"
          autocomplete="on"
          tabindex="2"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" 
        style="width: 100%;margin-bottom: 30px;" @click.native.prevent="handleLogin"
      >Login</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(route.query)
        }
      },
      immediate: true
    }
  },
  methods: {
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(error => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  overflow: hidden;
  min-height: 100%;
  width: 100%;
  background: $bg;

  .login-form {
    overflow: hidden;
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    padding: 160px 35px 0;
  }

  .title-container {
    .title {
      margin: 0 auto 40px;
      font-size: 26px;
      font-weight: bold;
      text-align: center;
      color: $light_gray;
    }
  }
}
</style>