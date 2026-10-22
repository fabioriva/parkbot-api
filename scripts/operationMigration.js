import { OPERATION_VERSION } from '../lib/operationDefinitions.js'

// Only unversioned records belong to the old catalog. New API records and
// records already migrated must never be interpreted a second time.
const legacy = { operationVersion: { $exists: false } }
const operator = { user: { $type: 'string', $ne: '' } }
const plc = { user: null } // MongoDB also matches a missing user field.

export function operationMigrationPlan (def) {
  if (typeof def.APS !== 'string' || !def.APS) {
    throw new TypeError('APS database name is required')
  }
  const rules = []
  const known = [{ operation: { $in: Array.from({ length: 12 }, (_, id) => id) } }]
  function add (from, to, source, description) {
    const filter = { $and: [legacy, { operation: from }, source] }
    known.push({ $and: [{ operation: from }, source] })
    if (from !== to) rules.push({ from, to, description, filter })
  }

  // Old rollback and step-by-step requests shared ID 12: only PP saved card 0.
  add(12, 14, { $and: [operator, { card: 0 }] }, 'App: step-by-step request')
  add(12, 12, { $and: [operator, { card: { $gt: 0 } }] }, 'App: rollback request')
  add(13, 13, { $and: [operator, { card: { $gt: 0 } }] }, 'App: queue deletion')

  if (['menloa', 'menlob'].includes(def.APS)) {
    add(12, 15, plc, 'PLC: swap request')
    add(13, 16, plc, 'PLC: re-park started')
    add(14, 17, plc, 'PLC: card issued')
  } else if (['bugrashov', 'sotefin'].includes(def.APS)) {
    add(12, 14, plc, 'PLC: step-by-step request')
    add(13, 13, plc, 'PLC: queue deletion')
  } else if (def.APS === 'muse') {
    add(12, 12, plc, 'PLC: rollback request')
  }
  if (['knl', 'knr'].includes(def.APS)) {
    known.push({ operation: { $in: [95, 96, 97, 98, 99] } })
  }

  return {
    aps: def.APS,
    rules,
    // Undefined PLC codes, malformed actor/card values and any draft IDs
    // 100–102 require inspection, rather than an assumed interpretation.
    reviewFilter: { $and: [legacy, { $nor: known }] },
    conflictFilter: { $and: [legacy, { operationMigration: { $exists: true } }] }
  }
}

export async function previewOperationMigration (db, def) {
  const plan = operationMigrationPlan(def)
  const logs = db.collection('logs')
  const changes = []
  for (const rule of plan.rules) {
    const count = await logs.countDocuments(rule.filter)
    changes.push({ from: rule.from, to: rule.to, description: rule.description, count })
  }
  return {
    database: def.APS,
    mode: 'preview',
    targetVersion: OPERATION_VERSION,
    legacyRecords: await logs.countDocuments(legacy),
    versionedRecords: await logs.countDocuments({ operationVersion: OPERATION_VERSION }),
    changes,
    toChange: changes.reduce((total, rule) => total + rule.count, 0),
    toReview: await logs.countDocuments(plan.reviewFilter),
    metadataConflicts: await logs.countDocuments(plan.conflictFilter)
  }
}

export async function applyOperationMigration (db, def) {
  const preview = await previewOperationMigration(db, def)
  if (preview.toReview || preview.metadataConflicts) {
    throw new Error('Migration blocked: inspect ambiguous legacy records or metadata conflicts first')
  }
  const logs = db.collection('logs')
  const applied = []
  for (const rule of operationMigrationPlan(def).rules) {
    // One atomic update per document retains the original ID and marks the
    // new version. This also makes interrupted migrations safe to resume.
    const result = await logs.updateMany(rule.filter, [{
      $set: {
        operationMigration: { from: '$operation', to: rule.to, migratedAt: '$$NOW' },
        operation: rule.to,
        operationVersion: OPERATION_VERSION
      }
    }])
    applied.push({ from: rule.from, to: rule.to, modified: result.modifiedCount })
  }
  return { ...preview, mode: 'apply', applied, remaining: await previewOperationMigration(db, def) }
}
