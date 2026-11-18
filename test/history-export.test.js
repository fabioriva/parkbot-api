import assert from 'node:assert/strict'
import test from 'node:test'
import History from '../lib/History.js'

const query = { dateFrom: '2026-10-24T22:00:00.000Z', dateTo: '2026-10-25T23:00:00.000Z', card: '12', device: '2', stall: '0' }
function setup (rows = []) {
  const calls = {}
  const history = new History({
    collection: () => ({
      aggregate (pipeline, options) {
        Object.assign(calls, { pipeline, options })
        return { toArray: async () => rows }
      }
    })
  })
  return { history, calls }
}
test('export uses exact bounds, filters, stable order and a bounded query', async () => {
  const { history, calls } = setup([{ card: 12 }])
  assert.deepEqual(await history.export(query), [{ card: 12 }])
  assert.deepEqual(calls.pipeline[0].$match, {
    date: { $gte: new Date(query.dateFrom), $lt: new Date(query.dateTo) },
    card: { $eq: 12 },
    device: { $eq: 2 },
    stall: { $gte: 0 }
  })
  assert.deepEqual(calls.pipeline[1], { $sort: { _id: -1 } })
  assert.deepEqual(calls.pipeline[2], { $limit: 5001 })
  assert.equal(calls.options.maxTimeMS, 30000)
  assert.equal(calls.pipeline.some(stage => stage.$skip || stage.$facet), false)
})
test('export accepts empty results and exactly 5000 records, rejects overflow', async () => {
  assert.deepEqual(await setup().history.export(query), [])
  assert.equal((await setup(Array(5000).fill({})).history.export(query)).length, 5000)
  await assert.rejects(setup(Array(5001).fill({})).history.export(query), { statusCode: 413 })
})
test('invalid ranges and filters are rejected before querying MongoDB', async () => {
  for (const change of [
    { dateFrom: '2026-10-24' }, { dateFrom: '2026-02-30T00:00:00Z' }, { dateTo: 'invalidZ' },
    { dateTo: query.dateFrom }, { dateFrom: query.dateTo },
    { card: '-1' }, { device: '1a' }, { stall: ['1', '2'] }, { card: '9007199254740992' }
  ]) {
    const { history, calls } = setup()
    await assert.rejects(history.export({ ...query, ...change }), { statusCode: 400 })
    assert.equal(calls.pipeline, undefined)
  }
})
