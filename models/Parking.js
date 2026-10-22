import { WriteArea } from '../lib/utils7.js'
import { OPERATION } from '../lib/operationDefinitions.js'

export class ExitActionDefinition {
  constructor (id, enable, minTag = 0, maxTag = 0) {
    this.key = id
    this.enable = enable
    this.min = minTag
    this.max = maxTag
  }
}

export class EntryActionDefinition {
  constructor (id, enable, entry = 0, min = 0, max = 0) {
    this.key = id
    this.enable = enable // enable button
    this.entry = entry // entry nr
    this.min = min // card min
    this.max = max // card max
  }
}

export class RollbackActionDefinition {
  constructor (id, enable, entry = 0, min = 0, max = 0) {
    this.key = id
    this.enable = enable // enable button
    this.entry = entry // entry nr
    this.min = min // card min
    this.max = max // card max
  }
}

export class PpActionDefinition {
  constructor (id, enable, device = 0, min = 0, max = 0, buttons = []) {
    this.key = id
    this.enable = enable // disable if PP B, D, E, F is ON
    this.device = device // device nr
    this.min = min // destination min
    this.max = max // destination max
    this.buttons = buttons.map((b, i) => new PpButtonDefinition(i, b.key, b.value, b.tooltip))
  }
}

class PpButtonDefinition {
  constructor (id, key, value, tooltip) {
    this.id = id
    this.key = key
    this.tooltip = tooltip
    this.value = value
  }
}

export class ParkingRequestError extends Error {}

// Parking rules and audit, independent of HTTP and PLC encoding.
export class ParkingOperations {
  constructor ({ def, obj, plc, history }) {
    this.def = def
    this.obj = obj
    this.plc = plc
    this.history = history
  }

  async requestExit ({ card: value, user }) {
    // Retain the existing input conversion during this structural refactor.
    const card = parseInt(value)
    if (!Number.isInteger(card)) throw new ParkingRequestError('Parameters not valid')

    this.validateCardRange(card)
    if (!this.obj.stalls.some(stall => stall.status === card)) {
      throw new ParkingRequestError('Card not found')
    }

    const written = await this.plc.requestExit(card)
    await this.saveRequest(card, user, 10) // 'op-req-exit'
    return { card, written }
  }

  async requestEntry (request) {
    const { card, entry } = this.validateEntryAndCard(request)
    const written = await this.plc.requestEntry({ card, entry })
    await this.saveRequest(card, request.user, 11) // 'op-req-entry'
    return { card, written }
  }

  async requestRollback (request) {
    const { card, entry } = this.validateEntryAndCard(request)
    const written = await this.plc.requestRollback({ card, entry })
    await this.saveRequest(card, request.user, OPERATION.ROLLBACK.id)
    return { card, written }
  }

  validateCardRange (card) {
    const { MIN_CARD: minCard = 1, MAX_CARD: maxCard = this.def.CARDS } = this.def
    if (card < minCard || card > maxCard) throw new ParkingRequestError('Card not valid')
  }

  validateEntryAndCard (request) {
    const card = parseInt(request.card)
    const entry = parseInt(request.entry)
    if (!Number.isInteger(card) || !Number.isInteger(entry)) {
      throw new ParkingRequestError('Parameters not valid')
    }
    this.validateCardRange(card)
    if (this.obj.stalls.some(stall => stall.status === card)) {
      throw new ParkingRequestError('Card in use')
    }
    if (entry < 1 || entry > this.def.MAX_ENTRY) {
      throw new ParkingRequestError('Entry not valid')
    }
    return { card, entry }
  }

  async saveRequest (card, user, operation) {
    await this.history.saveAction({
      card,
      date: this.obj.plcDTL,
      operation,
      stall: 0,
      user
    })
  }
}

// Shared by the standard PLC connection and installation-specific drivers.
export class PlcParkingCommands {
  constructor ({ client, def }) {
    this.client = client
    this.def = def
  }

  // Confirms the protocol write, not acceptance or completion of the exit.
  async requestExit (card) {
    const { area, dbNumber, start, amount, wordLen } = this.def.REQ_0
    const buffer = Buffer.alloc(amount)
    buffer.writeUInt16BE(card, 0)
    return WriteArea(this.client, area, dbNumber, start, amount, wordLen, buffer)
  }

  async requestEntry ({ card, entry }) {
    return this.writeEntryAndCard(this.def.REQ_ENTRY, entry, card)
  }

  async requestRollback ({ card, entry }) {
    return this.writeEntryAndCard(this.def.REQ_ROLLBACK, entry, card)
  }

  async writeEntryAndCard (address, entry, card) {
    const { area, dbNumber, start, amount, wordLen } = address
    const buffer = Buffer.alloc(amount)
    buffer.writeUInt16BE(entry, 0)
    buffer.writeUInt16BE(card, 2)
    return WriteArea(this.client, area, dbNumber, start, amount, wordLen, buffer)
  }
}

export class PpRequestError extends Error {}

function integer (value) {
  if (typeof value === 'string' && /^\d+$/.test(value.trim())) value = Number(value)
  return Number.isSafeInteger(value) ? value : NaN
}

export class PpOperations {
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
      operation: OPERATION.PP.id,
      stall: 0,
      user: request.user
    })
    return { value, key, written }
  }
}

export class PlcPpCommands {
  constructor ({ client, def }) {
    this.client = client
    this.def = def
  }

  async requestPp ({ device, key, value }) {
    const buffer = Buffer.alloc(4)
    buffer.writeUInt16BE(value, 0)
    buffer.writeUInt8(parseInt(key, 16), 2)
    buffer.writeUInt8(device, 3)
    const { area, dbNumber, start, amount, wordLen } = this.def.REQ_PP
    return WriteArea(this.client, area, dbNumber, start, amount, wordLen, buffer)
  }
}
