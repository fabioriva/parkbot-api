import assert from 'node:assert/strict'
import test from 'node:test'
import History from '../lib/History.js'

function createHistory () {
  const pipelines = []
  const collection = {
    aggregate (pipeline) {
      pipelines.push(pipeline)
      return { toArray: async () => [] }
    }
  }
  return { history: new History({ collection: () => collection }), pipelines }
}

function assertBounds (pipeline, start, end) {
  assert.equal(pipeline[0].$match.date.$gte.toISOString(), start)
  assert.equal(pipeline[0].$match.date.$lt.toISOString(), end)
}

test('calendar reports are independent of server TZ and respect DST', async () => {
  const previous = process.env.TZ
  try {
    for (const serverTZ of ['UTC', 'Europe/Rome', 'Asia/Dubai', 'America/New_York']) {
      process.env.TZ = serverTZ
      for (const [day, timeZone, start, end] of [
        ['2026-10-05', 'Asia/Dubai', '2026-10-04T20:00:00.000Z', '2026-10-05T20:00:00.000Z'],
        ['2026-03-29', 'Europe/Rome', '2026-03-28T23:00:00.000Z', '2026-03-29T22:00:00.000Z'],
        ['2026-10-25', 'Europe/Rome', '2026-10-24T22:00:00.000Z', '2026-10-25T23:00:00.000Z']
      ]) {
        const { history, pipelines } = createHistory()
        const result = await history.getOperations({ dateFrom: day, dateTo: day }, timeZone)
        assertBounds(pipelines[0], start, end)
        assert.deepEqual(pipelines[0][1].$group._id.hour, { $hour: { date: '$date', timezone: timeZone } })
        assert.equal(result.key, 'daily')
        assert.deepEqual(result.query, { date: day, dateFrom: start, dateTo: end, timeZone })
        await history.getDevices({ dateFrom: day, dateTo: day }, [], timeZone)
        assertBounds(pipelines[1], start, end)
      }
      const { history, pipelines } = createHistory()
      const reports = await history.getOperations({ dateString: '2026-10-05' }, 'Asia/Dubai')
      assert.deepEqual(reports.map(r => r.key), ['daily', 'weekly', 'monthly', 'yearly'])
      assertBounds(pipelines[1], '2026-09-27T20:00:00.000Z', '2026-10-04T20:00:00.000Z')
      assertBounds(pipelines[2], '2026-08-31T20:00:00.000Z', '2026-09-30T20:00:00.000Z')
      assertBounds(pipelines[3], '2025-10-04T20:00:00.000Z', '2026-10-04T20:00:00.000Z')
      for (const pipeline of pipelines.slice(1)) {
        for (const expression of Object.values(pipeline[1].$group._id)) {
          assert.equal(Object.values(expression)[0].timezone, 'Asia/Dubai')
        }
      }
    }
  } finally {
    if (previous === undefined) delete process.env.TZ
    else process.env.TZ = previous
  }
})

test('range queries preserve exact instants including milliseconds', async () => {
  const { history, pipelines } = createHistory()
  const result = await history.getOperations({
    dateFrom: '2026-10-05T00:00:00.001+04:00',
    dateTo: '2026-10-06T00:00:00.999+04:00'
  }, 'Asia/Dubai')
  assertBounds(pipelines[0], '2026-10-04T20:00:00.001Z', '2026-10-05T20:00:00.999Z')
  assert.equal(result.key, 'range')
  assert.equal(pipelines[0][1].$group._id.day.$dayOfMonth.timezone, 'Asia/Dubai')
})

test('invalid dates, zones and reversed ranges are rejected before aggregation', async () => {
  const { history, pipelines } = createHistory()
  for (const dateString of ['2026-02-30', 'invalid', '2026-10-05T12:00:00']) {
    await assert.rejects(history.getOperations({ dateString }), RangeError)
  }
  await assert.rejects(history.getOperations({ dateString: '2026-10-05' }, 'Invalid/Zone'), RangeError)
  await assert.rejects(history.getOperations({ dateFrom: '2026-10-06', dateTo: '2026-10-05' }), RangeError)
  assert.equal(pipelines.length, 0)
})

test('yearly report clamps leap day to February 28', async () => {
  const { history, pipelines } = createHistory()
  await history.getOperations({ dateString: '2024-02-29' }, 'UTC')
  assertBounds(pipelines[3], '2023-02-28T00:00:00.000Z', '2024-02-29T00:00:00.000Z')
})

test('daily labels retain AM/PM and totals from the grouped operations', async () => {
  const grouped = [
    { _id: { hour: 0 }, entries: 6, exits: 0, total: 6 },
    { _id: { hour: 12 }, entries: 7, exits: 4, total: 11 },
    { _id: { hour: 23 }, entries: 2, exits: 5, total: 7 }
  ]
  const history = new History({
    collection: () => ({ aggregate: () => ({ toArray: async () => grouped }) })
  })
  const result = await history.getOperations({ dateFrom: '2026-10-05', dateTo: '2026-10-05' }, 'Asia/Dubai')
  assert.deepEqual(result.data, [
    { name: '12 am', entries: 6, exits: 0, total: 6 },
    { name: '12 pm', entries: 7, exits: 4, total: 11 },
    { name: '11 pm', entries: 2, exits: 5, total: 7 }
  ])
})
