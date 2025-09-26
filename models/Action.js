export class Action {
  constructor (id, enable, writeArea, minTag = 0, maxTag = 0) {
    this.key = id
    this.enable = enable
    this.writeArea = writeArea
    this.min = minTag
    this.max = maxTag
  }
}

export class ActionPP {
  constructor (id, enable, device = 0, min = 0, max = 0, buttons = []) {
    this.key = id
    this.enable = enable // disable if PP B, D, E, F is ON
    this.device = device // device nr
    this.min = min // destination min
    this.max = max // destination max
    this.buttons = buttons.map((b, i) => new ButtonPP(i, b.key, b.value, b.tooltip))
  }
}

class ButtonPP {
  constructor (id, key, value, tooltip) {
    this.id = id
    this.key = key
    this.tooltip = tooltip
    this.value = value
  }
}
