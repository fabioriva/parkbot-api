import { WriteArea } from '../lib/utils7.js'

// Minimum bytes read by Queue.update; the record stride is supplied by the caller.
const MIN_QUEUE_DATA_BYTES = 4

class Queue {
  constructor (id, card = 0, stall = 0) {
    this.id = id
    this.card = card
    this.stall = stall
  }

  update (buffer, start = 0) {
    this.card = buffer.readInt16BE(start)
    this.stall = buffer.readInt16BE(start + 2)
  }
}

export const generateQueue = def => {
  const queue = []
  for (let i = 0; i < def.QUEUE_LEN; i++) {
    queue.push(new Queue(i + 1))
  }
  return queue
}

export async function updateQueue (start, buffer, offset, data) {
  if (!Number.isInteger(start) || start < 0 || start > buffer.length ||
      !Number.isInteger(offset) || offset < MIN_QUEUE_DATA_BYTES) {
    throw new RangeError('Invalid queue buffer start or record size')
  }
  // The queue is embedded in the main PLC buffer, followed by other fields.
  if (start + data.length * offset > buffer.length) {
    throw new RangeError('Queue buffer does not contain all configured records')
  }
  for (let i = 0, byte = start; i < data.length; i++, byte += offset) {
    data[i].update(buffer, byte)
  }
  return data
}

export class QueueRequestError extends Error {}

export class QueueOperations {
  constructor ({ obj, plc, history }) {
    this.obj = obj
    this.plc = plc
    this.history = history
  }

  async deleteRequest ({ index, card, user }) {
    if (!Number.isInteger(index) || !Number.isInteger(card) || card <= 0 || card > 0xFFFF) {
      throw new QueueRequestError('Parameters not valid')
    }
    const queue = this.obj.queue
    // Match the PLC's strict bounds; IDs are one-based and must not be reindexed.
    if (index <= 1 || index >= queue.length) {
      throw new QueueRequestError('Queue index not valid')
    }
    const item = queue.find(item => item.id === index)
    if (!item || item.card !== card) {
      throw new QueueRequestError('Queue changed, refresh and try again')
    }

    // No await between checking the current snapshot and submitting the write.
    // The PLC may still change its queue before processing this command.
    const written = await this.plc.deleteRequest({ index, card })
    await this.history.saveAction({
      card,
      date: this.obj.plcDTL,
      operation: 13, // 'op-req-queue'
      stall: 0,
      user
    })
    return { card, written }
  }
}

export class PlcQueueCommands {
  constructor ({ client, def }) {
    this.client = client
    this.def = def
  }

  async deleteRequest ({ index, card }) {
    const { area, dbNumber, start, amount, wordLen } = this.def.QUEUE_DELETE
    const buffer = Buffer.alloc(amount)
    buffer.writeUInt16BE(index, 0)
    buffer.writeUInt16BE(card, 2)
    return WriteArea(this.client, area, dbNumber, start, amount, wordLen, buffer)
  }
}
