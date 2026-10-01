import assert from 'node:assert/strict'
import test from 'node:test'
import { generateStalls, updateStalls } from '../models/Stall.js'

test('map timestamps preserve UTC across server time zones', async t => {
  const previousTimeZone = process.env.TZ
  try {
    for (const timeZone of ['UTC', 'Europe/Zurich', 'Asia/Dubai', 'America/New_York']) {
      process.env.TZ = timeZone
      await t.test(timeZone, async () => {
        const stalls = generateStalls({ STALLS: 1 })
        assert.equal(stalls[0].date, '1990-01-01T00:00:00.000Z')
        const cards = [{ nr: 999, status: 0 }]
        for (const iso of [
          '2026-10-01T08:18:18.000Z',
          '2024-02-29T23:59:59.999Z',
          '2026-03-29T02:30:00.731Z',
          '2026-10-25T02:30:00.000Z',
          new Date(Date.UTC(1990, 0, 1) + 32768 * 86400000).toISOString()
        ]) {
          const instant = Date.parse(iso)
          const midnight = Date.parse(iso.slice(0, 10) + 'T00:00:00.000Z')
          const buffer = Buffer.alloc(10)
          buffer.writeInt16BE(999, 0)
          buffer.writeUInt16BE((midnight - Date.UTC(1990, 0, 1)) / 86400000, 2)
          buffer.writeUInt32BE(instant - midnight, 4)
          buffer.writeInt16BE(111, 8)
          await updateStalls(0, buffer, 10, cards, stalls)
          assert.deepEqual({ ...stalls[0] }, { nr: 1, status: 999, date: iso, size: 111 })
          assert.equal(cards[0].status, 1)
          const map = { levels: [{ stalls }] }
          assert.equal(JSON.parse(JSON.stringify(map)).levels[0].stalls[0].date, iso)
        }
      })
    }
  } finally {
    if (previousTimeZone === undefined) delete process.env.TZ
    else process.env.TZ = previousTimeZone
  }
})
