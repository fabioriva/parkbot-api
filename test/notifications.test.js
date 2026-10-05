import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import test from 'node:test'
import Notifications from '../lib/Notifications.js'

async function setup (t, contents = { aa: 'token-aa', agami: 'token-agami', 'daman-n': 'token-daman-n' }) {
  const directory = await mkdtemp(join(tmpdir(), 'parkbot-notifications-'))
  const file = join(directory, 'tokens.json')
  const previous = {
    NOTIFICATIONS_API_TOKENS_FILE: process.env.NOTIFICATIONS_API_TOKENS_FILE,
    NOTIFICATIONS_URL: process.env.NOTIFICATIONS_URL
  }
  t.after(async () => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
    await rm(directory, { recursive: true, force: true })
  })
  await writeFile(file, JSON.stringify(contents))
  process.env.NOTIFICATIONS_API_TOKENS_FILE = file
  process.env.NOTIFICATIONS_URL = 'https://notifications.example.test/api/notifications'
  const fetch = t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 200 }))
  t.mock.method(console, 'log', () => {})
  const recipients = [{ email: 'recipient@example.test', locale: 'it' }]
  const notifications = new Notifications({
    collection: () => ({ find: () => ({ toArray: async () => recipients }) })
  })
  const doc = {
    alarm: { id: 12, key: 'alarm' },
    device: { id: 2, key: 'lift' }
  }
  return { notifications, doc, file, fetch, recipients }
}

test('selects the token for each APS and sends it in the Authorization header', async t => {
  const { notifications, doc, file, fetch, recipients } = await setup(t)
  process.env.NOTIFICATIONS_API_TOKENS_FILE = relative(process.cwd(), file)
  for (const aps of ['aa', 'agami', 'daman-n']) {
    await notifications.send(aps, doc)
    const [url, request] = fetch.mock.calls.at(-1).arguments
    assert.equal(url, process.env.NOTIFICATIONS_URL)
    assert.equal(request.method, 'POST')
    assert.equal(request.headers.Authorization, `Bearer token-${aps}`)
    const body = JSON.parse(request.body)
    assert.equal(body.aps, aps)
    assert.deepEqual(body.recipients, recipients)
    assert.deepEqual(body.alarmLog.alarm, doc.alarm)
    assert.ok(!request.body.includes(`token-${aps}`))
  }
})

test('reads updated tokens on the next send', async t => {
  const { notifications, doc, file, fetch } = await setup(t)
  await notifications.send('aa', doc)
  await writeFile(file, JSON.stringify({ aa: 'rotated-token' }))
  await notifications.send('aa', doc)
  assert.equal(fetch.mock.calls[1].arguments[1].headers.Authorization, 'Bearer rotated-token')
})

test('rejects a missing file setting before sending a request', async t => {
  const { notifications, doc, fetch } = await setup(t)
  delete process.env.NOTIFICATIONS_API_TOKENS_FILE
  await assert.rejects(notifications.send('aa', doc), /NOTIFICATIONS_API_TOKENS_FILE is required/)
  assert.equal(fetch.mock.callCount(), 0)
})

test('rejects an unreadable file before sending a request', async t => {
  const { notifications, doc, file, fetch } = await setup(t)
  process.env.NOTIFICATIONS_API_TOKENS_FILE = file + '.missing'
  await assert.rejects(notifications.send('aa', doc), /Cannot read NOTIFICATIONS_API_TOKENS_FILE/)
  assert.equal(fetch.mock.callCount(), 0)
})

test('rejects malformed JSON without exposing its contents', async t => {
  const { notifications, doc, file, fetch } = await setup(t)
  await writeFile(file, '{"aa":"secret-value-that-must-not-be-logged"')
  await assert.rejects(notifications.send('aa', doc), error => {
    assert.equal(error.message, 'NOTIFICATIONS_API_TOKENS_FILE must contain valid JSON')
    assert.ok(!error.stack.includes('secret-value'))
    assert.equal(error.cause, undefined)
    return true
  })
  assert.equal(fetch.mock.callCount(), 0)
})

test('rejects invalid maps and missing or invalid tokens', async t => {
  const { notifications, doc, file, fetch } = await setup(t)
  for (const contents of [null, [], 'token', 42, {}, { aa: '' }, { aa: '  ' }, { aa: 123 }, { aa: 'bad\r\ntoken' }, { aa: 'bad token' }]) {
    await writeFile(file, JSON.stringify(contents))
    await assert.rejects(notifications.send('aa', doc), /NOTIFICATIONS_API_TOKENS_FILE/)
  }
  await writeFile(file, '{}')
  await assert.rejects(notifications.send('constructor', doc), /Missing or invalid token/)
  assert.equal(fetch.mock.callCount(), 0)
})

test('reports rejected HTTP requests without exposing the response body', async t => {
  const { notifications, doc, fetch } = await setup(t)
  fetch.mock.mockImplementation(async () => new Response('private-response', { status: 401 }))
  await assert.rejects(notifications.send('aa', doc), error => {
    assert.equal(error.message, 'Notifications request failed for aps "aa" (HTTP 401)')
    return true
  })
})
