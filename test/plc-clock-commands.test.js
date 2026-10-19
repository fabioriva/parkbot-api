import assert from 'node:assert/strict'
import test from 'node:test'
import PlcClockCommands from '../models/PlcClock.js'

const date = new Date('2026-10-18T12:34:56.731Z') // Sunday: Siemens day 1.

function fixture (t, { pending = 0, replies = [Buffer.alloc(3)], failAt } = {}) {
  const events = []
  const waits = []
  const failure = new Error('PLC communication failed')
  let now = 0
  t.mock.method(console, 'log', () => {})
  t.mock.method(Date, 'now', () => now)
  t.mock.method(globalThis, 'setTimeout', (callback, delay) => {
    waits.push(delay)
    now += delay
    queueMicrotask(callback)
  })
  const client = {
    ReadArea (area, dbNumber, start, amount, wordLen, callback) {
      events.push(['read', area, dbNumber, start, amount, wordLen])
      if (events.length === failAt) return callback(failure)
      const data = start === 30 ? Buffer.from([pending]) : (replies.shift() ?? Buffer.from([0, 0, 1]))
      callback(null, data)
    },
    WriteArea (...args) {
      const callback = args.pop()
      events.push(['write', ...args])
      callback(events.length === failAt ? failure : null)
    }
  }
  return { clock: new PlcClockCommands({ client }), events, waits, failure }
}

test('clock encodes UTC DTL and writes date before triggering the request', async t => {
  const { clock, events, waits } = fixture(t)
  await clock.setClock(date)
  const dtl = Buffer.alloc(12)
  dtl.writeUInt16BE(2026, 0)
  dtl.set([10, 18, 1, 12, 34, 56], 2)
  dtl.writeUInt32BE(731000000, 8)
  assert.deepEqual(events, [
    ['read', 0x84, 6, 30, 1, 2],
    ['write', 0x84, 6, 16, 12, 2, dtl],
    ['write', 0x84, 6, 30, 1, 2, Buffer.from([1])],
    ['read', 0x84, 6, 28, 3, 2]
  ])
  assert.deepEqual(waits, [])
})

test('invalid dates cause no PLC I/O', async t => {
  const { clock, events } = fixture(t)
  for (const invalid of [new Date(NaN), '2026-10-18', null, undefined]) {
    await assert.rejects(clock.setClock(invalid), { name: 'TypeError', message: 'Data non valida' })
  }
  assert.deepEqual(events, [])
})

test('a pending request prevents both writes', async t => {
  const { clock, events } = fixture(t, { pending: 1 })
  await assert.rejects(clock.setClock(date), { message: 'Richiesta di impostazione già presente nel PLC' })
  assert.equal(events.length, 1)
  assert.equal(events[0][0], 'read')
})

test('clock polls every 100 ms until the PLC clears the request', async t => {
  const { clock, events, waits } = fixture(t, {
    replies: [Buffer.from([0, 0, 1]), Buffer.from([0, 0, 1]), Buffer.alloc(3)]
  })
  await clock.setClock(date)
  assert.deepEqual(waits, [100, 100])
  assert.equal(events.length, 6)
})

test('a cleared request with nonzero status reports the PLC error', async t => {
  const { clock, events } = fixture(t, { replies: [Buffer.from([0x80, 0x01, 0])] })
  await assert.rejects(clock.setClock(date), { message: 'WR_SYS_T: errore 0x8001' })
  assert.equal(events.length, 4)
})

test('an unconfirmed request times out after five seconds without repeating writes', async t => {
  const { clock, events, waits } = fixture(t, { replies: [] })
  await assert.rejects(clock.setClock(date), { message: 'Timeout: esito della richiesta non confermato' })
  assert.equal(waits.length, 50)
  assert.ok(waits.every(delay => delay === 100))
  assert.equal(events.filter(event => event[0] === 'write').length, 2)
  assert.equal(events.length, 53)
})

for (const failAt of [1, 2, 3, 4]) {
  test(`communication failure at step ${failAt} stops the sequence`, async t => {
    const { clock, events, failure } = fixture(t, { failAt })
    await assert.rejects(clock.setClock(date), error => error === failure)
    assert.equal(events.length, failAt)
  })
}
