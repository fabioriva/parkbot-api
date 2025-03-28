import util from 'util'

export class Bay {
  constructor (id, name, barrier = 0, card = 0, gate = 0, gate2 = 0, sensors = 0, status = 0) {
    this.id = id
    this.name = name
    this.barrier = barrier
    this.card = card
    this.gate = gate
    this.gate2 = gate2
    this.sensors = sensors
    this.status = status
  }

  update (buffer) {
    this.barrier = buffer.readInt16BE(0)
    this.card = buffer.readInt16BE(2)
    this.gate = buffer.readInt16BE(4)
    this.gate2 = buffer.readInt16BE(6)
    const LP = buffer.readUInt16BE(8)
    this.front = Boolean(LP & 1 ? 1 : 0)
    this.rear = Boolean(LP & 2 ? 1 : 0)
    this.left = Boolean(LP & 8 ? 1 : 0)
    this.right = Boolean(LP & 16 ? 1 : 0)
    this.stop = Boolean(LP & 4 ? 1 : 0)
    // this.sensors = buffer.slice(10).toString('hex')
    this.sensors = (buffer.readUInt16BE(10) >>> 0).toString(2)
    this.status = buffer.readUInt16BE(12)
  }
}

export const updateBays = util.promisify((start, buffer, offset, bays, callback) => {
  let byte = start
  for (let i = 0; i < bays.length; i++) {
    bays[i].update(buffer.slice(byte, byte + offset))
    byte += offset
  }
  callback(null, bays)
})
