import assert from 'node:assert/strict'
import test from 'node:test'
import { operationMigrationPlan, previewOperationMigration, applyOperationMigration } from '../scripts/operationMigration.js'
import { loadMigrationDefinition, parseMigrationOptions } from '../scripts/migrate-operation-ids.js'

// Narrow MongoDB filter evaluator for the queries used by this migration.
// No MongoDB server, credentials, PLC or network is used by these tests.
function matches (doc, filter) {
  return Object.entries(filter).every(([key, expected]) => {
    if (key === '$and') return expected.every(item => matches(doc, item))
    if (key === '$nor') return !expected.some(item => matches(doc, item))
    const value = doc[key]
    if (expected === null) return value == null
    if (typeof expected !== 'object') return value === expected
    return Object.entries(expected).every(([operator, operand]) => {
      if (operator === '$exists') return Object.hasOwn(doc, key) === operand
      if (operator === '$in') return operand.includes(value)
      if (operator === '$ne') return value !== operand
      if (operator === '$gt') return typeof value === 'number' && value > operand
      if (operator === '$type') return operand === 'string' && typeof value === 'string'
      throw new Error(`Unsupported test operator ${operator}`)
    })
  })
}

function fixture (documents) {
  const logs = structuredClone(documents)
  const writes = []
  const collection = {
    async countDocuments (filter) { return logs.filter(doc => matches(doc, filter)).length },
    async updateMany (filter, pipeline) {
      writes.push({ filter, pipeline })
      assert.equal(pipeline.length, 1)
      const { operation, operationVersion, operationMigration } = pipeline[0].$set
      assert.equal(operationMigration.from, '$operation')
      assert.equal(operationMigration.to, operation)
      assert.equal(operationMigration.migratedAt, '$$NOW')
      let modifiedCount = 0
      for (const doc of logs.filter(doc => matches(doc, filter))) {
        doc.operationMigration = { from: doc.operation, to: operation, migratedAt: new Date() }
        doc.operation = operation
        doc.operationVersion = operationVersion
        modifiedCount++
      }
      return { modifiedCount }
    }
  }
  return { logs, writes, collection, db: { collection (name) { assert.equal(name, 'logs'); return collection } } }
}

const definition = APS => ({ APS })

test('Menlo preview separates app requests from PLC events and performs no writes', async () => {
  const original = [
    { operation: 13, card: 183, user: 'operator' },
    { operation: 13, card: 183 },
    { operation: 12, card: 183, user: null },
    { operation: 14, card: 183 },
    { operation: 12, card: 0, user: 'operator' },
    { operation: 12, card: 183, user: 'operator' },
    { operation: 5, card: 999, user: 'operator' },
    { operation: 5, card: 183, user: 'operator' },
    { operation: 12, card: 183, operationVersion: 1 }
  ]
  const f = fixture(original)
  const report = await previewOperationMigration(f.db, definition('menloa'))
  assert.equal(report.toChange, 4)
  assert.equal(report.toReview, 0)
  assert.equal(report.changes.some(rule => rule.from === 5 && rule.to === 6), false)
  assert.equal(report.versionedRecords, 1)
  assert.equal(f.writes.length, 0)
  assert.deepEqual(f.logs, original)

  const applied = await applyOperationMigration(f.db, definition('menloa'))
  assert.deepEqual(f.logs.map(doc => doc.operation), [13, 16, 15, 17, 14, 12, 5, 5, 12])
  assert.equal(applied.remaining.toChange, 0)
  for (const index of [1, 2, 3, 4]) {
    assert.equal(f.logs[index].operationVersion, 1)
    assert.equal(f.logs[index].operationMigration.from, original[index].operation)
  }
  assert.deepEqual(f.logs[0], original[0], 'Already-correct legacy IDs need no document update')
  const beforeRepeat = structuredClone(f.logs)
  await applyOperationMigration(f.db, definition('menloa'))
  assert.deepEqual(f.logs, beforeRepeat, 'A repeated migration must not reinterpret new IDs')
})

test('Bugrashov and Sotefin PP becomes 14 while Muse rollback stays 12', async () => {
  for (const aps of ['bugrashov', 'sotefin', 'muse']) {
    const f = fixture([{ operation: 12, card: 183 }, { operation: 12, card: 0, user: 'operator' }])
    const result = await applyOperationMigration(f.db, definition(aps))
    assert.equal(result.toReview, 0)
    assert.deepEqual(f.logs.map(doc => doc.operation), [aps === 'muse' ? 12 : 14, 14])
  }
})

test('KN codes 95–99 are neither changed nor marked as migrated', async () => {
  for (const aps of ['knl', 'knr']) {
    const original = [95, 96, 97, 98, 99].map(operation => ({ operation }))
    const f = fixture(original)
    const report = await applyOperationMigration(f.db, definition(aps))
    assert.equal(report.toChange, 0)
    assert.equal(report.toReview, 0)
    assert.deepEqual(f.logs, original)
  }
})

test('unknown or ambiguous legacy records block all writes', async () => {
  for (const document of [
    { operation: 12 }, // Undefined PLC code on a standard APS.
    { operation: 13, user: '' },
    { operation: 12, card: -1, user: 'operator' },
    { operation: 12, card: '183', user: 'operator' },
    { operation: 100, card: 183, user: 'operator' },
    { operation: 95 }, // KN exception must not silently apply to other APS.
    { operation: '13' },
    { operation: 5, operationMigration: { from: 4 } }
  ]) {
    const f = fixture([document, { operation: 12, card: 0, user: 'operator' }])
    await assert.rejects(applyOperationMigration(f.db, definition('daman-n')), /Migration blocked/)
    assert.equal(f.writes.length, 0)
  }
})

test('an interrupted migration can resume without converting PP 14 into issued-card 17', async () => {
  const f = fixture([{ operation: 12, card: 0, user: 'operator' }, { operation: 14, card: 183 }])
  const update = f.collection.updateMany.bind(f.collection)
  f.collection.updateMany = async (filter, pipeline) => {
    if (pipeline[0].$set.operation === 17) throw new Error('Interrupted')
    return update(filter, pipeline)
  }
  await assert.rejects(applyOperationMigration(f.db, definition('menlob')), /Interrupted/)
  assert.deepEqual(f.logs.map(doc => doc.operation), [14, 14])
  f.collection.updateMany = update
  await applyOperationMigration(f.db, definition('menlob'))
  assert.deepEqual(f.logs.map(doc => doc.operation), [14, 17])
})

test('occupied, cleared and manually locked stalls retain their existing history', async () => {
  for (const lock of [-1, 100, 999]) {
    const def = { APS: 'knl', STALL_STATUS: { FREE: 0, LOCK: lock } }
    const original = [
      { operation: 5, card: 183, user: 'operator' },
      { operation: 6, card: 0, user: 'operator' },
      { operation: 5, card: lock, user: 'operator' }
    ]
    const f = fixture(original)
    await applyOperationMigration(f.db, def)
    assert.deepEqual(f.logs.map(doc => doc.operation), [5, 6, 5])
    assert.deepEqual(f.logs, original)
  }
})

test('CLI defaults to preview, requires an explicit definition and rejects unrelated files', async () => {
  assert.equal(parseMigrationOptions(['--def', 'aps/us/menloa/def.js']).apply, false)
  assert.equal(parseMigrationOptions(['--def', 'aps/us/menloa/def.js', '--apply']).apply, true)
  assert.throws(() => parseMigrationOptions([]), /--def/)
  assert.throws(() => parseMigrationOptions(['--all']), /Unknown option/)
  await assert.rejects(loadMigrationDefinition('package.json'), /inside this repository/)
  assert.equal((await loadMigrationDefinition('aps/us/menloa/def.js')).APS, 'menloa')
  assert.throws(() => operationMigrationPlan({}), /APS/)
  assert.doesNotThrow(() => operationMigrationPlan({ APS: 'menloa' }))
})
