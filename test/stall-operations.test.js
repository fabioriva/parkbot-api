import assert from 'node:assert/strict'
import test from 'node:test'
import StallOperations, { StallRequestError } from '../lib/StallOperations.js'
import PlcStallCommands from '../lib/PlcStallCommands.js'

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
