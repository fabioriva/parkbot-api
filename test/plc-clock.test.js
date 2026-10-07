import assert from 'node:assert/strict'
import test from 'node:test'
import PLC from '../lib/Plc.js'

const def = {
  PLC: { ip: '192.0.2.1', polling_time: 500 },
  CLOCK_READ: { area: 0x84, dbNumber: 520, start: 2, amount: 14, wordLen: 0x02 }
}

function clockBuffer (status = 0) {
  const data = Buffer.alloc(14)
  data.writeUInt16BE(2026, 0)
  data[2] = 10
  data[3] = 7
  data[5] = 12
  data[6] = 34
  data[7] = 56
  data.writeUInt32BE(731000000, 8)
  data.writeInt16BE(status, 12)
  return data
}

for (const failure of [
  { name: 'Snap7 read failure', code: 123, data: undefined },
  { name: 'nonzero PLC clock status', code: 0, data: clockBuffer(1) },
  { name: 'truncated clock buffer', code: 0, data: Buffer.alloc(12) }
]) {
  test(`${failure.name} disconnects and keeps polling for reconnection`, async t => {
    const plc = Object.create(PLC.prototype)
    plc.online = true
    plc.online_ = true
    plc.client = {
      ReadArea: (area, dbNumber, start, amount, wordLen, callback) => callback(failure.code, failure.data),
      Disconnect: t.mock.fn(() => true),
      Connect: t.mock.fn(() => false),
      ErrorText: code => `Snap7 error ${code}`
    }
    const main = t.mock.method(plc, 'main', async () => {})
    for (const method of ['alarms', 'cards', 'map']) {
      t.mock.method(plc, method, async () => {})
    }
    const publish = t.mock.method(plc, 'publish', () => {})
    const callbacks = []
    t.mock.method(globalThis, 'setTimeout', (callback, delay) => {
      assert.equal(delay, def.PLC.polling_time)
      callbacks.push(callback)
    })
    const obj = { plcDTL: 42, devices: [], alarms: [], map: { occupancy: {} } }

    plc.forever(def, obj)
    await callbacks.shift()()

    assert.equal(plc.online, false)
    assert.equal(plc.client.Disconnect.mock.callCount(), 1)
    assert.equal(obj.plcDTL, 42)
    assert.equal(main.mock.callCount(), 1) // Offline refresh after the connection changes.
    assert.equal(publish.mock.calls.at(-1).arguments[1].comm, false)
    assert.equal(callbacks.length, 1)

    await callbacks.shift()()
    assert.equal(plc.client.Connect.mock.callCount(), 1)
    assert.equal(callbacks.length, 1)
  })
}

test('reads the PLC clock as UTC milliseconds', async () => {
  const plc = Object.create(PLC.prototype)
  plc.client = {
    ReadArea: (area, dbNumber, start, amount, wordLen, callback) => {
      assert.deepEqual([area, dbNumber, start, amount, wordLen], [0x84, 520, 2, 14, 0x02])
      callback(0, clockBuffer())
    }
  }
  const obj = {}
  await plc.readPlcClock(def, obj)
  assert.equal(obj.plcDTL, Date.UTC(2026, 9, 7, 12, 34, 56, 731))
})

test('uses server time when CLOCK_READ is absent', async t => {
  t.mock.method(Date, 'now', () => 123456789)
  const plc = Object.create(PLC.prototype)
  const obj = {}
  await plc.readPlcClock({}, obj)
  assert.equal(obj.plcDTL, 123456789)
})
