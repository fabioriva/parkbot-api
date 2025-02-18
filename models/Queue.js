import util from 'util'

class Queue {
  constructor (id, card = 0, stall = 0) {
    this.id = id
    this.card = card
    this.stall = stall
  }

  update (buffer) {
    this.card = buffer.readInt16BE(0)
    this.stall = buffer.readInt16BE(2)
  }
}

export const generateQueue = def => {
  const queue = []
  for (let i = 0; i < def.QUEUE_LEN; i++) {
    queue.push(new Queue(i + 1))
  }
  return queue
}

export const updateQueue = util.promisify(
  (start, buffer, offset, data, callback) => {
    let byte = start
    for (let i = 0; i < data.length; i++) {
      data[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, data)
  }
)
