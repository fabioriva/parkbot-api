import assert from 'node:assert/strict'
import test from 'node:test'
import { createAuthorizer, AuthorizationError } from '../lib/authorization.js'
import { authenticatedWebSocket } from '../lib/websocket-auth.js'

const validSession = () => ({ user: { email: 'valet@example.test', emailVerified: true, role: 'admin', aps: 'other' }, session: { expiresAt: new Date(Date.now() + 60_000) } })
const denied = (status) => (error) => error instanceof AuthorizationError && error.status === status

test('session, plant assignment and live role are all required', async () => {
  let session = validSession()
  let subscription = { aps: ['avigail'], role: 'valet' }
  const authorize = createAuthorizer({ getSession: async () => session, findSubscription: async () => subscription })
  for (const permission of ['read', 'exit', 'rollback', 'queue.delete']) {
    assert.equal((await authorize({}, 'avigail', permission)).user.role, 'valet')
  }
  for (const permission of ['entry', 'pp', 'pin.edit', 'map.edit', 'technical.read', 'notifications', 'clock.set', 'admin', 'unknown']) {
    await assert.rejects(authorize({}, 'avigail', permission), denied(403))
  }
  await assert.rejects(authorize({}, 'menloa', 'exit'), denied(403))
  subscription.aps = []
  await assert.rejects(authorize({}, 'avigail', 'read'), denied(403))
  subscription = null
  await assert.rejects(authorize({}, 'avigail', 'read'), denied(403))
  subscription = { aps: ['avigail'], role: 'unknown' }
  await assert.rejects(authorize({}, 'avigail', 'read'), denied(403))
  subscription.role = 'service'
  await authorize({}, 'avigail', 'pp')
  session.user.emailVerified = false
  await assert.rejects(authorize({}, 'avigail', 'pp'), denied(403))
  session = null
  await assert.rejects(authorize({}, 'avigail', 'read'), denied(401))
})

test('storage failures are server errors and two-factor policy is enforced', async () => {
  const authorize = createAuthorizer({ getSession: async () => validSession(), findSubscription: async () => { throw new Error('Database unavailable') } })
  await assert.rejects(authorize({}, 'avigail', 'read'), (error) => !(error instanceof AuthorizationError))
  const with2FA = createAuthorizer({ getSession: async () => validSession(), findSubscription: async () => ({ aps: ['avigail'], role: 'admin' }), requireTwoFactor: true })
  await assert.rejects(with2FA({}, 'avigail', 'read'), denied(403))
})

function upgradeFixture (origin = 'https://sotefinservice.com', protocols = '') {
  const headers = { origin, cookie: 'parkbot.session_token=test', 'sec-websocket-key': 'key', 'sec-websocket-protocol': protocols }
  const res = {
    onAborted (fn) { this.abort = fn },
    cork (fn) { fn() },
    writeStatus (status) { this.status = status; return this },
    end () {},
    upgrade (data, key, protocol) { this.data = data; this.protocol = protocol }
  }
  const req = { forEach (fn) { Object.entries(headers).forEach(([key, value]) => fn(key, value)) }, getHeader: key => headers[key] || '' }
  return { res, req }
}

test('WebSocket upgrades require a trusted origin and authorization', async () => {
  let calls = 0
  const behavior = authenticatedWebSocket({ authorize: async () => { calls++; throw new AuthorizationError(401, 'Unauthorized') }, aps: 'avigail', permission: 'read', topic: 'aps/map' })
  const foreign = upgradeFixture('https://attacker.test')
  await behavior.upgrade(foreign.res, foreign.req, {})
  assert.equal(foreign.res.status, '403 Forbidden')
  assert.equal(calls, 0)
  const invalid = upgradeFixture()
  await behavior.upgrade(invalid.res, invalid.req, {})
  assert.equal(invalid.res.status, '401 Unauthorized')
  assert.equal(invalid.res.data, undefined)
})

test('a revoked assignment closes an existing WebSocket and clears its timer', async t => {
  const timers = []
  t.mock.method(globalThis, 'setTimeout', (fn, delay) => { timers.push({ fn, delay }); return { unref () {} } })
  const clear = t.mock.method(globalThis, 'clearTimeout', () => {})
  let revoked = false
  const behavior = authenticatedWebSocket({ authorize: async () => { if (revoked) throw new AuthorizationError(403, 'Forbidden'); return validSession() }, aps: 'avigail', permission: 'read', topic: 'aps/map' })
  const { res, req } = upgradeFixture()
  await behavior.upgrade(res, req, {})
  const ws = { getUserData: () => res.data, subscribe: t.mock.fn(), end: t.mock.fn() }
  behavior.open(ws)
  assert.equal(ws.subscribe.mock.calls[0].arguments[0], 'aps/map')
  assert.equal(timers[0].delay, 15_000)
  revoked = true
  await timers[0].fn()
  assert.equal(ws.end.mock.calls[0].arguments[0], 1008)
  behavior.close(ws)
  assert.equal(clear.mock.callCount(), 1)
})

test('an aborted upgrade cannot create a WebSocket after authorization resolves', async () => {
  let finishAuthorization
  const behavior = authenticatedWebSocket({ authorize: () => new Promise(resolve => { finishAuthorization = resolve }), aps: 'avigail', permission: 'read', topic: 'aps/map' })
  const { res, req } = upgradeFixture()
  const pending = behavior.upgrade(res, req, {})
  res.abort()
  finishAuthorization(validSession())
  await pending
  assert.equal(res.data, undefined)
})

test('localhost can authenticate without remote-domain cookies when explicitly trusted', async () => {
  const origins = new Set(['http://localhost:3000'])
  let received
  const behavior = authenticatedWebSocket({
    authorize: async (headers, aps, permission) => {
      received = { headers, aps, permission }
      if (headers.authorization !== 'Bearer session-token') throw new AuthorizationError(401, 'Unauthorized')
      return validSession()
    },
    aps: 'daman-n',
    permission: 'read',
    topic: 'aps/info',
    origins
  })
  const { res, req } = upgradeFixture('http://localhost:3000', 'parkbot, parkbot-session.session-token')
  // This is the browser request in the screenshot: no remote-domain cookie.
  req.forEach = fn => {
    fn('origin', 'http://localhost:3000')
    fn('sec-websocket-protocol', 'parkbot, parkbot-session.session-token')
  }
  await behavior.upgrade(res, req, {})
  assert.equal(received.headers.authorization, 'Bearer session-token')
  assert.equal(received.aps, 'daman-n')
  assert.equal(res.protocol, 'parkbot')
  assert.ok(res.data)
})

test('protocol credentials still require a trusted origin and reject invalid or ambiguous tokens', async () => {
  let calls = 0
  const behavior = authenticatedWebSocket({ authorize: async () => { calls++; return validSession() }, aps: 'daman-n', permission: 'read', topic: 'aps/info' })
  const foreign = upgradeFixture('https://attacker.test', 'parkbot, parkbot-session.session-token')
  await behavior.upgrade(foreign.res, foreign.req, {})
  assert.equal(foreign.res.status, '403 Forbidden')
  for (const protocols of ['parkbot, parkbot-session.', 'parkbot-session.session-token', 'parkbot, parkbot-session.one, parkbot-session.two']) {
    const { res, req } = upgradeFixture('https://sotefinservice.com', protocols)
    await behavior.upgrade(res, req, {})
    assert.equal(res.status, '401 Unauthorized')
    assert.equal(res.data, undefined)
  }
  assert.equal(calls, 0)
})
