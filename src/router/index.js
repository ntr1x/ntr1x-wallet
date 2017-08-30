import Vue from 'vue'
import Router from 'vue-router'

import { Welcome, Transfer } from 'src/pages'

Vue.use(Router)

export default new Router({
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
      component: Transfer
    }
  ]
})
