import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import test from 'node:test'

const errors = []
globalThis.damanPlcwTestLogger = { info () {}, error: (...args) => errors.push(args) }
const hooks = registerHooks({
  resolve (specifier, context, nextResolve) {
    if (context.parentURL?.endsWith('/aps/ae/daman/PlcW.js')) {
      if (specifier === 'node-snap7') return { url: 'data:text/javascript,export default { S7Client: class {} }', shortCircuit: true }
      if (specifier === 'pino') return { url: 'data:text/javascript,export default () => globalThis.damanPlcwTestLogger', shortCircuit: true }
    }
    return nextResolve(specifier, context)
  }
})
const { default: PLC } = await import('../aps/ae/daman/PlcW.js')
hooks.deregister()

const def = {
  PLC: { ip: '127.0.0.1', rack: 0, slot: 1, polling_time: 750 },
  DATA_READ: { area: 0x84, dbNumber: 6, start: 0, amount: 4, wordLen: 0x02 }
}

function setup (t) {
  const timers = []
  t.mock.method(globalThis, 'setTimeout', (callback, delay) => {
    assert.equal(delay, def.PLC.polling_time)
    timers.push(callback)
    return timers.length
  })
  errors.length = 0
  const plc = new PLC()
  plc.client = {
    ConnectTo: () => true,
    Connect: () => true,
    Disconnect: () => true,
    ErrorText: code => `PLC error ${code}`
  }
  return { plc, timers }
}

test('Daman schedules the next poll only after the current native read completes', async t => {
  const { plc, timers } = setup(t)
  let complete
  let reads = 0
  plc.client.ReadArea = (...args) => {
    assert.deepEqual(args.slice(0, -1), [0x84, 6, 0, 4, 0x02])
    reads++
    complete = args.at(-1)
  }
  await plc.run(def, {})
  assert.equal(timers.length, 1)

  for (let cycle = 1; cycle <= 2; cycle++) {
    const pending = timers.shift()()
    assert.equal(reads, cycle)
    assert.equal(timers.length, 0, 'No further poll can start while the read is pending')
    await Promise.resolve()
    assert.equal(timers.length, 0)
    complete(null, Buffer.alloc(4))
    await pending
    assert.equal(timers.length, 1)
  }
})

test('a failed read disconnects and retries before issuing another read', async t => {
  const { plc, timers } = setup(t)
  let disconnects = 0
  let connects = 0
  let reads = 0
  plc.client.Disconnect = () => { disconnects++; return true }
  plc.client.Connect = () => { connects++; return true }
  plc.client.ReadArea = (...args) => { reads++; args.at(-1)(12345) }
  await plc.run(def, {})
  await timers.shift()()
  assert.equal(plc.online, false)
  assert.equal(disconnects, 1)
  assert.equal(reads, 1)
  assert.equal(errors[0][0].code, 12345)
  assert.equal(timers.length, 1)

  await timers.shift()()
  assert.equal(plc.online, true)
  assert.equal(connects, 1)
  assert.equal(reads, 1)
  assert.equal(timers.length, 1)
})

test('a reconnection exception leaves the polling loop running', async t => {
  const { plc, timers } = setup(t)
  const failure = new Error('Connection failed')
  plc.client.Connect = () => { throw failure }
  plc.forever(def, {})
  await timers.shift()()
  assert.equal(plc.online, false)
  assert.equal(errors[0][0], failure)
  assert.equal(timers.length, 1)

  plc.client.Connect = () => true
  await timers.shift()()
  assert.equal(plc.online, true)
  assert.equal(timers.length, 1)
})

test('initial connection and disconnect exceptions still allow a later retry', async t => {
  const { plc, timers } = setup(t)
  const connectFailure = new Error('Initial connection failed')
  const disconnectFailure = new Error('Disconnect failed')
  plc.client.ConnectTo = () => { throw connectFailure }
  plc.client.Disconnect = () => { throw disconnectFailure }
  await plc.run(def, {})
  assert.equal(plc.online, false)
  assert.equal(errors[0][0].err, disconnectFailure)
  assert.equal(errors[1][0], connectFailure)
  assert.equal(timers.length, 1)

  await timers.shift()()
  assert.equal(plc.online, true)
  assert.equal(timers.length, 1)
})
