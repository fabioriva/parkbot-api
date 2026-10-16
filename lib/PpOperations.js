export class PpRequestError extends Error {}

function integer (value) {
  if (typeof value === 'string' && /^\d+$/.test(value.trim())) value = Number(value)
  return Number.isSafeInteger(value) ? value : NaN
}

export default class PpOperations {
  constructor ({ obj, plc, history }) {
    this.obj = obj
    this.plc = plc
    this.history = history
  }

  async requestPp (request) {
    const device = integer(request.device)
    const value = integer(request.value)
    const key = typeof request.key === 'string' ? request.key.trim().toUpperCase() : ''
    if (device < 0 || device > 255 || !Number.isInteger(device) ||
        value < 0 || value > 65535 || !Number.isInteger(value) || !/^[ABDEF]$/.test(key)) {
      throw new PpRequestError('Parameters not valid')
    }

    const actions = (this.obj.devices ?? []).flatMap(item => item.d ?? []).filter(action =>
      (action.key === 'action-pp' || action.key === 'action-pp-reset') && integer(action.device) === device
    )
    const candidates = actions.filter(action => action.buttons?.some(button => {
      if (button.key !== key) return false
      if (key === 'A' || key === 'B') return integer(button.value) === value
      const min = integer(action.min)
      const max = integer(action.max)
      return value >= min && value <= max
    }))
    if (!candidates.length) throw new PpRequestError('PP command not configured')
    if (!candidates.some(action => action.enable?.status === true || action.enable?.status === 1)) {
      throw new PpRequestError('PP command not enabled')
    }

    const written = await this.plc.requestPp({ device, key, value })
    await this.history.saveAction({
      card: 0,
      date: this.obj.plcDTL,
      operation: 12, // 'op-req-pp'
      stall: 0,
      user: request.user
    })
    return { value, key, written }
  }
}
