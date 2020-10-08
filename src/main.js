import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import Cookies from 'js-cookie'

import Element from 'element-ui'
import enLang from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import './icons'
import './permission'

Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  locale: enLang
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
