import assert from 'node:assert/strict'
import test from 'node:test'
import History from '../lib/History.js'
import { Log, LOG_LEN } from '../lib/Log.js'
import { getPlcDateTime } from '../lib/utils7.js'

function createHistory () {
  const calls = {}
  const collection = {
    async insertOne (document) {
      calls.document = document
      return { insertedId: 'test-id' }
    },
    aggregate (pipeline) {
      calls.pipeline = pipeline
      return {
        async toArray () {
          return pipeline.some(stage => stage.$facet)
            ? [{ data: [], total: [] }]
            : [calls.document]
        }
      }
    }
  }
  return { history: new History({ collection: () => collection }), calls }
}

test('UTC timestamps do not depend on the server time zone', async t => {
  const previousTimeZone = process.env.TZ
  try {
    for (const timeZone of ['UTC', 'Europe/Zurich', 'Asia/Dubai', 'America/New_York']) {
      process.env.TZ = timeZone
      await t.test(timeZone, async t => {
        await t.test('decodes midnight, leap day, DST dates and milliseconds', () => {
          assert.equal(new Date(getPlcDateTime(0, 0)).toISOString(), '1990-01-01T00:00:00.000Z')
          for (const iso of [
            '2026-01-27T11:18:47.731Z',
            '2024-02-29T23:59:59.999Z',
            '2026-03-29T02:30:00.000Z',
            '2026-10-25T02:30:00.000Z'
          ]) {
            const instant = Date.parse(iso)
            const midnight = Date.parse(iso.slice(0, 10) + 'T00:00:00.000Z')
            const days = (midnight - Date.UTC(1990, 0, 1)) / 86400000
            assert.equal(getPlcDateTime(days, instant - midnight), instant)
          }
        })

        await t.test('decodes unsigned DATE and preserves the other log fields', () => {
          const buffer = Buffer.alloc(LOG_LEN)
          buffer.writeUInt16BE(0x8000, 20)
          buffer.writeUInt32BE(86399999, 22)
          buffer.writeInt16BE(105, 16)
          buffer.writeInt32BE(1234, 26)
          const log = new Log(buffer)
          assert.equal(log.date, Date.UTC(1990, 0, 1) + 32768 * 86400000 + 86399999)
          assert.equal(log.alarm, 105)
          assert.equal(log.elapsed, 1234)
        })

        await t.test('preserves the instant and milliseconds when saving a PLC log', async () => {
          const { history, calls } = createHistory()
          const buffer = Buffer.alloc(LOG_LEN)
          buffer.writeUInt16BE((Date.UTC(2026, 0, 27) - Date.UTC(1990, 0, 1)) / 86400000, 20)
          buffer.writeUInt32BE(11 * 3600000 + 18 * 60000 + 47731, 22)
          const saved = await history.saveLog(new Log(buffer))
          assert.ok(calls.document.date instanceof Date)
          assert.equal(saved.date.toISOString(), '2026-01-27T11:18:47.731Z')
          assert.equal(JSON.parse(JSON.stringify(saved)).date, '2026-01-27T11:18:47.731Z')
        })

        await t.test('stores action timestamps as Date values too', async () => {
          const { history, calls } = createHistory()
          await history.saveAction({ date: Date.parse('2026-01-27T11:18:47.731Z'), operation: 5 })
          assert.ok(calls.document.date instanceof Date)
          assert.equal(calls.document.date.toISOString(), '2026-01-27T11:18:47.731Z')
          assert.equal(calls.document.operation, 5)
        })

        await t.test('uses exact inclusive/exclusive query bounds without adding an hour', async () => {
          const { history, calls } = createHistory()
          for (const [dateFrom, dateTo] of [
            ['2026-01-26T20:00:00.000Z', '2026-01-27T20:00:00.000Z'],
            ['2026-01-27T00:00:00.000+04:00', '2026-01-28T00:00:00.000+04:00']
          ]) {
            const result = await history.get({ dateFrom, dateTo })
            const bounds = calls.pipeline[0].$match.date
            assert.deepEqual(Object.keys(bounds), ['$gte', '$lt'])
            assert.equal(bounds.$gte.toISOString(), '2026-01-26T20:00:00.000Z')
            assert.equal(bounds.$lt.toISOString(), '2026-01-27T20:00:00.000Z')
            assert.deepEqual(result, { data: [], hasMore: false, total: 0 })
          }
        })
      })
    }
  } finally {
    if (previousTimeZone === undefined) delete process.env.TZ
    else process.env.TZ = previousTimeZone
  }
})
