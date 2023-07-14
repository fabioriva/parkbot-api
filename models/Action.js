class Action {
  // #writeArea
  constructor (id, enable, writeArea, minTag, maxTag) {
    this.key = id
    this.enable = enable
    this.writeArea = writeArea
    this.min = minTag
    this.max = maxTag
  }

  // getWriteArea () {
  //   return this.#writeArea
  // }

  // static _getWriteArea (obj) {
  //   return obj.#writeArea
  // }
}

module.exports = { Action }
