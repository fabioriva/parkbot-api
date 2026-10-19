import assert from 'node:assert/strict'
import test from 'node:test'
import { StallOperations, StallRequestError, PlcStallCommands, generateStalls, updateStalls, occupancy } from '../models/Stall.js'

function fixture ({ def: overrides, writeError, auditError } = {}) {
  const events = []
  const def = {
    STALLS: 10,
    CARDS: 500,
    STALL_STATUS: { FREE: 0, LOCK: -1 },
    MAP_EDIT: { area: 0x84, dbNumber: 7, start: 390, amount: 4, wordLen: 2 },
    ...overrides
  }
  const obj = { stalls: [{ nr: 1, status: 123 }, { nr: 2, status: 0 }], plcDTL: 1700000000000 }
  const plc = new PlcStallCommands({
    def,
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
  return { stalls: new StallOperations({ def, obj, plc, history }), obj, events }
}

test('assignment, FREE and LOCK preserve encoding, response, audit and cached state', async () => {
  for (const [card, bytes, operation] of [
    [124, [0, 2, 0, 124], 5], [0, [0, 2, 0, 0], 6], [-1, [0, 2, 255, 255], 5]
  ]) {
    const { stalls, obj, events } = fixture()
    assert.deepEqual(await stalls.updateStall({ stall: '2', card: String(card), user: 'operator' }), {
      stall: 2, written: true
    })
    assert.deepEqual(events, [
      ['write', 0x84, 7, 390, 4, 2, Buffer.from(bytes)],
      ['audit', { card, date: obj.plcDTL, operation, stall: 2, user: 'operator' }]
    ])
    assert.equal(obj.stalls[1].status, 0, 'Wait for PLC state updates')
  }
})

test('validation preserves error ordering and rejects duplicates including the same stall', async () => {
  for (const [stall, card, message] of [
    ['invalid', 124, 'Parameters not valid'], [2, 'invalid', 'Parameters not valid'],
    [0, 124, 'Stall not valid'], [11, 124, 'Stall not valid'],
    [0, 501, 'Stall not valid'], [2, 501, 'Card not valid'],
    [2, -2, 'Card not valid'], [2, 123, 'Card in use'], [1, 123, 'Card in use']
  ]) {
    const { stalls, events } = fixture()
    await assert.rejects(stalls.updateStall({ stall, card }), error => {
      assert.ok(error instanceof StallRequestError)
      assert.equal(error.message, message)
      return true
    })
    assert.deepEqual(events, [])
  }
})

test('configured card limits, stall boundaries and special values are honored', async () => {
  const { stalls, events } = fixture({ def: { MIN_CARD: 100, MAX_CARD: 200 } })
  for (const card of [99, 201]) {
    await assert.rejects(stalls.updateStall({ stall: 2, card }), { message: 'Card not valid' })
  }
  assert.deepEqual(events, [])
  for (const [stall, card] of [[1, 100], [10, 200]]) {
    assert.deepEqual(await stalls.updateStall({ stall, card }), { stall, written: true })
  }

  const special = fixture({ def: { STALL_STATUS: { FREE: -2, LOCK: -3 } } })
  special.obj.stalls = [{ status: -2 }, { status: -3 }]
  for (const card of [-2, -3]) {
    await special.stalls.updateStall({ stall: 2, card })
    const audit = special.events.at(-1)[1]
    assert.equal(audit.operation, 5, 'Preserve card !== 0 mapping even for nonzero FREE')
  }
})

test('duplicate validation uses the latest acquired state', async () => {
  const { stalls, obj, events } = fixture()
  obj.stalls = [{ status: 124 }]
  await assert.rejects(stalls.updateStall({ stall: 2, card: 124 }), { message: 'Card in use' })
  assert.deepEqual(events, [])
})

test('PLC failures skip audit; audit failures propagate without repeating the write', async () => {
  const writeError = new Error('PLC unavailable')
  const failedWrite = fixture({ writeError })
  await assert.rejects(failedWrite.stalls.updateStall({ stall: 2, card: 124 }), error => error === writeError)
  assert.deepEqual(failedWrite.events.map(event => event[0]), ['write'])

  const auditError = new Error('MongoDB unavailable')
  const failedAudit = fixture({ auditError })
  await assert.rejects(failedAudit.stalls.updateStall({ stall: 2, card: 124 }), error => error === auditError)
  assert.deepEqual(failedAudit.events.map(event => event[0]), ['write', 'audit'])
})

function stallRecord (status, size = 1) {
  const record = Buffer.alloc(10)
  record.writeInt16BE(status, 0)
  record.writeUInt32BE(1234, 4)
  record.writeInt16BE(size, 8)
  return record
}

test('map updates preserve object identity, first card match and last matching stall', async () => {
  const stalls = generateStalls({ STALLS: 4 })
  const firstStall = stalls[0]
  const cards = [{ nr: '123', status: 0 }, { nr: 123, status: 0 }, { nr: 123, status: 99 }, { nr: 124, status: 4 }]
  const buffer = Buffer.concat([stallRecord(123), stallRecord(-1), stallRecord(123)])
  assert.equal(await updateStalls(0, buffer, 10, cards, stalls), stalls)
  assert.equal(stalls[0], firstStall)
  assert.equal(firstStall.date, '1990-01-01T00:00:01.234Z')
  assert.deepEqual(cards.map(card => card.status), [0, 3, 99, 4])
  assert.equal(stalls[3].date, '1990-01-01T00:00:00.000Z')
  assert.equal(stalls[3].status, 0)
})

test('map decoding supports a buffer prefix and padded records', async () => {
  const stalls = generateStalls({ STALLS: 2 })
  const cards = [{ nr: 124, status: 0 }]
  const buffer = Buffer.concat([
    Buffer.from([9, 9, 9]), stallRecord(124, 2), Buffer.from([255, 255]),
    stallRecord(0, 3), Buffer.from([255, 255])
  ])
  await updateStalls(3, buffer, 12, cards, stalls)
  assert.deepEqual(stalls.map(stall => [stall.status, stall.size]), [[124, 2], [0, 3]])
  assert.equal(cards[0].status, 1)
  assert.equal(stalls[1].date, '1990-01-01T00:00:01.234Z')
})

test('invalid record sizes, bounds or incomplete maps reject before changing state', async () => {
  for (const [start, length, stride] of [
    [-1, 10, 10], [11, 10, 10], [0.5, 10, 10],
    [0, 10, 0], [0, 10, 9], [0, 10, 10.5],
    [0, 11, 10], [0, 20, 10]
  ]) {
    const stalls = generateStalls({ STALLS: 1 })
    const cards = [{ nr: 123, status: 99 }]
    const before = structuredClone({ stalls, cards })
    await assert.rejects(updateStalls(start, Buffer.alloc(length), stride, cards, stalls), RangeError)
    assert.deepEqual(structuredClone({ stalls, cards }), before)
  }
})

test('an empty map leaves cached stalls and card status unchanged', async () => {
  const stalls = generateStalls({ STALLS: 1 })
  const cards = [{ nr: 123, status: 1 }]
  assert.equal(await updateStalls(0, Buffer.alloc(0), 10, cards, stalls), stalls)
  assert.equal(cards[0].status, 1)
  assert.equal(stalls[0].status, 0)
})

test('occupancy preserves category order, size filtering and special-state classification', () => {
  for (const lock of [-1, 999]) {
    const stalls = [
      { status: 0, size: 1 }, { status: 123, size: 1 }, { status: lock, size: 1 },
      { status: 997, size: 2 }, { status: 998, size: 2 }, { status: 0, size: 2 }
    ]
    const counts = size => occupancy(size, stalls, { FREE: 0, LOCK: lock })
    assert.deepEqual(counts(0), [{ id: 'busy', value: 3 }, { id: 'free', value: 2 }, { id: 'lock', value: 1 }])
    assert.deepEqual(counts(1), [{ id: 'busy', value: 1 }, { id: 'free', value: 1 }, { id: 'lock', value: 1 }])
    assert.deepEqual(counts(2), [{ id: 'busy', value: 2 }, { id: 'free', value: 1 }, { id: 'lock', value: 0 }])
    assert.deepEqual(counts(3), [{ id: 'busy', value: 0 }, { id: 'free', value: 0 }, { id: 'lock', value: 0 }])
    assert.notEqual(counts(0), counts(0))
  }
  assert.deepEqual(occupancy(0, [], { LOCK: -1 }), [
    { id: 'busy', value: 0 }, { id: 'free', value: 0 }, { id: 'lock', value: 0 }
  ])
})
