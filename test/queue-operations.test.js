import assert from 'node:assert/strict'
import test from 'node:test'
import QueueOperations, { QueueRequestError } from '../lib/QueueOperations.js'
import PlcQueueCommands from '../lib/PlcQueueCommands.js'
import { generateQueue } from '../models/Queue.js'

function fixture ({ writeError, auditError } = {}) {
  const events = []
  const obj = { queue: generateQueue({ QUEUE_LEN: 4 }), plcDTL: 1700000000000 }
  obj.queue[1].card = 123
  obj.queue[2].card = 124
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
  for (const [index, card] of [[2, 123], [3, 124]]) {
    const { queue, obj, events } = fixture()
    assert.deepEqual(await queue.deleteRequest({ index, card, user: 'operator' }), { card, written: true })
    assert.deepEqual(events, [
      ['write', 0x84, 7, 394, 4, 2, Buffer.from([0, index, 0, card])],
      ['audit', { card, date: obj.plcDTL, operation: 13, stall: 0, user: 'operator' }]
    ])
    assert.equal(obj.queue.find(item => item.id === index).card, card, 'Wait for PLC state updates')
  }
})

test('invalid inputs and strict PLC boundaries prevent both writes and audit', async () => {
  for (const [index, card, message] of [
    [1, 123, 'Queue index not valid'], [4, 123, 'Queue index not valid'],
    [0, 123, 'Queue index not valid'], [-1, 123, 'Queue index not valid'],
    [5, 123, 'Queue index not valid'], [2.5, 123, 'Parameters not valid'],
    ['2', 123, 'Parameters not valid'], [undefined, 123, 'Parameters not valid'],
    [2, '123', 'Parameters not valid'], [2, null, 'Parameters not valid'],
    [2, 123.5, 'Parameters not valid'], [2, 0, 'Parameters not valid'],
    [2, -1, 'Parameters not valid'], [2, 65536, 'Parameters not valid'],
    [2, 124, 'Queue changed, refresh and try again']
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
