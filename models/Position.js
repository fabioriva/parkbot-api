import util from 'util'

export class Position {
  constructor (id, name, destination = 0, position = 0) {
    this.id = id
    this.name = name
    this.destination = destination
    this.position = position
  }

  update (buffer) {
    this.destination = buffer.readInt16BE(0)
    this.position = buffer.readInt16BE(2)
  }
}

export const generatePositions = names => {
  const positions = []
  for (let i = 0; i < names.length; i++) {
    positions.push(new Position(i + 1, names[i]))
  }
  return positions
}

export const updatePositions = util.promisify(
  (start, buffer, offset, data, callback) => {
    let byte = start
    for (let i = 0; i < data.length; i++) {
      data[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, data)
  }
)
