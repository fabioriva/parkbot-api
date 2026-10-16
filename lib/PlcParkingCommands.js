import { WriteArea } from './utils7.js'

// Shared by the standard PLC connection and installation-specific drivers.
export default class PlcParkingCommands {
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
