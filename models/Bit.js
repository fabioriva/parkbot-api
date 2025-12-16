import util from 'util'

const BYTE_LEN = 8

class Bit {
  constructor (addr, status) {
    this.addr = addr
    this.status = status
  }
}

export function generateBits (type, min, max, str) {
  const bits = []
  for (let byte = min; byte <= max; byte++) {
    for (let bit = 0; bit < BYTE_LEN; bit++) {
      bits.push(new Bit(type + byte.toString() + '.' + bit.toString(), false))
    }
  }
  if (str !== undefined) {
    for (let bit = 0; bit < bits.length; bit++) {
      bits[bit].label = str[bit].label
    }
  }
  return bits
}

export function generateBytes (bits) {
  const bytes = []
  let byte = []
  for (let bit = 0; bit < bits.length; bit++) {
    if (bit !== 0 && bit % BYTE_LEN === 0) {
      bytes.push(byte)
      byte = []
    }
    byte.push(bits[bit])
  }
  bytes.push(byte)
  return bytes
}

export function updateBitsSync (start, buffer, bytes, callback) {
  for (let byte = 0; byte < bytes.length; byte++) {
    let mask = 1
    for (let bit = 0; bit < BYTE_LEN; bit++) {
      bytes[byte][bit].status = buffer[start] & mask ? 1 : 0
      mask *= 2
    }
    start += 1
  }
  callback(null, bytes)
}

export const updateBits = util.promisify(updateBitsSync)
