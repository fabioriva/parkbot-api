import assert from 'node:assert/strict'
import test from 'node:test'
import { QueueOperations, QueueRequestError, PlcQueueCommands, generateQueue, updateQueue } from '../models/Queue.js'

function fixture ({ writeError, auditError } = {}) {
  const events = []
  const obj = { queue: generateQueue({ QUEUE_LEN: 4 }), plcDTL: 1700000000000 }
  obj.queue[0].card = 183
  obj.queue[1].card = 123
  obj.queue[2].card = 124
  obj.queue[3].card = 125
  const plc = new PlcQueueCommands({
    def: { QUEUE_DELETE: { area: 0x84, dbNumber: 7, start: 394, amount: 4, wordLen: 2 } },
    client: {
      WriteArea (...args) {
        const callback = args.pop()
        events.push(['write', ...args])
        callback(writeError)
      }
    }
  })
  const history = {
    async saveAction (action) {
      events.push(['audit', action])
      if (auditError) throw auditError
    }
  }
  return { queue: new QueueOperations({ obj, plc, history }), obj, events }
}

test('queue deletion checks one-based IDs and encodes index then card before auditing', async () => {
  for (const [index, card] of [[1, 183], [2, 123], [3, 124], [4, 125]]) {
    const { queue, obj, events } = fixture()
    assert.deepEqual(await queue.deleteRequest({ index, card, user: 'operator' }), { card, written: true })
    assert.deepEqual(events, [
      ['write', 0x84, 7, 394, 4, 2, Buffer.from([0, index, 0, card])],
      ['audit', { card, date: obj.plcDTL, operation: 13, stall: 0, user: 'operator' }]
    ])
    assert.equal(obj.queue.find(item => item.id === index).card, card, 'Wait for PLC state updates')
  }
})

test('invalid inputs and indices outside the one-based queue prevent both writes and audit', async () => {
  for (const [index, card, message] of [
    [0, 123, 'Queue index not valid'], [-1, 123, 'Queue index not valid'],
    [5, 123, 'Queue index not valid'], [2.5, 123, 'Parameters not valid'],
    ['2', 123, 'Parameters not valid'], [undefined, 123, 'Parameters not valid'],
    [2, '123', 'Parameters not valid'], [2, null, 'Parameters not valid'],
    [2, 123.5, 'Parameters not valid'], [2, 0, 'Parameters not valid'],
    [2, -1, 'Parameters not valid'], [2, 65536, 'Parameters not valid'],
    [1, 123, 'Queue changed, refresh and try again'],
    [2, 124, 'Queue changed, refresh and try again'],
    [4, 123, 'Queue changed, refresh and try again']
  ]) {
    const { queue, events } = fixture()
    await assert.rejects(queue.deleteRequest({ index, card }), error => {
      assert.ok(error instanceof QueueRequestError)
      assert.equal(error.message, message)
      return true
    })
    assert.deepEqual(events, [])
  }
})

test('deletion checks the latest queue and rejects changed, empty or missing slots', async () => {
  for (const replacement of [
    [{ id: 1, card: 123 }, { id: 2, card: 124 }, { id: 3, card: 0 }, { id: 4, card: 0 }],
    [{ id: 1, card: 123 }, { id: 2, card: 0 }, { id: 3, card: 124 }, { id: 4, card: 0 }],
    [{ id: 1, card: 123 }, { id: 3, card: 124 }, { id: 4, card: 0 }, { id: 5, card: 0 }]
  ]) {
    const { queue, obj, events } = fixture()
    obj.queue = replacement
    await assert.rejects(queue.deleteRequest({ index: 2, card: 123 }), {
      message: 'Queue changed, refresh and try again'
    })
    assert.deepEqual(events, [])
  }
})

test('queue write failures skip audit; audit failures never repeat the write', async () => {
  const writeError = new Error('PLC unavailable')
  const failedWrite = fixture({ writeError })
  await assert.rejects(failedWrite.queue.deleteRequest({ index: 2, card: 123 }), error => error === writeError)
  assert.deepEqual(failedWrite.events.map(event => event[0]), ['write'])

  const auditError = new Error('MongoDB unavailable')
  const failedAudit = fixture({ auditError })
  await assert.rejects(failedAudit.queue.deleteRequest({ index: 2, card: 123 }), error => error === auditError)
  assert.deepEqual(failedAudit.events.map(event => event[0]), ['write', 'audit'])
})

test('queue updates decode an embedded segment and preserve slots and one-based IDs', async () => {
  const queue = generateQueue({ QUEUE_LEN: 2 })
  const first = queue[0]
  const buffer = Buffer.alloc(16, 255)
  buffer.writeInt16BE(123, 3)
  buffer.writeInt16BE(7, 5)
  buffer.writeInt16BE(0, 7)
  buffer.writeInt16BE(0, 9)
  assert.equal(await updateQueue(3, buffer, 4, queue), queue)
  assert.equal(queue[0], first)
  assert.deepEqual(queue.map(item => ({ ...item })), [
    { id: 1, card: 123, stall: 7 }, { id: 2, card: 0, stall: 0 }
  ])
  buffer.writeInt16BE(124, 7)
  buffer.writeInt16BE(8, 9)
  await updateQueue(3, buffer, 4, queue)
  assert.equal(queue[1].card, 124)
  assert.equal(queue[1].stall, 8)
})

test('queue decoding respects padded record strides', async () => {
  const queue = generateQueue({ QUEUE_LEN: 2 })
  const buffer = Buffer.alloc(16, 255)
  buffer.writeInt16BE(123, 2)
  buffer.writeInt16BE(7, 4)
  buffer.writeInt16BE(124, 8)
  buffer.writeInt16BE(8, 10)
  await updateQueue(2, buffer, 6, queue)
  assert.deepEqual(queue.map(item => [item.card, item.stall]), [[123, 7], [124, 8]])
})

test('incomplete queue segments and invalid bounds fail before updating any slot', async () => {
  for (const [start, length, stride] of [
    [-1, 8, 4], [9, 8, 4], [0.5, 8, 4],
    [0, 8, 0], [0, 8, 3], [0, 8, 4.5],
    [0, 7, 4], [1, 8, 4], [0, 11, 6]
  ]) {
    const queue = generateQueue({ QUEUE_LEN: 2 })
    const before = structuredClone(queue)
    await assert.rejects(updateQueue(start, Buffer.alloc(length), stride, queue), RangeError)
    assert.deepEqual(structuredClone(queue), before)
  }
  const empty = generateQueue({ QUEUE_LEN: 0 })
  assert.equal(await updateQueue(0, Buffer.alloc(0), 4, empty), empty)
})
