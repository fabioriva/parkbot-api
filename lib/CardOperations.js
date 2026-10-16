export class CardRequestError extends Error {}

export default class CardOperations {
  constructor ({ def, obj, plc, history }) {
    this.def = def
    this.obj = obj
    this.plc = plc
    this.history = history
  }

  async updatePin ({ card, code, user }) {
    // Preserve the existing range check and implicit input conversions.
    const { MIN_CARD: minCard = 1, MAX_CARD: maxCard = this.def.CARDS } = this.def
    if (card < minCard || card > maxCard) {
      throw new CardRequestError('Card not valid')
    }
    if (!/^[a-fA-F0-9]{3}$/.test(code) && code !== -1) {
      throw new CardRequestError('PIN code regexp is not valid')
    }

    const written = await this.plc.updatePin({ card, code })
    await this.history.saveAction({
      card,
      date: this.obj.plcDTL,
      operation: 4, // 'op-change-pin'
      stall: 0,
      user
    })
    return { card, written }
  }
}
