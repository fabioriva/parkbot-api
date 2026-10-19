import assert from 'node:assert/strict'
import test from 'node:test'
import { CardOperations, CardRequestError, PlcCardCommands, generateCards, generateTags, updateCards } from '../models/Card.js'
import { format } from 'date-fns'
import { getPlcDateTime } from '../lib/utils7.js'

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

function cardRecord (pin, from, to, length = 10) {
  const record = Buffer.alloc(length, 255)
  record.writeInt16BE(pin, 0)
  record.writeInt32BE(from, 2)
  record.writeInt32BE(to, 6)
  return record
}

test('card decoding preserves object identity, PIN padding, times and occupancy status', async () => {
  for (const length of [10, 12, 20]) {
    const cards = generateCards({ CARDS: 3 })
    const first = cards[0]
    first.status = 42
    const untouched = { ...cards[2] }
    const buffer = Buffer.concat([
      Buffer.from([255, 255, 255]), cardRecord(0x00A, 1234, 86399000, length),
      cardRecord(0xABC, 3600000, 7200000, length)
    ])
    assert.equal(await updateCards(3, buffer, length, cards), cards)
    assert.equal(cards[0], first)
    assert.equal(first.code, '00A')
    assert.equal(cards[1].code, 'ABC')
    assert.equal(first.from, format(getPlcDateTime(0, 1234), 'HH:mm:ss'))
    assert.equal(first.to, format(getPlcDateTime(0, 86399000), 'HH:mm:ss'))
    assert.equal(first.status, 42)
    assert.deepEqual({ ...cards[2] }, untouched)
  }
})

test('tag decoding respects configured numbering, record boundaries and UID lengths', async () => {
  for (const length of [6, 8, 10, 20]) {
    const tags = generateTags({ MIN_CARD: 243, MAX_CARD: 244 })
    tags[0].status = 7
    const first = tags[0]
    const buffer = Buffer.alloc(2 + 2 * length)
    for (let i = 0; i < 2; i++) {
      const start = 2 + i * length
      buffer.writeInt16BE(i === 0 ? 1 : 0, start)
      buffer.writeUInt16BE(i === 0 ? 0x0ABC : 0x0123, start + 2)
      buffer.writeInt16BE(i + 1, start + 4)
      buffer.fill(i === 0 ? 0xAB : 0xCD, start + 6, start + length)
    }
    assert.equal(await updateCards(2, buffer, length, tags), tags)
    assert.equal(tags[0], first)
    assert.deepEqual(tags.map(tag => ({ ...tag })), [
      { nr: 243, charge: true, code: 'ABC', status: 7, type: 1, uid: 'AB'.repeat(length - 6) },
      { nr: 244, charge: false, code: '123', status: 0, type: 2, uid: 'CD'.repeat(length - 6) }
    ])
  }
})

test('invalid card buffers reject before changing any decoded fields', async () => {
  for (const [start, length, stride] of [
    [-1, 20, 10], [21, 20, 10], [0.5, 20, 10],
    [0, 20, 0], [0, 20, 10.5], [0, 18, 9], [0, 21, 10], [0, 30, 10]
  ]) {
    const cards = generateCards({ CARDS: 2 })
    const before = cards.map(card => ({ ...card }))
    await assert.rejects(updateCards(start, Buffer.alloc(length), stride, cards), RangeError)
    assert.deepEqual(cards.map(card => ({ ...card })), before)
  }
  const tags = generateTags({ MIN_CARD: 1, MAX_CARD: 2 })
  await assert.rejects(updateCards(0, Buffer.alloc(10), 5, tags), RangeError)
  assert.ok(tags.every(tag => tag.code === '' && tag.uid === ''))
})

test('empty card buffers leave existing objects unchanged', async () => {
  const cards = generateCards({ CARDS: 1 })
  const before = { ...cards[0] }
  assert.equal(await updateCards(0, Buffer.alloc(0), 10, cards), cards)
  assert.deepEqual({ ...cards[0] }, before)
})
