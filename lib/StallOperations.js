export class StallRequestError extends Error {}

export default class StallOperations {
  constructor ({ def, obj, plc, history }) {
    this.def = def
    this.obj = obj
    this.plc = plc
    this.history = history
  }

  async updateStall (request) {
    // Preserve the existing conversion and validation order.
    const card = parseInt(request.card)
    const stall = parseInt(request.stall)
    if (!Number.isInteger(card) || !Number.isInteger(stall)) {
      throw new StallRequestError('Parameters not valid')
    }
    if (stall < 1 || stall > this.def.STALLS) {
      throw new StallRequestError('Stall not valid')
    }

    const { FREE, LOCK } = this.def.STALL_STATUS
    const isFree = card === FREE
    const isLocked = card === LOCK
    if (!isFree && !isLocked) {
      const { MIN_CARD: minCard = 1, MAX_CARD: maxCard = this.def.CARDS } = this.def
      if (card < minCard || card > maxCard) {
        throw new StallRequestError('Card not valid')
      }
      if (this.obj.stalls.some(item => item.status === card)) {
        throw new StallRequestError('Card in use')
      }
    }

    const written = await this.plc.updateStall({ stall, card })
    await this.history.saveAction({
      card,
      date: this.obj.plcDTL,
      // Preserve the historic operation mapping, including for FREE and LOCK.
      operation: card !== 0 ? 5 : 6, // 'op-stall-in' / 'op-stall-out'
      stall,
      user: request.user
    })
    return { stall, written }
  }
}
