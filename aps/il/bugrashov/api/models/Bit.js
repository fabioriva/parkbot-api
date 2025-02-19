import util from 'util'

const BYTE_LEN = 8

class Bit {
  constructor (addr, status) {
    this.addr = addr
    this.status = status
  }

  get _i18n () {
    return this.i18n
  }

  set _i18n (obj) {
    if (obj) {
      this.i18n = obj
    }
  }
}

function generateBits (type, min, max, str) {
  const bits = []
  for (let byte = min; byte <= max; byte++) {
    for (let bit = 0; bit < BYTE_LEN; bit++) {
      bits.push(new Bit(type + byte.toString() + '.' + bit.toString(), false))
    }
  }
  if (str === undefined) return bits
  bits.forEach((b, i) => {
    b.label = str[i].label
    b._i18n = str[i].i18n
  })
  return bits
}

function generateBytes (bits) {
  const bytes = []
  let byte = []
  bits.forEach((bit, i) => {
    if (i !== 0 && i % BYTE_LEN === 0) {
      bytes.push(byte)
      byte = []
    }
    byte.push(bit)
  })
  bytes.push(byte)
  return bytes
}

const updateBits = util.promisify((start, buffer, bytes, callback) => {
  for (let b = 0; b < bytes.length; b++) {
    let mask = 1
    for (let i = 0; i < bytes[b].length; i++) {
      bytes[b][i].status = buffer[start] & mask ? 1 : 0
      mask *= 2
    }
    start += 1
  }
  callback(null, bytes)
})

export default {
  generateBits,
  generateBytes,
  updateBits
}
