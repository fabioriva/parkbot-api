import assert from 'node:assert/strict'
import test from 'node:test'
import PpOperations, { PpRequestError } from '../lib/PpOperations.js'
import { ActionPP } from '../models/Action.js'
import device1 from '../aps/il/bugrashov/device1.js'
import device5 from '../aps/il/bugrashov/device5.js'
import PlcPpCommands from '../lib/PlcPpCommands.js'

function fixture ({ writeError, auditError } = {}) {
  const events = []
  const obj = {
    plcDTL: 1700000000000,
    devices: [{
      id: 2,
      d: [
        new ActionPP('action-pp', { status: 1 }, 2, 1, 500, [
          { key: 'B', value: '1' }, { key: 'B', value: '2' },
          { key: 'D', value: '0' }, { key: 'E', value: '0' }, { key: 'F', value: '0' }
        ]),
        new ActionPP('action-pp-reset', { status: true }, 2, 1, 500, [{ key: 'A', value: '0' }])
      ]
    }]
  }
  const plc = new PlcPpCommands({
    def: { REQ_PP: { area: 0x84, dbNumber: 7, start: 410, amount: 4, wordLen: 2 } },
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
  return { pp: new PpOperations({ obj, plc, history }), obj, events }
}

test('PP buttons preserve hexadecimal key encoding, field order and audit', async () => {
  for (const [key, byte] of [['A', 10], ['B', 11], ['D', 13], ['E', 14], ['F', 15]]) {
    const { pp, obj, events } = fixture()
    obj.plcDTL++
    const value = key === 'A' ? 0 : key === 'B' ? 2 : 0x0123
    assert.deepEqual(await pp.requestPp({ device: 2, key, value, user: 'operator' }), {
      key, value, written: true
    })
    assert.deepEqual(events, [
      ['write', 0x84, 7, 410, 4, 2, Buffer.from([value >> 8, value & 255, byte, 2])],
      ['audit', { card: 0, date: obj.plcDTL, operation: 12, stall: 0, user: 'operator' }]
    ])
  }
})

test('numeric strings and lowercase keys normalize before matching and encoding', async () => {
  const { pp, events } = fixture()
  assert.deepEqual(await pp.requestPp({ device: '2', key: 'e', value: '291' }), {
    key: 'E', value: 291, written: true
  })
  assert.deepEqual(events[0].at(-1), Buffer.from([1, 0x23, 14, 2]))
})

test('values outside binary field ranges fail before PLC write or audit', async () => {
  for (const request of [
    { device: -1, key: 'A', value: 1 }, { device: 256, key: 'A', value: 1 },
    { device: 1, key: '100', value: 1 }, { device: 1, key: 'A', value: -1 },
    { device: 1, key: 'A', value: 65536 }
  ]) {
    const { pp, events } = fixture()
    await assert.rejects(pp.requestPp(request), PpRequestError)
    assert.deepEqual(events, [])
  }
})

test('PLC failures skip audit; audit failures propagate without repeating the write', async () => {
  const request = { device: 2, key: 'E', value: 291 }
  const writeError = new Error('PLC unavailable')
  const failedWrite = fixture({ writeError })
  await assert.rejects(failedWrite.pp.requestPp(request), error => error === writeError)
  assert.deepEqual(failedWrite.events.map(event => event[0]), ['write'])

  const auditError = new Error('MongoDB unavailable')
  const failedAudit = fixture({ auditError })
  await assert.rejects(failedAudit.pp.requestPp(request), error => error === auditError)
  assert.deepEqual(failedAudit.events.map(event => event[0]), ['write', 'audit'])
})

test('unknown commands and invalid fixed values or destinations have no side effects', async () => {
  for (const request of [
    { device: 99, key: 'E', value: 1 }, { device: 2, key: 'B', value: 3 },
    { device: 2, key: 'A', value: 1 }, { device: 2, key: 'E', value: 0 },
    { device: 2, key: 'E', value: 501 }
  ]) {
    const { pp, events } = fixture()
    await assert.rejects(pp.requestPp(request), { message: 'PP command not configured' })
    assert.deepEqual(events, [])
  }
  for (const field of ['device', 'value']) {
    for (const value of [null, undefined, true, '', ' ', '2abc', '0x02', 2.5, '2.5']) {
      const { pp, events } = fixture()
      await assert.rejects(pp.requestPp({ device: 2, key: 'E', value: 2, [field]: value }), {
        message: 'Parameters not valid'
      })
      assert.deepEqual(events, [])
    }
  }
})

test('fixed buttons match both key and configured value, independently of destination limits', async () => {
  for (const [key, value] of [['B', 1], ['B', 2], ['A', 0], ['E', 1], ['F', 500]]) {
    const { pp } = fixture()
    assert.equal((await pp.requestPp({ device: 2, key, value })).written, true)
  }
})

test('reset uses its own enable bit and latest state; disabled or missing bits reject', async () => {
  const { pp, obj, events } = fixture()
  const [normal, reset] = obj.devices[0].d
  normal.enable.status = 0
  await assert.rejects(pp.requestPp({ device: 2, key: 'E', value: 1 }), { message: 'PP command not enabled' })
  assert.deepEqual(events, [])
  assert.equal((await pp.requestPp({ device: 2, key: 'A', value: 0 })).written, true)
  for (const enable of [{ status: 0 }, { status: false }, undefined, { status: '1' }]) {
    reset.enable = enable
    events.length = 0
    await assert.rejects(pp.requestPp({ device: 2, key: 'A', value: 0 }), { message: 'PP command not enabled' })
    assert.deepEqual(events, [])
  }
  obj.devices = []
  await assert.rejects(pp.requestPp({ device: 2, key: 'A', value: 0 }), { message: 'PP command not configured' })
})

test('Bugrashov definitions support repeated B keys, reset and variable destinations', async () => {
  const { pp, obj, events } = fixture()
  // Clone the definitions to avoid mutating shared PLC bit objects in the installation.
  obj.devices = structuredClone([device1.device, device5.device])
  for (const device of obj.devices) {
    for (const action of device.d) action.enable = { status: 1 }
  }
  for (const value of [1, 2, 3, 4, 5]) {
    assert.equal((await pp.requestPp({ device: 1, key: 'B', value })).written, true)
  }
  assert.equal((await pp.requestPp({ device: 1, key: 'F', value: 7 })).written, true)
  const shuttle = obj.devices.find(device => device.id === 5)
  const action = shuttle.d.find(action => action.key === 'action-pp')
  assert.equal((await pp.requestPp({ device: 5, key: 'D', value: action.max })).written, true)
  assert.equal((await pp.requestPp({ device: 5, key: 'E', value: action.min })).written, true)
  action.enable.status = 0
  assert.equal((await pp.requestPp({ device: 5, key: 'A', value: 0 })).written, true)
  events.length = 0
  await assert.rejects(pp.requestPp({ device: 1, key: 'B', value: 6 }), { message: 'PP command not configured' })
  await assert.rejects(pp.requestPp({ device: 5, key: 'F', value: 1 }), { message: 'PP command not configured' })
  assert.deepEqual(events, [])
})
