import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import test from 'node:test'
import { memoryAdapter } from 'better-auth/adapters/memory'
import { serializeSignedCookie } from 'better-call'
import { AuthorizationError } from '../lib/authorization.js'
import { authenticatedWebSocket } from '../lib/websocket-auth.js'

// Exercise the real lib/auth.js and Better Auth. Only MongoDB storage is replaced.
const database = { user: [], session: [], account: [], verification: [] }
const state = { subscription: null }
const db = {
  collection: () => ({
    find: () => ({ limit: () => ({ toArray: async () => state.subscription ? [state.subscription] : [] }) })
  })
}
globalThis.betterAuthSessionTest = { database, memoryAdapter, db }
const hooks = registerHooks({
  resolve (specifier, context, nextResolve) {
    if (context.parentURL?.endsWith('/lib/auth.js')) {
      if (specifier === 'mongodb') {
        return { url: 'data:text/javascript,export class MongoClient { db() { return globalThis.betterAuthSessionTest.db } }', shortCircuit: true }
      }
      if (specifier === 'better-auth/adapters/mongodb') {
        return { url: 'data:text/javascript,export const mongodbAdapter = () => globalThis.betterAuthSessionTest.memoryAdapter(globalThis.betterAuthSessionTest.database)', shortCircuit: true }
      }
    }
    return nextResolve(specifier, context)
  }
})
const secret = 'isolated-session-test-secret-at-least-32-characters'
process.env.BETTER_AUTH_SECRET = secret
process.env.BETTER_AUTH_URL = 'https://sotefinservice.com'
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/unused-test-only'
process.env.TWO_FACTOR = 'disabled'
const { auth, checkAuth, authorize } = await import('../lib/auth.js')
hooks.deregister()

function seedSession () {
  const now = new Date()
  database.user = [{ id: 'test-user', email: 'session@example.test', name: 'Session test', emailVerified: true, twoFactorEnabled: true, createdAt: now, updatedAt: now }]
  database.session = [{ id: 'test-session', token: 'session-test-token', userId: 'test-user', createdAt: now, updatedAt: now, expiresAt: new Date(Date.now() + 60_000) }]
  state.subscription = { email: 'session@example.test', aps: ['daman-n'], role: 'valet' }
  return { authorization: 'Bearer session-test-token' }
}

test('real Better Auth accepts bearer and signed cookies and rejects tampered credentials', async () => {
  const headers = seedSession()
  const session = await checkAuth(headers)
  assert.equal(session.user.email, 'session@example.test')
  const { authCookies } = await auth.$context
  const cookie = await serializeSignedCookie(authCookies.sessionToken.name, 'session-test-token', secret)
  assert.ok(await checkAuth({ cookie: cookie.split(';')[0] }))
  const tampered = await serializeSignedCookie(authCookies.sessionToken.name, 'session-test-token', 'a-different-session-test-secret-with-32-characters')
  assert.equal(await checkAuth({ cookie: tampered.split(';')[0] }), null)
  assert.equal(await checkAuth({ authorization: 'Bearer nonexistent-token' }), null)
  assert.equal(await checkAuth({}), null)
  database.session[0].expiresAt = new Date(Date.now() - 1000)
  assert.equal(await checkAuth(headers), null)
})

test('real sessions enforce live subscriptions and session revocation', async () => {
  const headers = seedSession()
  assert.equal((await authorize(headers, 'daman-n', 'exit')).user.role, 'valet')
  await assert.rejects(authorize(headers, 'daman-n', 'entry'), error => error instanceof AuthorizationError && error.status === 403)
  state.subscription.role = 'service'
  await authorize(headers, 'daman-n', 'entry')
  state.subscription.aps = []
  await assert.rejects(authorize(headers, 'daman-n', 'exit'), error => error.status === 403)
  state.subscription = null
  await assert.rejects(authorize(headers, 'daman-n', 'exit'), error => error.status === 403)
  database.session = []
  await assert.rejects(authorize(headers, 'daman-n', 'exit'), error => error.status === 401)
})

test('WebSocket protocol authentication uses real sessions and closes after revocation', async t => {
  seedSession()
  const timers = []
  t.mock.method(globalThis, 'setTimeout', (fn) => { timers.push(fn); return { unref () {} } })
  t.mock.method(globalThis, 'clearTimeout', () => {})
  const behavior = authenticatedWebSocket({ authorize, aps: 'daman-n', permission: 'read', topic: 'aps/info' })
  const headers = { origin: 'https://sotefinservice.com', 'sec-websocket-protocol': 'parkbot, parkbot-session.session-test-token' }
  const req = { forEach: fn => Object.entries(headers).forEach(([key, value]) => fn(key, value)), getHeader: key => headers[key] || '' }
  const res = {
    onAborted () {},
    cork (fn) { fn() },
    writeStatus (status) { this.status = status; return this },
    end () {},
    upgrade (data, key, protocol) { this.data = data; this.protocol = protocol }
  }
  await behavior.upgrade(res, req, {})
  assert.ok(res.data)
  assert.equal(res.protocol, 'parkbot')
  const ws = { getUserData: () => res.data, subscribe: t.mock.fn(), end: t.mock.fn() }
  behavior.open(ws)
  assert.equal(ws.subscribe.mock.calls[0].arguments[0], 'aps/info')
  database.session = []
  await timers.shift()()
  assert.equal(ws.end.mock.calls[0].arguments[0], 1008)
  behavior.close(ws)
})
