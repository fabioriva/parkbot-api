import assert from 'node:assert/strict'
import test from 'node:test'
import PlcConnection, { PlcUnavailableError } from '../lib/PlcConnection.js'
import { ReadArea, WriteArea, PlcCommandError } from '../lib/utils7.js'
import PlcClockCommands from '../models/PlcClock.js'

const turn = () => new Promise(resolve => setImmediate(resolve))
const read = client => ReadArea(client, 0x84, 6, 0, 4, 0x02)
const write = client => WriteArea(client, 0x84, 6, 0, 4, 0x02, Buffer.alloc(4))

function fixture (options) {
  const events = []
  const callbacks = []
  const native = {
    ConnectTo (...args) {
      assert.deepEqual(args.slice(0, -1), ['simulated', 0, 1])
      events.push('connectTo')
      queueMicrotask(() => args.at(-1)(null))
    },
    Connect (callback) { events.push('connect'); queueMicrotask(() => callback(null)) },
    Disconnect () { events.push('disconnect'); return true },
    ReadArea (...args) { events.push('read'); callbacks.push(args.at(-1)) },
    WriteArea (...args) { events.push('write'); callbacks.push(args.at(-1)) },
    ErrorText: code => `Snap7 ${code}`
  }
  const connection = new PlcConnection(native, options)
  async function ready () {
    await connection.connectTo('simulated', 0, 1)
    connection.markReady()
    events.length = 0
  }
  return { connection, native, events, callbacks, ready }
}

test('commands require a loaded snapshot; polling can read while loading', async () => {
  const f = fixture()
  await assert.rejects(f.connection.runCommand(write), PlcUnavailableError)
  await f.connection.connectTo('simulated', 0, 1)
  assert.equal(f.connection.ready, false)
  await assert.rejects(f.connection.runCommand(read), PlcUnavailableError)
  const pending = f.connection.run(read)
  await turn()
  f.callbacks.shift()(null, Buffer.alloc(4))
  await pending
  f.connection.markReady()
  assert.equal(f.connection.ready, true)
})

test('poll reads and HTTP writes share one queue and retain native errors', async () => {
  const f = fixture()
  await f.ready()
  const reading = f.connection.run(read)
  const writing = f.connection.runCommand(write)
  const rejected = assert.rejects(writing, error => error === 12345)
  await turn()
  assert.deepEqual(f.events, ['read'])
  f.callbacks.shift()(null, Buffer.alloc(4))
  await reading
  await turn()
  assert.deepEqual(f.events, ['read', 'write'])
  f.callbacks.shift()(12345)
  await rejected
  await f.connection.tail
  assert.deepEqual(f.events, ['read', 'write', 'disconnect'])
  assert.equal(f.connection.ready, false)
})

test('disconnect waits for the native callback and cancels queued work before reconnecting', async () => {
  const f = fixture()
  await f.ready()
  const reading = f.connection.run(read)
  const queued = f.connection.runCommand(write)
  const cancelled = assert.rejects(queued, PlcUnavailableError)
  await turn()
  const stopped = f.connection.disconnect()
  const reconnecting = f.connection.connect()
  await assert.rejects(f.connection.runCommand(write), PlcUnavailableError)
  assert.deepEqual(f.events, ['read'])
  f.callbacks.shift()(null, Buffer.alloc(4))
  await Promise.all([reading, cancelled, stopped, reconnecting])
  assert.deepEqual(f.events, ['read', 'disconnect', 'connect'])
  assert.equal(f.connection.connected, true)
  assert.equal(f.connection.ready, false)
  f.connection.markReady()
  assert.equal(f.connection.ready, true)
})

test('an I/O failure cancels other queued alarm reads before disconnect', async () => {
  const f = fixture()
  await f.ready()
  const first = f.connection.run(read)
  const second = f.connection.run(read)
  const failures = Promise.all([
    assert.rejects(first, error => error === 655470),
    assert.rejects(second, PlcUnavailableError)
  ])
  await turn()
  f.callbacks.shift()(655470)
  await failures
  await f.connection.tail
  assert.deepEqual(f.events, ['read', 'disconnect'])
})

test('each client has an independent queue, including the Daman write client', async () => {
  const a = fixture()
  const b = fixture()
  await Promise.all([a.ready(), b.ready()])
  const reading = a.connection.run(read)
  const writing = b.connection.runCommand(write)
  await turn()
  assert.deepEqual(a.events, ['read'])
  assert.deepEqual(b.events, ['write'])
  b.callbacks.shift()(null)
  assert.equal(await writing, true)
  a.callbacks.shift()(null, Buffer.alloc(4))
  await reading
})

test('the whole clock exchange is exclusive across simultaneous requests and polling', async () => {
  const f = fixture()
  await f.ready()
  f.native.ReadArea = (area, db, start, amount, wordLen, callback) => {
    f.events.push(['read', start])
    queueMicrotask(() => callback(null, Buffer.alloc(amount)))
  }
  f.native.WriteArea = (area, db, start, amount, wordLen, buffer, callback) => {
    f.events.push(['write', start])
    queueMicrotask(() => callback(null))
  }
  const date = new Date('2026-10-19T10:00:00Z')
  const first = f.connection.runCommand(client => new PlcClockCommands({ client }).setClock(date))
  const second = f.connection.runCommand(client => new PlcClockCommands({ client }).setClock(date))
  const polling = f.connection.run(read)
  await Promise.all([first, second, polling])
  const exchange = [['read', 30], ['write', 16], ['write', 30], ['read', 28]]
  assert.deepEqual(f.events, [...exchange, ...exchange, ['read', 0]])
})

test('failure inside an exclusive command releases the queue and permits reconnect', async () => {
  const f = fixture()
  await f.ready()
  const command = f.connection.runCommand(write)
  const failed = assert.rejects(command, error => error === 12345)
  await turn()
  f.callbacks.shift()(12345)
  await failed
  await f.connection.connect()
  assert.deepEqual(f.events, ['write', 'disconnect', 'connect'])
  assert.equal(f.connection.ready, false)
})

test('disconnect during asynchronous connect waits and cannot restore an obsolete session', async () => {
  const f = fixture()
  let finish
  f.native.Connect = callback => { f.events.push('connect'); finish = callback }
  const connecting = f.connection.connect()
  await turn()
  const stopped = f.connection.disconnect()
  assert.deepEqual(f.events, ['connect'])
  finish(null)
  assert.equal(await connecting, false)
  await stopped
  assert.deepEqual(f.events, ['connect', 'disconnect'])
  assert.equal(f.connection.connected, false)
})

test('disconnect cancels a connection attempt even before its native call starts', async () => {
  const f = fixture()
  const connecting = f.connection.connect()
  const stopped = f.connection.disconnect()
  assert.equal(await connecting, false)
  await stopped
  assert.deepEqual(f.events, ['disconnect'])
  assert.equal(f.connection.ready, false)
})

test('simultaneous connection attempts share one native connection', async () => {
  const f = fixture()
  const first = f.connection.connect()
  const second = f.connection.connect()
  assert.equal(first, second)
  assert.equal(await first, true)
  assert.deepEqual(f.events, ['connect'])
})

test('a PLC refusal leaves the connection ready and releases the queue', async () => {
  const f = fixture()
  await f.ready()
  const refused = f.connection.runCommand(client => new PlcClockCommands({ client }).setClock(new Date()))
  const rejected = assert.rejects(refused, PlcCommandError)
  await turn()
  f.callbacks.shift()(null, Buffer.from([1]))
  await rejected
  assert.equal(f.connection.ready, true)
  assert.deepEqual(f.events, ['read'])
  const pending = f.connection.runCommand(write)
  await turn()
  f.callbacks.shift()(null)
  assert.equal(await pending, true)
})

test('Daman commands also require the reading client to have fresh data', async () => {
  let dataReady = false
  const f = fixture({ canCommand: () => dataReady })
  await f.ready()
  await assert.rejects(f.connection.runCommand(write), PlcUnavailableError)
  dataReady = true
  const pending = f.connection.runCommand(write)
  await turn()
  f.callbacks.shift()(null)
  await pending
  dataReady = false
  await assert.rejects(f.connection.runCommand(write), PlcUnavailableError)
})

test('a disconnect exception does not wedge subsequent connection attempts', async () => {
  const errors = []
  const f = fixture({ onDisconnectError: error => errors.push(error) })
  await f.ready()
  const failure = new Error('Disconnect failed')
  f.native.Disconnect = () => { throw failure }
  assert.equal(await f.connection.disconnect(), false)
  assert.deepEqual(errors, [failure])
  await f.connection.connect()
  assert.equal(f.connection.connected, true)
})
