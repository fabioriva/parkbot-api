import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import test from 'node:test'
import { createAuthorizer } from '../lib/authorization.js'
import PlcConnection from '../lib/PlcConnection.js'

const state = { session: null, subscription: null, writes: 0, databaseFailure: false }
globalThis.routerAuthTest = {
  state,
  authorize: createAuthorizer({
    getSession: async () => state.session,
    findSubscription: async () => {
      if (state.databaseFailure) throw new Error('Database unavailable')
      return state.subscription
    }
  })
}
const imports = registerHooks({
  resolve (specifier, context, nextResolve) {
    if (context.parentURL?.endsWith('/lib/Router.js')) {
      if (specifier === './auth.js') return { url: 'data:text/javascript,export const authorize = globalThis.routerAuthTest.authorize', shortCircuit: true }
    }
    return nextResolve(specifier, context)
  }
})
const { default: Router } = await import('../lib/Router.js')
imports.deregister()

function routes ({ history = {}, plc, def = {}, obj = {} } = {}) {
  const handlers = new Map()
  const app = {
    get: (path, handler) => handlers.set('get ' + path, handler),
    post: (path, handler) => handlers.set('post ' + path, handler),
    ws () {}
  }
  const driver = plc ?? {
    client: {
      WriteArea (...args) {
        state.writes++
        args.at(-1)(new Error('Unexpected PLC write'))
      },
      ReadArea (...args) {
        throw new Error('Unexpected PLC read')
      }
    }
  }
  // Domain/auth tests use a ready command port; connection lifecycle is tested
  // separately below with the real coordinator.
  const connection = driver.connection ?? { runCommand: operation => operation(driver.client) }
  const router = new Router(app, history, {}, { ...driver, connection })
  router.run({ APS: 'avigail', ...def }, { racks: [], map: { occupancy: [] }, ...obj })
  return handlers
}

async function call (handler, authorization = 'Bearer test', body = '{}') {
  const res = {
    onAborted (fn) { this.abort = fn },
    onData (fn) { queueMicrotask(() => fn(Buffer.from(body), true)) },
    cork (fn) { fn() },
    writeStatus (status) { this.status = status; return this },
    writeHeader () { return this },
    end (body, closeConnection) { this.body = JSON.parse(body); this.closeConnection = closeConnection; return this }
  }
  const req = {
    getHeader: key => key === 'authorization' ? authorization : '',
    getMethod: () => 'post',
    getUrl: () => '/test',
    getQuery: () => '',
    getParameter: () => '0',
    forEach: fn => fn('authorization', authorization)
  }
  await handler(res, req)
  return res
}

test('every mutation denies unassigned sessions before PLC or notification writes', async () => {
  state.session = { user: { email: 'user@example.test', emailVerified: true, role: 'admin' } }
  state.subscription = { aps: [], role: 'admin' }
  for (const [path, handler] of routes()) {
    if (path.startsWith('post ') || path.endsWith('/set-now')) {
      const res = await call(handler)
      assert.equal(res.status, '403 Forbidden', path)
    }
  }
  assert.equal(state.writes, 0)
})

test('HTTP routes distinguish missing credentials, forbidden operations and server failure', async () => {
  const handlers = routes()
  const map = handlers.get('get /api/aps/avigail/map')
  const denied = await call(map, '')
  assert.equal(denied.status, '401 Unauthorized')
  state.session = null
  assert.equal((await call(map)).status, '401 Unauthorized')
  state.session = { user: { email: 'user@example.test', emailVerified: true, role: 'admin' } }
  state.subscription = { aps: ['avigail'], role: 'valet' }
  assert.equal((await call(map)).status, '200 OK')
  for (const path of ['/operation/entry', '/operation/pp', '/map/edit', '/card/edit']) {
    assert.equal((await call(handlers.get('post /api/aps/avigail' + path))).status, '403 Forbidden', path)
  }
  assert.equal(state.writes, 0)
  state.databaseFailure = true
  assert.equal((await call(map)).status, '500 Internal Server Error')
  state.databaseFailure = false
})

test('malformed and oversized JSON produce 400 and 413 without PLC writes', async () => {
  state.session = { user: { email: 'user@example.test', emailVerified: true, role: 'admin' } }
  state.subscription = { aps: ['avigail'], role: 'admin' }
  state.databaseFailure = false
  state.writes = 0
  const handler = routes().get('post /api/aps/avigail/map/edit')
  const malformed = await call(handler, 'Bearer test', '{')
  assert.equal(malformed.status, '400 Bad Request')
  assert.deepEqual(malformed.body, { error: 'Invalid JSON' })
  const oversized = await call(handler, 'Bearer test', 'x'.repeat(64 * 1024 + 1))
  assert.equal(oversized.status, '413 Payload Too Large')
  assert.equal(oversized.closeConnection, true)
  assert.equal(state.writes, 0)
})

test('a missing rack returns a JSON 404 instead of a successful empty response', async () => {
  state.session = { user: { email: 'user@example.test', emailVerified: true, role: 'admin' } }
  state.subscription = { aps: ['avigail'], role: 'admin' }
  const res = await call(routes().get('get /api/aps/avigail/racks/:id'))
  assert.equal(res.status, '404 Not Found')
  assert.deepEqual(res.body, { error: 'Rack not found' })
})

test('authorized commands return 503 while disconnected or loading without native writes or audit', async () => {
  state.session = { user: { email: 'user@example.test', emailVerified: true, role: 'admin' } }
  state.subscription = { aps: ['avigail'], role: 'admin' }
  let writes = 0
  let audits = 0
  const connection = new PlcConnection({
    ConnectTo: (...args) => args.at(-1)(null),
    ReadArea () { throw new Error('Unexpected native read') },
    WriteArea () { writes++ }
  })
  const handlers = routes({
    plc: { connection, client: connection.client },
    def: { CARDS: 500, REQ_0: { area: 0x84, dbNumber: 6, start: 398, amount: 2, wordLen: 2 } },
    obj: { stalls: [{ status: 123 }] },
    history: { saveAction: async () => { audits++ } }
  })
  for (const stage of ['disconnected', 'loading']) {
    if (stage === 'loading') await connection.connectTo('simulated', 0, 1)
    const exit = await call(handlers.get('post /api/aps/avigail/operation/exit'), 'Bearer test', '{"card":123}')
    assert.equal(exit.status, '503 Service Unavailable', stage)
    const clock = await call(handlers.get('get /api/aps/avigail/set-now'))
    assert.equal(clock.status, '503 Service Unavailable', stage)
  }
  assert.equal(writes, 0)
  assert.equal(audits, 0)
})

test('exit route preserves authorization, PLC encoding, audit and response', async () => {
  state.session = { user: { email: 'user@example.test', emailVerified: true } }
  state.databaseFailure = false
  const events = []
  const handler = routes({
    def: { CARDS: 500, REQ_0: { area: 0x84, dbNumber: 6, start: 398, amount: 2, wordLen: 2 } },
    obj: { stalls: [{ status: 123 }], plcDTL: 1700000000000 },
    plc: {
      client: {
        WriteArea (area, dbNumber, start, amount, wordLen, buffer, callback) {
          events.push('write')
          assert.deepEqual([area, dbNumber, start, amount, wordLen], [0x84, 6, 398, 2, 2])
          assert.deepEqual(buffer, Buffer.from([0, 123]))
          callback(null)
        }
      }
    },
    history: {
      async saveAction (action) {
        events.push('audit')
        assert.deepEqual(action, {
          card: 123, date: 1700000000000, operation: 10, stall: 0, user: 'user@example.test'
        })
      }
    }
  }).get('post /api/aps/avigail/operation/exit')

  state.subscription = { aps: [], role: 'valet' }
  assert.equal((await call(handler, 'Bearer test', '{"card":123}')).status, '403 Forbidden')
  assert.deepEqual(events, [])

  state.subscription = { aps: ['avigail'], role: 'valet' }
  const invalid = await call(handler, 'Bearer test', '{"card":124}')
  assert.deepEqual(invalid.body, { severity: 'warning', message: 'Card not found' })
  assert.deepEqual(events, [])
  const sent = await call(handler, 'Bearer test', '{"card":123}')
  assert.equal(sent.status, '200 OK')
  assert.deepEqual(sent.body, { severity: 'success', message: 'Sent request for card 123' })
  assert.deepEqual(events, ['write', 'audit'])
})

test('clock route authorizes before I/O and responds only after PLC confirmation', async t => {
  t.mock.method(console, 'log', () => {})
  state.session = { user: { email: 'user@example.test', emailVerified: true } }
  state.databaseFailure = false
  const events = []
  let finishConfirmation
  let pendingFlag = 0
  const handler = routes({
    plc: {
      client: {
        ReadArea (area, dbNumber, start, amount, wordLen, callback) {
          events.push(['read', start])
          assert.deepEqual([area, dbNumber, wordLen], [0x84, 6, 2])
          if (start === 30) {
            assert.equal(amount, 1)
            callback(null, Buffer.from([pendingFlag]))
          } else {
            assert.equal(start, 28)
            assert.equal(amount, 3)
            finishConfirmation = callback
          }
        },
        WriteArea (area, dbNumber, start, amount, wordLen, buffer, callback) {
          events.push(['write', start, Buffer.from(buffer)])
          assert.deepEqual([area, dbNumber, wordLen], [0x84, 6, 2])
          assert.equal(amount, start === 16 ? 12 : 1)
          callback(null)
        }
      }
    }
  }).get('get /api/aps/avigail/set-now')
  for (const subscription of [{ aps: [], role: 'service' }, { aps: ['avigail'], role: 'valet' }]) {
    state.subscription = subscription
    assert.equal((await call(handler)).status, '403 Forbidden')
    assert.deepEqual(events, [])
  }
  state.subscription = { aps: ['avigail'], role: 'service' }
  let completed = false
  const pending = call(handler).then(response => { completed = true; return response })
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(completed, false)
  assert.deepEqual(events.map(event => event.slice(0, 2)), [
    ['read', 30], ['write', 16], ['write', 30], ['read', 28]
  ])
  finishConfirmation(null, Buffer.alloc(3))
  const response = await pending
  assert.equal(response.status, '200 OK')
  const now = new Date(response.body.now)
  assert.ok(Number.isFinite(now.getTime()))
  assert.deepEqual(Object.keys(response.body), ['now'])
  assert.equal(events[1][2].readUInt16BE(0), now.getUTCFullYear())
  assert.equal(events[1][2][5], now.getUTCHours())
  assert.deepEqual(events[2][2], Buffer.from([1]))

  events.length = 0
  pendingFlag = 1
  const rejected = await call(handler)
  assert.equal(rejected.status, '500 Internal Server Error')
  assert.deepEqual(rejected.body, { error: 'Internal server error' })
  assert.deepEqual(events, [['read', 30]])
})

test('PP route preserves authorization, encoding, audit, response and failures', async () => {
  state.session = { user: { email: 'user@example.test', emailVerified: true } }
  state.databaseFailure = false
  const events = []
  let writeError = null
  let auditError = null
  const handler = routes({
    def: { REQ_PP: { area: 0x84, dbNumber: 6, start: 410, amount: 4, wordLen: 2 } },
    obj: {
      plcDTL: 1700000000000,
      devices: [{
        id: 2,
        d: [{
          key: 'action-pp',
          device: 2,
          min: 1,
          max: 500,
          enable: { status: 1 },
          buttons: [{ key: 'E', value: '0' }]
        }]
      }]
    },
    plc: {
      client: {
        WriteArea (area, dbNumber, start, amount, wordLen, buffer, callback) {
          events.push('write')
          assert.deepEqual([area, dbNumber, start, amount, wordLen], [0x84, 6, 410, 4, 2])
          assert.deepEqual(buffer, Buffer.from([1, 0x23, 14, 2]))
          callback(writeError)
        }
      }
    },
    history: {
      async saveAction (action) {
        events.push('audit')
        assert.deepEqual(action, {
          card: 0, date: 1700000000000, operation: 12, stall: 0, user: 'user@example.test'
        })
        if (auditError) throw auditError
      }
    }
  }).get('post /api/aps/avigail/operation/pp')
  const body = '{"device":2,"key":"E","value":291}'
  for (const subscription of [{ aps: [], role: 'service' }, { aps: ['avigail'], role: 'valet' }]) {
    state.subscription = subscription
    assert.equal((await call(handler, 'Bearer test', body)).status, '403 Forbidden')
    assert.deepEqual(events, [])
  }
  state.subscription = { aps: ['avigail'], role: 'service' }
  const sent = await call(handler, 'Bearer test', body)
  assert.equal(sent.status, '200 OK')
  assert.deepEqual(sent.body, { severity: 'success', message: 'Sent PP request 291 + E' })
  assert.deepEqual(events, ['write', 'audit'])

  events.length = 0
  const invalid = await call(handler, 'Bearer test', '{"device":2,"key":"E","value":65536}')
  assert.equal(invalid.status, '200 OK')
  assert.deepEqual(invalid.body, { severity: 'warning', message: 'Parameters not valid' })
  assert.deepEqual(events, [])

  const unknown = await call(handler, 'Bearer test', '{"device":2,"key":"B","value":1}')
  assert.equal(unknown.status, '200 OK')
  assert.deepEqual(unknown.body, { severity: 'warning', message: 'PP command not configured' })
  assert.deepEqual(events, [])

  writeError = new Error('PLC unavailable')
  assert.equal((await call(handler, 'Bearer test', body)).status, '500 Internal Server Error')
  assert.deepEqual(events, ['write'])
  events.length = 0
  writeError = null
  auditError = new Error('MongoDB unavailable')
  assert.equal((await call(handler, 'Bearer test', body)).status, '500 Internal Server Error')
  assert.deepEqual(events, ['write', 'audit'])
})

test('PIN route preserves permission, sentinel encoding, audit and error responses', async () => {
  state.session = { user: { email: 'user@example.test', emailVerified: true } }
  state.databaseFailure = false
  const events = []
  let writeError = null
  let auditError = null
  const handler = routes({
    def: { CARDS: 500, CARD_EDIT: { area: 0x84, dbNumber: 6, start: 386, amount: 4, wordLen: 2 } },
    obj: { plcDTL: 1700000000000 },
    plc: {
      client: {
        WriteArea (area, dbNumber, start, amount, wordLen, buffer, callback) {
          events.push('write')
          assert.deepEqual([area, dbNumber, start, amount, wordLen], [0x84, 6, 386, 4, 2])
          assert.deepEqual(buffer, Buffer.from([0, 123, 255, 255]))
          callback(writeError)
        }
      }
    },
    history: {
      async saveAction (action) {
        events.push('audit')
        assert.deepEqual(action, {
          card: 123, date: 1700000000000, operation: 4, stall: 0, user: 'user@example.test'
        })
        if (auditError) throw auditError
      }
    }
  }).get('post /api/aps/avigail/card/edit')
  const body = '{"card":123,"code":-1}'
  for (const subscription of [{ aps: [], role: 'service' }, { aps: ['avigail'], role: 'valet' }]) {
    state.subscription = subscription
    assert.equal((await call(handler, 'Bearer test', body)).status, '403 Forbidden')
    assert.deepEqual(events, [])
  }
  state.subscription = { aps: ['avigail'], role: 'service' }
  const invalid = await call(handler, 'Bearer test', '{"card":123,"code":"-1"}')
  assert.equal(invalid.status, '200 OK')
  assert.deepEqual(invalid.body, { severity: 'warning', message: 'PIN code regexp is not valid' })
  assert.deepEqual(events, [])
  const updated = await call(handler, 'Bearer test', body)
  assert.equal(updated.status, '200 OK')
  assert.deepEqual(updated.body, { severity: 'success', message: 'Updated card 123' })
  assert.deepEqual(events, ['write', 'audit'])

  events.length = 0
  writeError = new Error('PLC unavailable')
  assert.equal((await call(handler, 'Bearer test', body)).status, '500 Internal Server Error')
  assert.deepEqual(events, ['write'])
  events.length = 0
  writeError = null
  auditError = new Error('MongoDB unavailable')
  assert.equal((await call(handler, 'Bearer test', body)).status, '500 Internal Server Error')
  assert.deepEqual(events, ['write', 'audit'])
})

test('stall route preserves authorization, warnings, signed encoding and audit', async () => {
  state.session = { user: { email: 'user@example.test', emailVerified: true } }
  state.databaseFailure = false
  const events = []
  const handler = routes({
    def: {
      STALLS: 10,
      CARDS: 500,
      STALL_STATUS: { FREE: 0, LOCK: -1 },
      MAP_EDIT: { area: 0x84, dbNumber: 6, start: 390, amount: 4, wordLen: 2 }
    },
    obj: { stalls: [{ nr: 1, status: 123 }], plcDTL: 1700000000000 },
    plc: {
      client: {
        WriteArea (area, dbNumber, start, amount, wordLen, buffer, callback) {
          events.push('write')
          assert.deepEqual([area, dbNumber, start, amount, wordLen], [0x84, 6, 390, 4, 2])
          assert.deepEqual(buffer, Buffer.from([0, 2, 255, 255]))
          callback(null)
        }
      }
    },
    history: {
      async saveAction (action) {
        events.push('audit')
        assert.deepEqual(action, {
          card: -1, date: 1700000000000, operation: 5, stall: 2, user: 'user@example.test'
        })
      }
    }
  }).get('post /api/aps/avigail/map/edit')
  const body = '{"stall":2,"card":-1}'
  for (const subscription of [{ aps: [], role: 'service' }, { aps: ['avigail'], role: 'valet' }]) {
    state.subscription = subscription
    assert.equal((await call(handler, 'Bearer test', body)).status, '403 Forbidden')
    assert.deepEqual(events, [])
  }
  state.subscription = { aps: ['avigail'], role: 'service' }
  const duplicate = await call(handler, 'Bearer test', '{"stall":2,"card":123}')
  assert.equal(duplicate.status, '200 OK')
  assert.deepEqual(duplicate.body, { severity: 'warning', message: 'Card in use' })
  assert.deepEqual(events, [])
  const updated = await call(handler, 'Bearer test', body)
  assert.equal(updated.status, '200 OK')
  assert.deepEqual(updated.body, { severity: 'success', message: 'Updated stall 2' })
  assert.deepEqual(events, ['write', 'audit'])
})

test('queue route rejects stale selections without writes and preserves permissions and response', async () => {
  state.session = { user: { email: 'user@example.test', emailVerified: true } }
  state.databaseFailure = false
  const events = []
  const obj = { queue: [{ id: 1, card: 122 }, { id: 2, card: 123 }, { id: 3, card: 0 }], plcDTL: 1700000000000 }
  const handler = routes({
    def: { QUEUE_DELETE: { area: 0x84, dbNumber: 6, start: 394, amount: 4, wordLen: 2 } },
    obj,
    plc: {
      client: {
        WriteArea (area, dbNumber, start, amount, wordLen, buffer, callback) {
          events.push('write')
          assert.deepEqual([area, dbNumber, start, amount, wordLen], [0x84, 6, 394, 4, 2])
          assert.deepEqual(buffer, Buffer.from([0, 2, 0, 123]))
          callback(null)
        }
      }
    },
    history: {
      async saveAction (action) {
        events.push('audit')
        assert.deepEqual(action, {
          card: 123, date: 1700000000000, operation: 13, stall: 0, user: 'user@example.test'
        })
      }
    }
  }).get('post /api/aps/avigail/queue/delete')
  const body = '{"index":2,"card":123}'
  state.subscription = { aps: [], role: 'valet' }
  assert.equal((await call(handler, 'Bearer test', body)).status, '403 Forbidden')
  assert.deepEqual(events, [])

  state.subscription = { aps: ['avigail'], role: 'valet' }
  obj.queue[1].card = 124
  const stale = await call(handler, 'Bearer test', body)
  assert.equal(stale.status, '200 OK')
  assert.deepEqual(stale.body, { severity: 'warning', message: 'Queue changed, refresh and try again' })
  assert.deepEqual(events, [])
  obj.queue[1].card = 123
  const sent = await call(handler, 'Bearer test', body)
  assert.equal(sent.status, '200 OK')
  assert.deepEqual(sent.body, { severity: 'success', message: 'Deleted card 123' })
  assert.deepEqual(events, ['write', 'audit'])
})

for (const [command, operation, start] of [['entry', 11, 400], ['rollback', 12, 404]]) {
  test(`${command} route preserves permissions, protocol, audit and error mapping`, async () => {
    state.session = { user: { email: 'user@example.test', emailVerified: true } }
    state.databaseFailure = false
    const events = []
    let writeError
    let auditError = null
    const handler = routes({
      def: {
        CARDS: 500,
        MAX_ENTRY: 2,
        REQ_ENTRY: { area: 0x84, dbNumber: 6, start: 400, amount: 4, wordLen: 2 },
        REQ_ROLLBACK: { area: 0x84, dbNumber: 6, start: 404, amount: 4, wordLen: 2 }
      },
      obj: { stalls: [{ status: 123 }], plcDTL: 1700000000000 },
      plc: {
        client: {
          WriteArea (area, dbNumber, offset, amount, wordLen, buffer, callback) {
            events.push('write')
            assert.deepEqual([area, dbNumber, offset, amount, wordLen], [0x84, 6, start, 4, 2])
            assert.deepEqual(buffer, Buffer.from([0, 2, 0, 124]))
            callback(writeError)
          }
        }
      },
      history: {
        async saveAction (action) {
          events.push('audit')
          assert.deepEqual(action, {
            card: 124, date: 1700000000000, operation, stall: 0, user: 'user@example.test'
          })
          if (auditError) throw auditError
        }
      }
    }).get('post /api/aps/avigail/operation/' + command)
    const body = '{"card":124,"entry":2}'

    state.subscription = { aps: [], role: 'service' }
    assert.equal((await call(handler, 'Bearer test', body)).status, '403 Forbidden')
    assert.deepEqual(events, [])
    state.subscription = { aps: ['avigail'], role: 'valet' }
    if (command === 'entry') {
      assert.equal((await call(handler, 'Bearer test', body)).status, '403 Forbidden')
      assert.deepEqual(events, [])
      state.subscription.role = 'service'
    }

    const invalid = await call(handler, 'Bearer test', '{"card":123,"entry":2}')
    assert.deepEqual(invalid.body, { severity: 'warning', message: 'Card in use' })
    assert.deepEqual(events, [])
    const sent = await call(handler, 'Bearer test', body)
    assert.equal(sent.status, '200 OK')
    assert.deepEqual(sent.body, { severity: 'success', message: 'Sent request for card 124' })
    assert.deepEqual(events, ['write', 'audit'])

    events.length = 0
    writeError = new Error('PLC unavailable')
    const failedWrite = await call(handler, 'Bearer test', body)
    assert.equal(failedWrite.status, '500 Internal Server Error')
    assert.deepEqual(failedWrite.body, { error: 'Internal server error' })
    assert.deepEqual(events, ['write'])

    events.length = 0
    writeError = null
    auditError = new Error('MongoDB unavailable')
    const failedAudit = await call(handler, 'Bearer test', body)
    assert.equal(failedAudit.status, '500 Internal Server Error')
    assert.deepEqual(failedAudit.body, { error: 'Internal server error' })
    assert.deepEqual(events, ['write', 'audit'])
  })
}
