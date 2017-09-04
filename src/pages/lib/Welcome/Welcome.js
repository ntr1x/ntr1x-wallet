import bip39 from 'bip39'
import crypto from 'crypto'
import { HDNode, networks } from 'bitcoinjs-lib'
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    mnemonic: null,
    network: () => networks.testnet
  }),
  validations: {
    mnemonic: {
      required,
      async valid (value) {
        return bip39.validateMnemonic(value)
      }
    }
  },
  methods: {
    async submit () {
      const seed = bip39.mnemonicToSeed(this.mnemonic)
      const hdNode = HDNode.fromSeedBuffer(seed, networks.testnet)
      await this.signin(hdNode)
      this.$router.push('/private')
    },
    ...mapActions({
      signin: 'account/signin'
    }),
    generateMnemonic () {
      const randomBytes = crypto.randomBytes(16)
      this.mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
      this.$nextTick(() => {
        this.$refs.mnemonic.$el.select()
      })
    }
  }
}
