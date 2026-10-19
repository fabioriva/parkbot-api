import assert from 'node:assert/strict'
import test from 'node:test'
import { ParkingOperations, ParkingRequestError, PlcParkingCommands } from '../models/Parking.js'

function fixture (options = {}) {
  const events = []
  const def = { CARDS: 500, MAX_ENTRY: 2, ...options.def }
  const obj = { stalls: [{ status: 123 }], plcDTL: 1700000000000 }
  const plc = {
    async requestExit (card) {
      events.push(['write', card])
      if (options.writeError) throw options.writeError
      return true
    },
    async requestEntry (request) {
      events.push(['entry', request])
      if (options.writeError) throw options.writeError
      return true
    },
    async requestRollback (request) {
      events.push(['rollback', request])
      if (options.writeError) throw options.writeError
      return true
    }
  }
  const history = {
    async saveAction (action) {
      events.push(['audit', action])
      if (options.auditError) throw options.auditError
    }
  }
  const parking = new ParkingOperations({ def, obj, plc, history })
  return { parking, events, obj }
}

test('exit writes before auditing and reads the current plant state', async () => {
  const { parking, events, obj } = fixture()
  obj.plcDTL++
  assert.deepEqual(await parking.requestExit({ card: '123', user: 'operator@example.test' }), {
    card: 123, written: true
  })
  assert.deepEqual(events, [
    ['write', 123],
    ['audit', { card: 123, date: obj.plcDTL, operation: 10, stall: 0, user: 'operator@example.test' }]
  ])
  obj.stalls = []
  await assert.rejects(parking.requestExit({ card: 123 }), { message: 'Card not found' })
  assert.equal(events.length, 2)
})

for (const [command, method, operation] of [
  ['entry', 'requestEntry', 11], ['rollback', 'requestRollback', 12]
]) {
  test(`${command} preserves conversion, limits, current occupancy and audit`, async () => {
    const { parking, obj, events } = fixture({ def: { MIN_CARD: 100, MAX_CARD: 200 } })
    for (const card of [100, 200]) {
      for (const entry of [1, 2]) {
        events.length = 0
        obj.plcDTL++
        assert.deepEqual(await parking[method]({ card: String(card), entry: String(entry), user: 'operator' }), {
          card, written: true
        })
        assert.deepEqual(events, [
          [command, { card, entry }],
          ['audit', { card, date: obj.plcDTL, operation, stall: 0, user: 'operator' }]
        ])
      }
    }
    obj.stalls = [{ status: 200 }]
    await assert.rejects(parking[method]({ card: 200, entry: 1 }), { message: 'Card in use' })
  })

  test(`${command} rejects invalid parameters before writes or audit`, async () => {
    for (const [card, entry, message] of [
      ['invalid', 1, 'Parameters not valid'], [124, 'invalid', 'Parameters not valid'],
      [0, 1, 'Card not valid'], [501, 1, 'Card not valid'],
      [123, 1, 'Card in use'], [124, 0, 'Entry not valid'], [124, 3, 'Entry not valid']
    ]) {
      const { parking, events } = fixture()
      await assert.rejects(parking[method]({ card, entry }), error => {
        assert.ok(error instanceof ParkingRequestError)
        assert.equal(error.message, message)
        return true
      })
      assert.deepEqual(events, [])
    }
  })

  test(`${command} does not audit PLC failures or retry after audit failure`, async () => {
    const writeError = new Error('PLC unavailable')
    const failedWrite = fixture({ writeError })
    await assert.rejects(failedWrite.parking[method]({ card: 124, entry: 1 }), error => error === writeError)
    assert.deepEqual(failedWrite.events, [[command, { card: 124, entry: 1 }]])

    const auditError = new Error('MongoDB unavailable')
    const failedAudit = fixture({ auditError })
    await assert.rejects(failedAudit.parking[method]({ card: 124, entry: 1 }), error => error === auditError)
    assert.deepEqual(failedAudit.events.map(event => event[0]), [command, 'audit'])
  })

  test(`${command} adapter writes entry then card at its own configured address`, async () => {
    const writes = []
    const client = {
      WriteArea (...args) {
        const callback = args.pop()
        writes.push(args)
        callback(null)
      }
    }
    const plc = new PlcParkingCommands({
      client,
      def: {
        REQ_ENTRY: { area: 0x84, dbNumber: 7, start: 100, amount: 4, wordLen: 2 },
        REQ_ROLLBACK: { area: 0x84, dbNumber: 8, start: 200, amount: 4, wordLen: 2 }
      }
    })
    assert.equal(await plc[method]({ card: 0x0123, entry: 2 }), true)
    assert.deepEqual(writes, [[
      0x84, command === 'entry' ? 7 : 8, command === 'entry' ? 100 : 200, 4, 2,
      Buffer.from([0, 2, 1, 0x23])
    ]])
  })
}

test('invalid parameters, card limits and absent cards have no side effects', async () => {
  for (const [card, message] of [
    ['invalid', 'Parameters not valid'], [0, 'Card not valid'],
    [501, 'Card not valid'], [124, 'Card not found']
  ]) {
    const { parking, events } = fixture()
    await assert.rejects(parking.requestExit({ card }), error => {
      assert.ok(error instanceof ParkingRequestError)
      assert.equal(error.message, message)
      return true
    })
    assert.deepEqual(events, [])
  }
  const { parking, events } = fixture({ def: { MIN_CARD: 124, MAX_CARD: 200 } })
  await assert.rejects(parking.requestExit({ card: 123 }), { message: 'Card not valid' })
  await assert.rejects(parking.requestExit({ card: 201 }), { message: 'Card not valid' })
  assert.deepEqual(events, [])
})

test('PLC failure prevents audit; audit failure propagates after one write', async () => {
  const writeError = new Error('PLC unavailable')
  const failedWrite = fixture({ writeError })
  await assert.rejects(failedWrite.parking.requestExit({ card: 123 }), error => error === writeError)
  assert.deepEqual(failedWrite.events, [['write', 123]])

  const auditError = new Error('MongoDB unavailable')
  const failedAudit = fixture({ auditError })
  await assert.rejects(failedAudit.parking.requestExit({ card: 123 }), error => error === auditError)
  assert.deepEqual(failedAudit.events.map(event => event[0]), ['write', 'audit'])
})

test('PLC adapter uses the installation address and writes the card in big endian', async () => {
  for (const start of [398, 600]) {
    let writes = 0
    const client = {
      WriteArea (area, dbNumber, offset, amount, wordLen, buffer, callback) {
        writes++
        assert.deepEqual([area, dbNumber, offset, amount, wordLen], [0x84, 7, start, 2, 0x02])
        assert.deepEqual(buffer, Buffer.from([0x01, 0x23]))
        callback(null)
      }
    }
    const plc = new PlcParkingCommands({
      client, def: { REQ_0: { area: 0x84, dbNumber: 7, start, amount: 2, wordLen: 0x02 } }
    })
    assert.equal(await plc.requestExit(0x0123), true)
    assert.equal(writes, 1)
  }
})
