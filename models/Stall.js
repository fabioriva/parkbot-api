import { getPlcDateTime, WriteArea } from '../lib/utils7.js'

// Minimum bytes read by Stall.update (status, date and size).
// The record stride is supplied by the installation's def.STALL_LEN.
const MIN_STALL_DATA_BYTES = 10

class Stall {
  constructor (
    nr,
    status = 0,
    date = '1990-01-01T00:00:00.000Z',
    size = 0
  ) {
    this.nr = nr
    this.status = status
    this.date = date
    this.size = size
  }

  update (buffer, start = 0) {
    this.status = buffer.readInt16BE(start)
    this.date = new Date(
      getPlcDateTime(buffer.readUInt16BE(start + 2), buffer.readUInt32BE(start + 4))
    ).toISOString()
    this.size = buffer.readInt16BE(start + 8)
  }
}

export const generateStalls = def => {
  const stalls = []
  for (let i = 0; i < def.STALLS; i++) {
    stalls.push(new Stall(i + 1))
  }
  return stalls
}

export async function updateStalls (start, buffer, offset, cards, stalls) {
  if (!Number.isInteger(start) || start < 0 || start > buffer.length ||
      !Number.isInteger(offset) || offset < MIN_STALL_DATA_BYTES) {
    throw new RangeError('Invalid stall buffer start or record size')
  }
  const count = (buffer.length - start) / offset
  if (!Number.isInteger(count) || count > stalls.length) {
    throw new RangeError('Stall buffer must contain complete records within the stall list')
  }
  if (count === 0) return stalls

  const cardsByNumber = new Map()
  for (const card of cards) {
    // Preserve Array.find semantics if a number appears more than once.
    if (!cardsByNumber.has(card.nr)) cardsByNumber.set(card.nr, card)
  }
  for (let i = 0, byte = start; i < count; i++, byte += offset) {
    const stall = stalls[i]
    stall.update(buffer, byte)
    const card = cardsByNumber.get(stall.status)
    if (card !== undefined) {
      card.status = stall.nr
    }
  }
  return stalls
}

export const occupancy = (size, stalls, stallStatus) => {
  let busy = 0
  let free = 0
  let locked = 0
  const lockStatus = stallStatus.LOCK
  for (const stall of stalls) {
    if (size !== 0 && stall.size !== size) continue
    if (stall.status === 0) free++
    else if (stall.status === lockStatus) locked++
    else busy++
  }
  return [
    { id: 'busy', value: busy },
    { id: 'free', value: free },
    { id: 'lock', value: locked }
  ]
}

export class StallRequestError extends Error {}

export class StallOperations {
  constructor ({ def, obj, plc, history }) {
    this.def = def
    this.obj = obj
    this.plc = plc
    this.history = history
  }

  async updateStall (request) {
    // Preserve the existing conversion and validation order.
    const card = parseInt(request.card)
    const stall = parseInt(request.stall)
    if (!Number.isInteger(card) || !Number.isInteger(stall)) {
      throw new StallRequestError('Parameters not valid')
    }
    if (stall < 1 || stall > this.def.STALLS) {
      throw new StallRequestError('Stall not valid')
    }

    const { FREE, LOCK } = this.def.STALL_STATUS
    const isFree = card === FREE
    const isLocked = card === LOCK
    if (!isFree && !isLocked) {
      const { MIN_CARD: minCard = 1, MAX_CARD: maxCard = this.def.CARDS } = this.def
      if (card < minCard || card > maxCard) {
        throw new StallRequestError('Card not valid')
      }
      if (this.obj.stalls.some(item => item.status === card)) {
        throw new StallRequestError('Card in use')
      }
    }

    const written = await this.plc.updateStall({ stall, card })
    await this.history.saveAction({
      card,
      date: this.obj.plcDTL,
      // Preserve the historic operation mapping, including for FREE and LOCK.
      operation: card !== 0 ? 5 : 6, // 'op-stall-in' / 'op-stall-out'
      stall,
      user: request.user
    })
    return { stall, written }
  }
}

export class PlcStallCommands {
  constructor ({ client, def }) {
    this.client = client
    this.def = def
  }

  async updateStall ({ stall, card }) {
    const buffer = Buffer.alloc(4)
    buffer.writeInt16BE(stall, 0)
    buffer.writeInt16BE(card, 2)
    const { area, dbNumber, start, amount, wordLen } = this.def.MAP_EDIT
    return WriteArea(this.client, area, dbNumber, start, amount, wordLen, buffer)
  }
}
