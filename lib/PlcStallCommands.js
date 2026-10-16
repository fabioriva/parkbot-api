import { WriteArea } from './utils7.js'

export default class PlcStallCommands {
  constructor ({ client, def }) {
    this.client = client
    this.def = def
  }

  async updateStall ({ stall, card }) {
    const buffer = Buffer.alloc(4)
    buffer.writeInt16BE(stall, 0)
    buffer.writeInt16BE(card, 2)
    const { area, dbNumber, start, amount, wordLen } = this.def.MAP_EDIT
    return WriteArea(this.client, area, dbNumber, start, amount, wordLen, buffer)
  }
}
