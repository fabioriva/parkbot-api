import assert from 'node:assert/strict'
import test from 'node:test'
import CardOperations, { CardRequestError } from '../lib/CardOperations.js'
import PlcCardCommands from '../lib/PlcCardCommands.js'

function fixture ({ def: overrides, writeError, auditError } = {}) {
  const events = []
  const def = {
    CARDS: 500,
    CARD_EDIT: { area: 0x84, dbNumber: 7, start: 386, amount: 4, wordLen: 2 },
    ...overrides
  }
  const obj = { plcDTL: 1700000000000 }
  const plc = new PlcCardCommands({
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
  return { cards: new CardOperations({ def, obj, plc, history }), obj, events }
}

test('hexadecimal PINs and numeric -1 retain their binary encoding and audit', async () => {
  for (const [code, bytes] of [
    ['000', [0, 0]], ['aBc', [0x0A, 0xBC]], ['FFF', [0x0F, 0xFF]],
    [123, [0x01, 0x23]], [-1, [0xFF, 0xFF]]
  ]) {
    const { cards, obj, events } = fixture()
    obj.plcDTL++
    assert.deepEqual(await cards.updatePin({ card: 123, code, user: 'operator' }), { card: 123, written: true })
    assert.deepEqual(events, [
      ['write', 0x84, 7, 386, 4, 2, Buffer.from([0, 123, ...bytes])],
      ['audit', { card: 123, date: obj.plcDTL, operation: 4, stall: 0, user: 'operator' }]
    ])
  }
})

test('invalid PINs, including string "-1", never write or audit', async () => {
  for (const code of ['-1', '12', '1234', 'xyz', '', null, undefined, -2]) {
    const { cards, events } = fixture()
    await assert.rejects(cards.updatePin({ card: 123, code }), error => {
      assert.ok(error instanceof CardRequestError)
      assert.equal(error.message, 'PIN code regexp is not valid')
      return true
    })
    assert.deepEqual(events, [])
  }
})

test('default and configured card limits retain their boundaries and error precedence', async () => {
  for (const [def, min, max] of [[{}, 1, 500], [{ MIN_CARD: 100, MAX_CARD: 200 }, 100, 200]]) {
    const { cards, events } = fixture({ def })
    for (const card of [min - 1, max + 1]) {
      await assert.rejects(cards.updatePin({ card, code: 'invalid' }), { message: 'Card not valid' })
    }
    assert.deepEqual(events, [])
    for (const card of [min, max]) {
      assert.deepEqual(await cards.updatePin({ card, code: '123' }), { card, written: true })
    }
  }
})

test('refactor retains implicit card conversion and the original card value in audit', async () => {
  for (const card of ['123', 123.5]) {
    const { cards, events } = fixture()
    await cards.updatePin({ card, code: '123' })
    assert.deepEqual(events[0].at(-1), Buffer.from([0, 123, 1, 0x23]))
    assert.equal(events[1][1].card, card)
  }
})

test('PLC failures skip audit; audit failures propagate without repeating the write', async () => {
  const writeError = new Error('PLC unavailable')
  const failedWrite = fixture({ writeError })
  await assert.rejects(failedWrite.cards.updatePin({ card: 123, code: '123' }), error => error === writeError)
  assert.deepEqual(failedWrite.events.map(event => event[0]), ['write'])

  const auditError = new Error('MongoDB unavailable')
  const failedAudit = fixture({ auditError })
  await assert.rejects(failedAudit.cards.updatePin({ card: 123, code: '123' }), error => error === auditError)
  assert.deepEqual(failedAudit.events.map(event => event[0]), ['write', 'audit'])
})
