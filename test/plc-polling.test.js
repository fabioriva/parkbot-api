import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import vm from 'node:vm'

const root = process.env.PLC_TEST_ROOT || fileURLToPath(new URL('../', import.meta.url))
const source = readFileSync(process.env.PLC_TEST_SOURCE || join(root, 'lib/Plc.js'), 'utf8')
const { getPlcDateTime, ReadArea, WriteArea } = await import(pathToFileURL(join(root, 'lib/utils7.js')))
const classSource = source.slice(source.indexOf('const LOG_LEN ='), source.indexOf('export default PLC'))

function clockBuffer (status = 0) {
  const buffer = Buffer.alloc(14)
  buffer.writeUInt16BE(2026, 0)
  buffer[2] = 10
  buffer[3] = 7
  buffer[5] = 8
  buffer[6] = 30
  buffer[7] = 9
  buffer.writeInt16BE(status, 12)
  return buffer
}

function fixture () {
  const timers = []
  const messages = []
  const errors = []
  const updates = []
  let now = 0
  let readCalls = 0
  class Client {
    constructor () {
      this.reads = []
      this.connects = []
      this.disconnectResult = true
      this.disconnects = 0
    }

    ConnectTo () {
      if (this.initialError) throw this.initialError
      return true
    }

    Connect () {
      const result = this.connects.shift() ?? true
      if (result instanceof Error) throw result
      return result
    }

    Disconnect () {
      this.disconnects++
      if (this.disconnectError) throw this.disconnectError
      return this.disconnectResult
    }

    ErrorText (code) { return `Snap7 ${code}` }

    ReadArea (area, dbNumber, start, amount, wordLen, callback) {
      readCalls++
      const result = this.reads.shift() ?? clockBuffer()
      queueMicrotask(() => Buffer.isBuffer(result) ? callback(null, result) : callback(result))
    }

    WriteArea (area, dbNumber, start, amount, wordLen, buffer, callback) {
      queueMicrotask(() => callback(null))
    }
  }
  const decode = async () => {}
  const context = vm.createContext({
    snap7: { S7Client: Client },
    logger: { error: (...args) => errors.push(args), info: () => {} },
    getPlcDateTime,
    ReadArea,
    WriteArea,
    countAlarms: () => 0,
    updateBits: decode,
    updateDevices: decode,
    updateDrives: decode,
    updatePositions: decode,
    updateQueue: decode,
    Buffer,
    performance: { now: () => now },
    setTimeout: (callback, delay) => timers.push({ callback, delay })
  })
  vm.runInContext(classSource + '\nglobalThis.TestPLC = PLC', context)
  const plc = new context.TestPLC({
    publish: (channel, buffer) => messages.push({ channel, data: JSON.parse(buffer.toString()) })
  }, { saveLog: async () => ({ operation: { id: 0 } }) }, {})
  const originalMain = plc.main.bind(plc)
  for (const method of ['alarms', 'cards', 'main', 'map']) {
    plc[method] = async () => { updates.push(method) }
  }
  const def = {
    PLC: { ip: 'simulated', rack: 0, slot: 1, polling_time: 500 },
    CLOCK_READ: { area: 0x84, dbNumber: 520, start: 2, amount: 14, wordLen: 2 },
    DATA_READ: { area: 0x84, dbNumber: 1, start: 0, amount: 32, wordLen: 2 }
  }
  const obj = { devices: [], alarms: [], map: { occupancy: [] }, racks: [], overview: {} }
  async function tick () {
    assert.equal(timers.length, 1, 'Exactly one polling cycle must be scheduled')
    const { callback, delay } = timers.shift()
    assert.equal(delay, 500)
    await callback()
    assert.equal(timers.length, 1, 'The next polling cycle must always be scheduled')
  }
  return {
    plc,
    def,
    obj,
    timers,
    messages,
    errors,
    updates,
    tick,
    originalMain,
    setTime: value => { now = value },
    readCalls: () => readCalls
  }
}

test('clock timeout broadcasts offline and recovers polling after reconnect', async () => {
  const f = fixture()
  f.plc.online = f.plc.online_ = true
  f.plc.client.reads.push(655470, clockBuffer())
  f.plc.forever(f.def, f.obj)
  await f.tick()
  assert.equal(f.plc.online, false)
  assert.equal(f.plc.client.disconnects, 1)
  assert.equal(f.errors[0][0].code, 655470)
  assert.equal(f.messages.at(-1).data.comm, false)
  await f.tick()
  assert.equal(f.plc.online, true)
  assert.equal(f.messages.at(-1).data.comm, true)
  await f.tick()
  assert.equal(f.obj.plcDTL, Date.UTC(2026, 9, 7, 8, 30, 9))
  assert.equal(f.messages.length, 3)
})

test('invalid PLC clock status is handled and polling continues', async () => {
  const f = fixture()
  f.plc.online = f.plc.online_ = true
  f.plc.client.reads.push(clockBuffer(12))
  f.plc.forever(f.def, f.obj)
  await f.tick()
  assert.equal(f.plc.online, false)
  assert.match(f.errors[0][0].message, /orologio PLC non valida: 12/)
  assert.equal(f.messages.at(-1).data.comm, false)
})

test('disconnect failure still marks the PLC offline and allows retries', async () => {
  for (const throws of [false, true]) {
    const f = fixture()
    f.plc.online = f.plc.online_ = true
    f.plc.client.reads.push(655470)
    f.plc.client.disconnectResult = false
    if (throws) f.plc.client.disconnectError = new Error('Disconnect failed')
    f.plc.forever(f.def, f.obj)
    await f.tick()
    assert.equal(f.plc.online, false)
    assert.equal(f.messages.at(-1).data.comm, false)
    assert.ok(f.errors.some(args => args[0].code === 655470))
  }
})

test('initial connection error still starts the retry loop', async () => {
  const f = fixture()
  f.plc.client.initialError = new Error('Initial connection failed')
  await f.plc.run(f.def, f.obj)
  assert.equal(f.plc.online, false)
  assert.equal(f.timers.length, 1)
  await f.tick()
  assert.equal(f.plc.online, true)
})

test('failed and throwing reconnect attempts do not stop subsequent cycles', async () => {
  const f = fixture()
  f.plc.client.connects.push(false, new Error('Reconnect failed'), true)
  f.plc.forever(f.def, f.obj)
  await f.tick()
  assert.equal(f.messages.at(-1).data.comm, false)
  await f.tick()
  assert.equal(f.plc.online, false)
  await f.tick()
  assert.equal(f.messages.at(-1).data.comm, true)
})

test('publishing error does not terminate polling', async () => {
  const f = fixture()
  f.plc.online = f.plc.online_ = true
  const publish = f.plc.app.publish
  f.plc.app.publish = () => { throw new Error('Publish failed') }
  f.plc.forever(f.def, f.obj)
  await f.tick()
  assert.equal(f.plc.online, false)
  f.plc.app.publish = publish
  await f.tick()
  assert.equal(f.messages.at(-1).data.comm, true)
})

test('connection refresh reads finish sequentially before the next cycle', async () => {
  const f = fixture()
  let active = 0
  let maxActive = 0
  for (const method of ['alarms', 'cards', 'main', 'map']) {
    f.plc[method] = async () => {
      active++
      maxActive = Math.max(maxActive, active)
      await Promise.resolve()
      assert.equal(f.timers.length, 0)
      f.updates.push(method)
      active--
    }
  }
  f.plc.forever(f.def, f.obj)
  await f.tick()
  assert.equal(maxActive, 1)
  assert.deepEqual(f.updates, ['main', 'alarms', 'cards', 'main', 'map'])
})

test('main handles PLC log write and history errors before completing', async () => {
  for (const stage of ['write', 'history']) {
    const f = fixture()
    f.plc.online = true
    const buffer = Buffer.alloc(32)
    buffer.writeInt16BE(0x264, 0)
    buffer.writeInt16BE(3, 30)
    f.plc.client.reads.push(buffer)
    if (stage === 'write') {
      f.plc.client.WriteArea = (...args) => queueMicrotask(() => args.at(-1)(655470))
    } else {
      f.plc.history.saveLog = async () => { throw new Error('History failed') }
    }
    await f.originalMain(f.def, f.obj)
    assert.equal(f.plc.online, false)
    assert.equal(f.plc.client.disconnects, 1)
    assert.equal(f.messages.at(-1).channel, 'aps/overview')
    if (stage === 'write') assert.equal(f.errors[0][0].code, 655470)
    else assert.equal(f.errors[0][0].message, 'History failed')
  }
})

test('clock sync reads once a minute while operation timestamps keep advancing', async () => {
  const f = fixture()
  f.plc.online = f.plc.online_ = true
  f.plc.forever(f.def, f.obj)
  await f.tick()
  const initial = f.obj.plcDTL
  assert.equal(f.readCalls(), 1)
  for (let now = 500; now < 60_000; now += 500) {
    f.setTime(now)
    await f.tick()
    assert.equal(f.obj.plcDTL, initial + now)
    assert.equal(f.readCalls(), 1)
  }
  const nextClock = clockBuffer()
  nextClock[6] = 31
  f.plc.client.reads.push(nextClock)
  f.setTime(60_000)
  await f.tick()
  assert.equal(f.readCalls(), 2)
  assert.equal(f.obj.plcDTL, Date.UTC(2026, 9, 7, 8, 31, 9))
  f.setTime(60_500)
  await f.tick()
  assert.equal(f.readCalls(), 2)
  assert.equal(f.obj.plcDTL, Date.UTC(2026, 9, 7, 8, 31, 9, 500))
})

test('a clock resync timeout recovers immediately after reconnection', async () => {
  const f = fixture()
  f.plc.online = f.plc.online_ = true
  f.plc.forever(f.def, f.obj)
  await f.tick()
  f.plc.client.reads.push(655470, clockBuffer())
  f.setTime(60_000)
  await f.tick()
  assert.equal(f.plc.online, false)
  assert.equal(f.plc.plcClockSync, undefined)
  assert.equal(f.messages.at(-1).data.comm, false)
  f.setTime(60_500)
  await f.tick()
  assert.equal(f.readCalls(), 3)
  assert.equal(f.plc.online, true)
  assert.equal(f.obj.plcDTL, Date.UTC(2026, 9, 7, 8, 30, 9))
  assert.equal(f.messages.at(-1).data.comm, true)
})

test('reconnect after a data read failure refreshes the clock before main', async () => {
  const f = fixture()
  f.plc.online = f.plc.online_ = true
  f.plc.forever(f.def, f.obj)
  await f.tick()
  f.setTime(500)
  await f.plc.error(655470)
  const nextClock = clockBuffer()
  nextClock[5] = 9
  f.plc.client.reads.push(nextClock)
  const mainTimes = []
  f.plc.main = async () => mainTimes.push(f.obj.plcDTL)
  await f.tick()
  assert.equal(f.readCalls(), 2)
  assert.equal(mainTimes[0], Date.UTC(2026, 9, 7, 9, 30, 9))
})

test('sites without CLOCK_READ retain the server time fallback without Snap7 reads', async () => {
  const f = fixture()
  delete f.def.CLOCK_READ
  f.plc.online = f.plc.online_ = true
  f.plc.forever(f.def, f.obj)
  const before = Date.now()
  await f.tick()
  assert.ok(f.obj.plcDTL >= before && f.obj.plcDTL <= Date.now())
  assert.equal(f.readCalls(), 0)
  assert.equal(f.plc.plcClockSync, undefined)
})
