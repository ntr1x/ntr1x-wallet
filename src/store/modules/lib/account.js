export default {
  namespaced: true,
  state: {
    hdNode: null,
    template: null
  },
  mutations: {
    hdNode (state, hdNode) {
      state.hdNode = () => hdNode
    }
  },
  actions: {
    async signin ({ state, commit }, hdNode) {
      commit('hdNode', hdNode)
    }
  }
}
