export default class ManagedCollection {
  constructor (owner, property, key = 'key') {
    this.owner = owner
    this.property = property
    this.key = key
  }
  clear () {
    this.owner[this.property] = []
  }
  create (value, callback) {
    const element = {
      ...value
    }
    this.owner[this.property] = [ ...this.owner[this.property], element ]
    if (callback) {
      callback(element)
    }
    return this
  }
  remove (selector, callback) {
    const index = this.owner[this.property]
      .findIndex(item => item[this.key] === selector[this.key])
    if (index >= 0) {
      const element = this.owner[this.property][index]
      this.owner[this.property] = [...this.owner[this.property]].splice(index, 1)
      if (callback) {
        callback(element)
      }
    }
    return this
  }
  update (selector, value, callback) {
    const index = this.owner[this.property]
      .findIndex(item => item[this.key] === selector[this.key])
    if (index >= 0) {
      const previous = this.owner[this.property][index]
      const element = {
        ...this.owner[this.property][index],
        ...value
      }
      this.owner[this.property] = [...this.owner[this.property]].splice(index, 1, element)
      if (callback) {
        callback(element, previous)
      }
    }
    return this
  }
  insert (value, index, callback) {
    const element = {
      ...value
    }
    this.owner[this.property] = [...this.owner[this.property]].splice(index, 0, element)
    if (callback) {
      callback(element)
    }
    return this
  }
}
