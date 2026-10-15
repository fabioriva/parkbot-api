import assert from 'node:assert/strict'
import { once } from 'node:events'
import http from 'node:http'
import test from 'node:test'
import * as uWS from 'uWebSockets.js'
import { readJson, sendJson, JsonRequestError } from '../lib/json.js'
import { authenticatedWebSocket } from '../lib/websocket-auth.js'
import { AuthorizationError } from '../lib/authorization.js'

const { WebSocket } = globalThis

// Real native HTTP/WebSocket transport; no MongoDB or PLC connections.
test('native HTTP and authenticated WebSocket transport', { timeout: 10000 }, async t => {
  const app = uWS.App()
  let authorized = true
  let expiresAt
  app.post('/json', async res => {
    try {
      const body = await readJson(res)
      sendJson(res, body)
    } catch (error) {
      assert.ok(error instanceof JsonRequestError)
      sendJson(res, { error: error.message }, error.statusCode === 413 ? '413 Payload Too Large' : '400 Bad Request')
    }
  })
  app.ws('/events', authenticatedWebSocket({
    aps: 'test',
    permission: 'read',
    topic: 'events',
    // Node's WebSocket client omits Origin; this allowance is test-only.
    origins: new Set([undefined]),
    authorize: async headers => {
      if (!authorized || headers.authorization !== 'Bearer test-token') throw new AuthorizationError(401, 'Unauthorized')
      return { session: { expiresAt } }
    }
  }))
  const listener = await new Promise(resolve => app.listen('127.0.0.1', 0, resolve))
  assert.ok(listener)
  const port = uWS.us_socket_local_port(listener)
  t.after(() => uWS.us_listen_socket_close(listener))

  const post = chunks => new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port, path: '/json', method: 'POST', agent: false }, res => {
      let body = ''
      res.setEncoding('utf8')
      res.on('data', chunk => { body += chunk })
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body), type: res.headers['content-type'] }))
      res.on('error', reject)
    })
    req.on('error', reject)
    for (const chunk of chunks) req.write(chunk)
    req.end()
  })

  await t.test('UTF-8 JSON round trip through native callbacks', async () => {
    const value = { text: 'caffè € 🚗 שלום العربية' }
    const bytes = Buffer.from(JSON.stringify(value))
    const response = await post(Array.from(bytes, byte => Buffer.from([byte])))
    assert.equal(response.status, 200)
    assert.equal(response.type, 'application/json; charset=utf-8')
    assert.deepEqual(response.body, value)
  })

  await t.test('malformed and oversized uploads return 400 and 413', async () => {
    assert.equal((await post(['{'])).status, 400)
    assert.equal((await post([JSON.stringify('x'.repeat(65536))])).status, 413)
  })

  await t.test('protocol credentials, broadcasts and session expiration', async () => {
    expiresAt = new Date(Date.now() + 500)
    const ws = new WebSocket(`ws://127.0.0.1:${port}/events`, ['parkbot', 'parkbot-session.test-token'])
    t.after(() => { if (ws.readyState !== WebSocket.CLOSED) ws.close() })
    await once(ws, 'open')
    assert.equal(ws.protocol, 'parkbot')
    const message = once(ws, 'message')
    app.publish('events', 'caffè 🚗')
    assert.equal((await message)[0].data, 'caffè 🚗')
    const [closed] = await once(ws, 'close')
    assert.equal(closed.code, 1008)
  })

  await t.test('unauthorized upgrade is rejected', async () => {
    authorized = false
    const ws = new WebSocket(`ws://127.0.0.1:${port}/events`, ['parkbot', 'parkbot-session.test-token'])
    await once(ws, 'error')
    assert.notEqual(ws.readyState, WebSocket.OPEN)
  })
})
