export class Action {
  constructor (id, enable, writeArea, minTag = 0, maxTag = 0) {
    this.key = id
    this.enable = enable
    this.writeArea = writeArea
    this.min = minTag
    this.max = maxTag
  }
}
