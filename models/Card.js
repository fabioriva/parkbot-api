import { format, endOfDay, startOfDay } from 'date-fns'
import { getPlcDateTime, WriteArea } from '../lib/utils7.js'

const PIN_LEN = 3
// Minimum fields consumed by each decoder; the stride comes from def.CARD_LEN.
const MIN_CARD_DATA_BYTES = 10
const MIN_TAG_DATA_BYTES = 6

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

  update (buffer, start = 0) {
    const pin = buffer.readInt16BE(start).toString(16).toUpperCase()
    this.code = '0'.repeat(PIN_LEN - pin.length) + pin
    this.from = format(getPlcDateTime(0, buffer.readInt32BE(start + 2)), 'HH:mm:ss')
    this.to = format(getPlcDateTime(0, buffer.readInt32BE(start + 6)), 'HH:mm:ss')
  }
}

export const generateCards = def => {
  const cards = []
  for (let i = 0; i < def.CARDS; i++) {
    cards.push(new Card(i + 1))
  }
  return cards
}

export async function updateCards (start, buffer, offset, cards) {
  if (!Number.isInteger(start) || start < 0 || start > buffer.length ||
      !Number.isInteger(offset) || offset < 1) {
    throw new RangeError('Invalid card buffer start or record size')
  }
  const count = (buffer.length - start) / offset
  if (!Number.isInteger(count) || count > cards.length) {
    throw new RangeError('Card buffer must contain complete records within the card list')
  }
  // Validate both formats before modifying any card or tag.
  for (let i = 0; i < count; i++) {
    const minBytes = cards[i] instanceof Tag ? MIN_TAG_DATA_BYTES : MIN_CARD_DATA_BYTES
    if (offset < minBytes) throw new RangeError('Card record is shorter than its decoded fields')
  }
  for (let i = 0, byte = start; i < count; i++, byte += offset) {
    cards[i].update(buffer, byte, offset)
  }
  return cards
}

class Tag {
  constructor (nr, charge = 0, code = '', status = 0, type = 0, uid = '') {
    this.nr = nr
    this.charge = Boolean(charge)
    this.code = code
    this.status = status // 0=not parked or stall number
    this.type = type // 0=standard, 1=EV type 1, 2=EV type 2, etc.
    this.uid = uid // Tag UID
  }

  update (buffer, start = 0, length = buffer.length - start) {
    this.charge = Boolean(buffer.readInt16BE(start))
    this.code = buffer.toString('hex', start + 2, start + 4).substring(1).toUpperCase()
    this.type = buffer.readInt16BE(start + 4)
    this.uid = buffer.toString('hex', start + 6, start + length).toUpperCase()
  }
}

export const generateTags = def => {
  const tags = []
  for (let i = def.MIN_CARD; i <= def.MAX_CARD; i++) {
    tags.push(new Tag(i))
  }
  return tags
}

export class CardRequestError extends Error {}

export class CardOperations {
  constructor ({ def, obj, plc, history }) {
    this.def = def
    this.obj = obj
    this.plc = plc
    this.history = history
  }

  async updatePin ({ card, code, user }) {
    // Preserve the existing range check and implicit input conversions.
    const { MIN_CARD: minCard = 1, MAX_CARD: maxCard = this.def.CARDS } = this.def
    if (card < minCard || card > maxCard) {
      throw new CardRequestError('Card not valid')
    }
    if (!/^[a-fA-F0-9]{3}$/.test(code) && code !== -1) {
      throw new CardRequestError('PIN code regexp is not valid')
    }

    const written = await this.plc.updatePin({ card, code })
    await this.history.saveAction({
      card,
      date: this.obj.plcDTL,
      operation: 4, // 'op-change-pin'
      stall: 0,
      user
    })
    return { card, written }
  }
}

export class PlcCardCommands {
  constructor ({ client, def }) {
    this.client = client
    this.def = def
  }

  async updatePin ({ card, code }) {
    const buffer = Buffer.alloc(4)
    buffer.writeUInt16BE(card, 0)
    // Numeric -1 is the protocol sentinel 0xFFFF; other codes are hexadecimal.
    buffer.writeInt16BE(parseInt(code, 16), 2)
    const { area, dbNumber, start, amount, wordLen } = this.def.CARD_EDIT
    return WriteArea(this.client, area, dbNumber, start, amount, wordLen, buffer)
  }
}
