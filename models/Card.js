import { format, endOfDay, startOfDay } from 'date-fns'
// const endOfDay = require('date-fns/endOfDay')
// const startOfDay = require('date-fns/startOfDay')
import util from 'util'
import { getPlcDateTime } from '../lib/utils7.js'

class Card {
  #rand
  constructor (
    nr,
    code = '',
    from = format(startOfDay(new Date()), 'HH:mm:ss'),
    to = format(endOfDay(new Date()), 'HH:mm:ss'),
    status = 0 // 0=not used, stall=in use ...
  ) {
    this.nr = nr
    this.code = code
    this.from = from
    this.to = to
    this.#rand = this.getRandomIntInclusive(256, 4095)
      .toString(16)
      .toUpperCase()
    this.status = status
  }

  getRandomIntInclusive (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  update (buffer) {
    this.code = buffer
      .readInt16BE(0)
      .toString(16)
      .toUpperCase()
    this.from = format(getPlcDateTime(0, buffer.readInt32BE(2)), 'HH:mm:ss')
    this.to = format(getPlcDateTime(0, buffer.readInt32BE(6)), 'HH:mm:ss')
    // this.status = buffer.length === 12 && buffer.readInt16BE(10)
  }
}

export const generateCards = def => {
  const cards = []
  for (let i = 0; i < def.CARDS; i++) {
    cards.push(new Card(i + 1))
  }
  return cards
}

export const updateCards = util.promisify(
  (start, buffer, offset, cards, callback) => {
    let byte = start
    const min = 0
    const max = buffer.length / offset
    for (let i = min; i < max; i++) {
      cards[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, cards)
  }
)

class Tag {
  constructor (nr, charge = 0, code = '', status = 0, type = 0, uid = '') {
    this.nr = nr
    this.charge = Boolean(charge)
    this.code = code
    this.status = status // 0=not parked or stall number
    this.type = type // 0=standard, 1=EV type 1, 2=EV type 2, etc.
    this.uid = uid // Tag UID
  }

  update (buffer) {
    this.charge = Boolean(buffer.readInt16BE(0))
    // this.code = buffer.readInt16BE(0).toString(16).toUpperCase()
    this.code = buffer.slice(2, 4).toString('hex').substring(1).toUpperCase()
    this.type = buffer.readInt16BE(4)
    this.uid = buffer.slice(6).toString('hex').toUpperCase()
  }
}

export const generateTags = def => {
  const tags = []
  for (let i = def.MIN_CARD; i <= def.MAX_CARD; i++) {
    tags.push(new Tag(i))
  }
  return tags
}
