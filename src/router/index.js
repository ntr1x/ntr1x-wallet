import Vue from 'vue'
import VueRouter from 'vue-router'

import { Welcome, Transfer } from 'src/pages'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer,
      meta: { requiresAuth: true }
    }
  ]
})
