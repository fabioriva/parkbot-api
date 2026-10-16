import { WriteArea } from './utils7.js'

export default class PlcQueueCommands {
  constructor ({ client, def }) {
    this.client = client
    this.def = def
  }

  async deleteRequest ({ index, card }) {
    const { area, dbNumber, start, amount, wordLen } = this.def.QUEUE_DELETE
    const buffer = Buffer.alloc(amount)
    buffer.writeUInt16BE(index, 0)
    buffer.writeUInt16BE(card, 2)
    return WriteArea(this.client, area, dbNumber, start, amount, wordLen, buffer)
  }
}
