import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import test from 'node:test'
import { createAuthorizer } from '../lib/authorization.js'

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
      if (specifier === './utils7.js') return { url: 'data:text/javascript,export async function WriteArea() { globalThis.routerAuthTest.state.writes++; return true }; export async function ReadArea() { return Buffer.from([0]) }', shortCircuit: true }
    }
    return nextResolve(specifier, context)
  }
})
const { default: Router } = await import('../lib/Router.js')
imports.deregister()

function routes () {
  const handlers = new Map()
  const app = {
    get: (path, handler) => handlers.set('get ' + path, handler),
    post: (path, handler) => handlers.set('post ' + path, handler),
    ws () {}
  }
  const router = new Router(app, {}, {}, { client: {} })
  router.run({ APS: 'avigail' }, { racks: [], map: { occupancy: [] } })
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
