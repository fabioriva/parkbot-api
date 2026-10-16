import { WriteArea } from './utils7.js'

export default class PlcPpCommands {
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
