import assert from 'assert'
import uniqid from 'uniqid'
import { ManagedCollection } from 'src/utils'

export const TEMPLATES_CREATE = 'templates/create'
export const TEMPLATES_REMOVE = 'templates/remove'
export const TEMPLATES_UPDATE = 'templates/update'

export const INPUTS_CREATE = 'inputs/create'
export const INPUTS_REMOVE = 'inputs/remove'
export const INPUTS_UPDATE = 'inputs/update'

export const OUTPUTS_CREATE = 'outputs/create'
export const OUTPUTS_REMOVE = 'outputs/remove'
export const OUTPUTS_UPDATE = 'outputs/update'

const templates = (state) => new ManagedCollection(state, 'templates')
const inputs = (template) => new ManagedCollection(template, 'inputs', 'address')
const outputs = (template) => new ManagedCollection(template, 'outputs', 'address')

export default {
  namespaced: true,
  state: {
    templates: [
      // {
      //   title: null,
      //   inputs: [],
      //   outputs: []
      // }
    ]
  },
  mutations: {
    [TEMPLATES_CREATE]: (state, { template }) => {
      templates(state).create({
        key: template.key,
        title: template.title,
        inputs: [],
        outputs: []
      })
    },
    [TEMPLATES_REMOVE]: (state, { selector }) => {
      templates(state).remove(selector)
    },
    [TEMPLATES_UPDATE]: (state, { selector, template }) => {
      templates(state).update(selector, template)
    },

    [INPUTS_CREATE]: (state, { template, input }) => {
      inputs(template).create(input)
    },
    [INPUTS_REMOVE]: (state, { template, selector }) => {
      inputs(template).remove(selector)
    },
    [INPUTS_UPDATE]: (state, { template, selector, input }) => {
      inputs(template).update(selector, input)
    },

    [OUTPUTS_CREATE]: (state, { template, output }) => {
      outputs(template).create(output)
    },
    [OUTPUTS_REMOVE]: (state, { template, selector }) => {
      outputs(template).remove(selector)
    },
    [OUTPUTS_UPDATE]: (state, { template, selector, output }) => {
      outputs(template).update(selector, output)
    }
  },
  getters: {
    template: state => key => state.addresses.find(t => t.key === key)
  },
  actions: {

    async createTemplate ({ commit, getters }, { template }) {
      const id = uniqid()
      commit(TEMPLATES_CREATE, {
        address: {
          id,
          ...template,
          inputs: [],
          outputs: []
        }
      })
      template = getters.template(id)
      for (const input of template.inputs) {
        commit(INPUTS_CREATE, { template, input })
      }
      for (const output of template.outputs) {
        commit(OUTPUTS_CREATE, { template, output })
      }
    },

    async createInput ({ commit }, { template, input }) {
      assert(input.address != null, 'input.address is a required property')
      commit(INPUTS_CREATE, { template, input })
    },
    async removeInput ({ commit }, { template, selector }) {
      assert(selector.address != null, 'input.address is a required property')
      commit(INPUTS_REMOVE, { template, selector })
    },
    async updateInput ({ commit }, { template, selector, input }) {
      assert(selector.address != null, 'input.address is a required property')
      commit(INPUTS_UPDATE, { template, selector, input })
    },

    async createOutput ({ commit }, { template, output }) {
      assert(output.address != null, 'output.address is a required property')
      commit(OUTPUTS_CREATE, { template, output })
    },
    async removeOutput ({ commit }, { template, selector }) {
      assert(selector.address != null, 'selector.address is a required property')
      commit(OUTPUTS_CREATE, { template, selector })
    },
    async updateOutput ({ commit }, { template, selector, output }) {
      assert(selector.address != null, 'selector.address is a required property')
      commit(OUTPUTS_CREATE, { template, selector, output })
    }
  }
}
