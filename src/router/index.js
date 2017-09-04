import Vue from 'vue'
import VueRouter from 'vue-router'

import { Welcome, Private, Transfer } from 'src/pages'

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
      path: '/private',
      component: Private,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: 'transfer'
        },
        {
          path: 'transfer',
          name: 'Transfer',
          component: Transfer
        }
      ]
    }
  ]
})
