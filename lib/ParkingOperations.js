export class ParkingRequestError extends Error {}

// Parking rules and audit, independent of HTTP and PLC encoding.
export default class ParkingOperations {
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
    await this.saveRequest(card, request.user, 12) // 'op-req-rollback'
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
