import { WriteArea } from './utils7.js'

export default class PlcCardCommands {
  constructor ({ client, def }) {
    this.client = client
    this.def = def
  }

  async updatePin ({ card, code }) {
    const buffer = Buffer.alloc(4)
    buffer.writeUInt16BE(card, 0)
    // Numeric -1 is the protocol sentinel 0xFFFF; other codes are hexadecimal.
    buffer.writeInt16BE(parseInt(code, 16), 2)
    const { area, dbNumber, start, amount, wordLen } = this.def.CARD_EDIT
    return WriteArea(this.client, area, dbNumber, start, amount, wordLen, buffer)
  }
}
