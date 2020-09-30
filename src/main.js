import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import enLang from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'medium', // TODO: import cookie
  locale: enLang
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
