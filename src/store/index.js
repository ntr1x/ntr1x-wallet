import Vue from 'vue'
import Vuex from 'vuex'
// import IPFS from 'ipfs'

import createPersistedState from 'vuex-persistedstate'

import * as modules from './modules'

Vue.use(Vuex)

// const node = new IPFS({
//   repo: String(Math.random() + Date.now())
// })

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      paths: [

      ],
      storage: window.localStorage
      // storage: {
      //   getItem: (key) => Cookies.getJSON(key),
      //   setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      //   removeItem: (key) => Cookies.remove(key)
      // }
    })
  ]
})
