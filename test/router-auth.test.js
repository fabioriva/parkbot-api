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

async function call (handler, authorization = 'Bearer test') {
  const res = {
    onAborted (fn) { this.abort = fn },
    onData (fn) { queueMicrotask(() => fn(Buffer.from('{}'), true)) },
    cork (fn) { fn() },
    writeStatus (status) { this.status = status; return this },
    writeHeader () { return this },
    end (body) { this.body = JSON.parse(body); return this }
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
