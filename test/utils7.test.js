import assert from 'node:assert/strict'
import test from 'node:test'
import { WriteArea } from '../lib/utils7.js'

const formats = [
  { name: 'Bit', wordLen: 0x01, amount: 1, bytes: 1 },
  { name: 'Byte', wordLen: 0x02, amount: 3, bytes: 3 },
  { name: 'Word', wordLen: 0x04, amount: 3, bytes: 6 },
  { name: 'DWord', wordLen: 0x06, amount: 3, bytes: 12 },
  { name: 'Real', wordLen: 0x08, amount: 3, bytes: 12 },
  { name: 'Counter', area: 0x1C, wordLen: 0x1C, amount: 3, bytes: 6 },
  { name: 'Timer', area: 0x1D, wordLen: 0x1D, amount: 3, bytes: 6 }
]

for (const format of formats) {
  test(`WriteArea validates ${format.name} size before calling the native client`, async () => {
    const { area = 0x84, wordLen, amount, bytes } = format
    let calls = 0
    let expectedBuffer
    const client = {
      WriteArea (...args) {
        calls++
        assert.equal(this, client)
        assert.deepEqual(args.slice(0, 5), [area, 6, 12, amount, wordLen])
        assert.equal(args[5], expectedBuffer)
        queueMicrotask(() => args.at(-1)(null))
      }
    }
    await assert.rejects(
      WriteArea(client, area, 6, 12, amount, wordLen, Buffer.alloc(bytes - 1)),
      error => error instanceof RangeError && error.message.includes(`at least ${bytes} bytes`)
    )
    assert.equal(calls, 0)

    // Exact-sized and larger buffers are both valid, without copying or truncating.
    for (const length of [bytes, bytes + 4]) {
      expectedBuffer = Buffer.alloc(length)
      assert.equal(await WriteArea(client, area, 6, 12, amount, wordLen, expectedBuffer), true)
    }
    assert.equal(calls, 2)
  })
}

test('WriteArea rejects non-Buffer data before native I/O', async () => {
  let calls = 0
  const client = { WriteArea () { calls++ } }
  for (const buffer of [undefined, null, 'abcd', [1, 2, 3, 4], new Uint8Array(4)]) {
    await assert.rejects(WriteArea(client, 0x84, 6, 0, 4, 0x02, buffer), TypeError)
  }
  assert.equal(calls, 0)
})

test('WriteArea rejects invalid amounts, formats and multi-bit writes before native I/O', async () => {
  let calls = 0
  const client = { WriteArea () { calls++ } }
  for (const amount of [0, -1, 1.5, NaN, Infinity, '4', 0x80000000]) {
    await assert.rejects(WriteArea(client, 0x84, 6, 0, amount, 0x02, Buffer.alloc(16)), RangeError)
  }
  for (const wordLen of [undefined, null, 0, 0x03, '2', NaN, Infinity, 0x02 + 0.1]) {
    await assert.rejects(WriteArea(client, 0x84, 6, 0, 1, wordLen, Buffer.alloc(16)), RangeError)
  }
  await assert.rejects(WriteArea(client, 0x84, 6, 0, 2, 0x01, Buffer.alloc(2)), RangeError)
  assert.equal(calls, 0)
})

test('WriteArea preserves native callback errors and synchronous exceptions', async () => {
  for (const error of [12345, new Error('Native write failed')]) {
    const client = { WriteArea: (...args) => queueMicrotask(() => args.at(-1)(error)) }
    await assert.rejects(WriteArea(client, 0x84, 6, 0, 4, 0x02, Buffer.alloc(4)), actual => actual === error)
  }
  const error = new TypeError('Invalid native argument')
  const client = { WriteArea () { throw error } }
  await assert.rejects(WriteArea(client, 0x84, 6, 0, 4, 0x02, Buffer.alloc(4)), actual => actual === error)
})
