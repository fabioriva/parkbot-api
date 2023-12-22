const format = require('date-fns/format')
const endOfDay = require('date-fns/endOfDay')
const startOfDay = require('date-fns/startOfDay')
const util = require('util')
const { getPlcDateTime } = require('../lib/utils7')

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

exports.generateCards = def => {
  const cards = []
  for (let i = 0; i < def.CARDS; i++) {
    cards.push(new Card(i + 1))
  }
  return cards
}

exports.updateCards = util.promisify(
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
  constructor (nr, code = '', uid = '', status = 0) {
    this.nr = nr
    this.code = code
    this.status = status
    this.uid = uid
  }

  update (buffer) {
    this.code = buffer.readInt16BE(0).toString(16).toUpperCase()
    this.uid = buffer.readInt32BE(2).toString(16)
  }
}

exports.generateTags = def => {
  const tags = []
  for (let i = 0; i < def.CARDS; i++) {
    tags.push(new Tag(i + 1))
  }
  return tags
}
