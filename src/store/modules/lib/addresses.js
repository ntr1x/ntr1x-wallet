import assert from 'assert'
import { ManagedCollection } from 'src/utils'

export const ADDRESSES_CREATE = 'templates/create'
export const ADDRESSES_REMOVE = 'templates/remove'
export const ADDRESSES_UPDATE = 'templates/update'

const addresses = (state) => new ManagedCollection(state, 'addresses', 'address', null)

export default {
  namespaced: true,
  state: {
    addresses: [
      // {
      //   icon: null,
      //   title: [],
      //   address: []
      // }
    ]
  },
  getters: {
    address: state => address => state.addresses.find(a => a.address === address)
  },
  mutations: {
    [ADDRESSES_CREATE]: (state, { address }) => {
      addresses(state).create(address)
    },
    [ADDRESSES_REMOVE]: (state, { selector }) => {
      addresses(state).remove(selector)
    },
    [ADDRESSES_UPDATE]: (state, { selector, address }) => {
      addresses(state).update(selector, address)
    }
  },
  actions: {
    async createAddress ({ commit }, { address }) {
      // TODO: Upload icon here
      assert(address.address != null, 'address.address is a required property')
      commit(ADDRESSES_CREATE, {
        address: {
          icon: null,
          title: null,
          address: null,
          ...address
        }
      })
    },
    async updateAddress ({ commit }, { selector, address }) {
      // TODO: Upload icon here
      assert(selector.address != null, 'selector.address is a required property')
      commit(ADDRESSES_UPDATE, { selector, address })
    },
    async removeAddress ({ commit }, { selector }) {
      // TODO: Drop icon here
      assert(selector.address != null, 'selector.address is a required property')
      commit(ADDRESSES_REMOVE, { selector })
    }
  }
}
