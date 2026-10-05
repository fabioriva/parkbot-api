import * as snap7 from 'snap7-node-addon-api'

const { S7Client } = snap7

export default class Snap7Driver {
  constructor () {
    this.client = new S7Client()
    this.connected = false
    this.errorCode = 0
  }

  async ConnectTo (address, rack = 0, slot = 2) {
    try {
      await this.client.connectTo(address, rack, slot)
      this.connected = Boolean(this.client.connected)
      return this.connected
    } catch (error) {
      this.errorCode = Number(error?.code ?? 0)
      this.connected = false
      throw error
    }
  }

  async Connect () {
    try {
      if (typeof this.client.connect === 'function') {
        await this.client.connect()
      }
      this.connected = Boolean(this.client.connected)
      return this.connected
    } catch (error) {
      this.errorCode = Number(error?.code ?? 0)
      this.connected = false
      throw error
    }
  }

  async Disconnect () {
    try {
      if (typeof this.client.disconnect === 'function') {
        await this.client.disconnect()
      }
      this.connected = false
      return true
    } catch (error) {
      this.connected = false
      return false
    }
  }

  ErrorText (code) {
    if (typeof this.client.errorText === 'function') {
      return this.client.errorText(code)
    }
    return String(code)
  }

  async ReadArea (area, dbNumber, start, amount, wordLen) {
    try {
      return await this.client.readArea(area, dbNumber, start, amount, wordLen)
    } catch (error) {
      this.errorCode = Number(error?.code ?? 0)
      throw error
    }
  }

  async WriteArea (area, dbNumber, start, amount, wordLen, buffer) {
    try {
      const data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer)
      await this.client.writeArea(area, dbNumber, start, wordLen, data)
      return true
    } catch (error) {
      this.errorCode = Number(error?.code ?? 0)
      throw error
    }
  }
}
