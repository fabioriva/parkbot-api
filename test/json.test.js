import assert from 'node:assert/strict'
import test from 'node:test'
import { readJson, sendJson, JsonRequestError, DEFAULT_JSON_BODY_LIMIT } from '../lib/json.js'

function response () {
  let finished = false
  const res = {
    events: [],
    headers: {},
    onData (handler) { this.receive = handler },
    onAborted (handler) { this.onAbort = handler },
    abort () { if (this.onAbort) this.onAbort(); else this.aborted = true },
    check () { assert.equal(finished, false); assert.notEqual(this.aborted, true) },
    cork (handler) { this.check(); this.events.push('cork'); handler() },
    writeStatus (status) { this.check(); this.events.push('status'); this.status = status; return this },
    writeHeader (key, value) { this.check(); this.events.push('header'); this.headers[key] = value; return this },
    end (body, closeConnection) {
      this.check()
      this.events.push('end')
      this.body = body
      this.closeConnection = closeConnection
      finished = true
      return this
    }
  }
  return res
}

function emit (res, bytes, isLast) {
  // Match uWS ArrayBuffer lifetime: the received bytes disappear on return.
  const chunk = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
  res.receive(chunk, isLast)
  structuredClone(chunk, { transfer: [chunk] })
}

test('readJson preserves UTF-8 characters split across chunks released by uWS', async () => {
  const res = response()
  const expected = { name: 'caffè € 🚗 שלום العربية' }
  const bytes = Buffer.from(JSON.stringify(expected))
  const pending = readJson(res)
  for (let index = 0; index < bytes.length; index++) emit(res, bytes.subarray(index, index + 1), index === bytes.length - 1)
  assert.deepEqual(await pending, expected)
})

test('readJson preserves JSON values and handles empty intermediate chunks', async () => {
  for (const value of [{ enabled: true }, [1, 2], null, false, 0, 'text']) {
    const res = response()
    const pending = readJson(res)
    emit(res, Buffer.alloc(0), false)
    emit(res, Buffer.from(JSON.stringify(value)), true)
    assert.deepEqual(await pending, value)
  }
})

test('empty and malformed bodies reject with a typed 400 error and original parse cause', async () => {
  for (const body of ['', ' ', '{', '{"a":}']) {
    const res = response()
    const pending = readJson(res)
    emit(res, Buffer.from(body), true)
    await assert.rejects(pending, error => error instanceof JsonRequestError && error.statusCode === 400 && error.cause instanceof SyntaxError)
  }
})

test('readJson enforces a byte limit, accepts its exact boundary and ignores later chunks after rejection', async () => {
  const bytes = Buffer.from('{"name":"è"}')
  assert.ok(bytes.length > bytes.toString().length)
  const exact = response()
  const accepted = readJson(exact, { maxBytes: bytes.length })
  emit(exact, bytes, true)
  assert.deepEqual(await accepted, { name: 'è' })

  const oversized = response()
  const rejected = readJson(oversized, { maxBytes: bytes.length - 1 })
  emit(oversized, bytes.subarray(0, 4), false)
  emit(oversized, bytes.subarray(4), false)
  await assert.rejects(rejected, error => error instanceof JsonRequestError && error.statusCode === 413)
  // A settled reader must not inspect or decode subsequent chunks.
  oversized.receive({ get byteLength () { throw new Error('Unexpected access') } }, true)
})

test('readJson defaults to 64 KiB and rejects invalid limit configuration', async () => {
  assert.equal(DEFAULT_JSON_BODY_LIMIT, 64 * 1024)
  const res = response()
  const pending = readJson(res)
  emit(res, Buffer.alloc(DEFAULT_JSON_BODY_LIMIT + 1), false)
  await assert.rejects(pending, error => error.statusCode === 413)
  for (const maxBytes of [0, -1, 1.5, NaN, Infinity, '100']) {
    await assert.rejects(readJson(response(), { maxBytes }), RangeError)
  }
})

test('aborting a partial body resolves null and prevents later processing', async () => {
  const res = response()
  const pending = readJson(res)
  emit(res, Buffer.from('{"name":'), false)
  res.abort()
  assert.equal(await pending, null)
  assert.equal(res.aborted, true)
  res.receive({ get byteLength () { throw new Error('Unexpected access') } }, true)
  sendJson(res, { ignored: true })
  assert.deepEqual(res.events, [])
})

test('already aborted or completed responses are not used to register a reader', async () => {
  for (const flag of ['aborted', 'completed']) {
    const res = response()
    res[flag] = true
    assert.equal(await readJson(res), null)
    assert.equal(res.receive, undefined)
    assert.equal(res.onAbort, undefined)
  }
})

test('sendJson writes status, UTF-8 content type and body in one cork', () => {
  const res = response()
  sendJson(res, { name: 'caffè' }, '201 Created')
  assert.equal(res.status, '201 Created')
  assert.equal(res.headers['Content-Type'], 'application/json; charset=utf-8')
  assert.deepEqual(JSON.parse(res.body), { name: 'caffè' })
  assert.deepEqual(res.events, ['cork', 'status', 'header', 'end'])
  assert.equal(res.completed, true)
  assert.equal(res.closeConnection, false)
})

test('serialization failures return a complete 500 response without exposing object data', t => {
  const logger = t.mock.method(console, 'error', () => {})
  const circular = { secret: 'must not be sent' }
  circular.self = circular
  for (const value of [circular, { value: 1n }, undefined]) {
    const res = response()
    sendJson(res, value)
    assert.equal(res.status, '500 Internal Server Error')
    assert.deepEqual(JSON.parse(res.body), { error: 'Internal server error' })
    assert.equal(res.events.filter(e => e === 'end').length, 1)
  }
  assert.equal(logger.mock.callCount(), 3)
})

test('sendJson prevents duplicate responses and skips serialization after an abort', () => {
  const res = response()
  sendJson(res, { first: true })
  const value = { toJSON () { throw new Error('Must not serialize') } }
  sendJson(res, value)
  assert.deepEqual(JSON.parse(res.body), { first: true })
  assert.equal(res.events.filter(e => e === 'end').length, 1)

  const aborted = response()
  aborted.abort()
  sendJson(aborted, value)
  assert.deepEqual(aborted.events, [])
})

test('sendJson rechecks abort state before accessing native methods after serialization', () => {
  const res = response()
  sendJson(res, { toJSON () { res.abort(); return {} } })
  assert.deepEqual(res.events, [])
})

test('a 413 response closes the connection to stop an unfinished upload', () => {
  const res = response()
  sendJson(res, { error: 'JSON body too large' }, '413 Payload Too Large')
  assert.equal(res.closeConnection, true)
  assert.equal(res.completed, true)
})
