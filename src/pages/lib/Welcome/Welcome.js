import bip39 from 'bip39'
import crypto from 'crypto'

export default {
  data: () => ({
    mnemonic: null
  }),
  methods: {
    generateMnemonic () {
      const randomBytes = crypto.randomBytes(16)
      this.mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
      this.$nextTick(() => {
        this.$refs.mnemonic.$el.select()
      })
    }
  }
}
