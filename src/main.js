import Vue from 'vue'
import VueMaterial from 'vue-material'
import Vuelidate from 'vuelidate'
import App from './App.vue'

import router from './router'
import store from './store'

import 'vue-material/dist/vue-material.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'src/styles/default.scss'

Vue.use(VueMaterial)
Vue.use(Vuelidate)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.account.hdNode) {
      return next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  }
  return next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
