class Action {
  // #writeArea
  constructor (id, enable, writeArea, minTag = 0, maxTag = 0) {
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

export { Action }
