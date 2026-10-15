import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { registerHooks } from 'node:module'
import { readdir } from 'node:fs/promises'

const state = {}
globalThis.definitionDbTest = state
const hooks = registerHooks({
  resolve (specifier, context, nextResolve) {
    if (specifier === 'mongodb' && context.parentURL?.endsWith('/lib/db.js')) {
      return {
        url: 'data:text/javascript,export class MongoClient { constructor() { const s = globalThis.definitionDbTest; s.clients++; return s.client } }',
        shortCircuit: true
      }
    }
    return nextResolve(specifier, context)
  }
})
const { default: init } = await import('../lib/db.js')
hooks.deregister()
after(() => { delete globalThis.definitionDbTest })

const names = ['alarms', 'devices', 'modes', 'operations']
const configuredTests = new WeakSet()

function setup (t) {
  if (!configuredTests.has(t)) {
    const previous = process.env.MONGODB_URI
    t.after(() => {
      if (previous === undefined) delete process.env.MONGODB_URI
      else process.env.MONGODB_URI = previous
    })
    configuredTests.add(t)
  }
  process.env.MONGODB_URI = 'mongodb://unused.example.test:27017'
  for (const key of Object.keys(state)) delete state[key]
  Object.assign(state, { clients: 0, closed: 0, events: [], stored: {}, indexes: {}, retries: [] })
  let nextId = 1
  const collections = Object.fromEntries(names.map(name => {
    state.stored[name] = []
    state.indexes[name] = ['existing-index']
    const collection = {
      async createIndex (key, options) {
        state.events.push(`index:${name}`)
        assert.deepEqual(key, { id: 1 })
        assert.deepEqual(options, { unique: true })
        if (state.indexError) throw state.indexError
        const ids = state.stored[name].map(doc => doc.id)
        if (new Set(ids).size !== ids.length) throw Object.assign(new Error('Existing duplicate id'), { code: 11000 })
        if (!state.indexes[name].includes('id_1_unique')) state.indexes[name].push('id_1_unique')
      },
      async drop () {
        state.events.push(`drop:${name}`)
        assert.equal(name, 'alarms', 'Reference collections must never be dropped')
        if (state.dropError) throw state.dropError
        state.stored[name] = []
      },
      async insertMany (documents) {
        state.events.push(`insert:${name}`)
        assert.equal(name, 'alarms')
        if (state.insertError) throw state.insertError
        documents.forEach(doc => { doc._id = nextId++ })
        state.stored[name].push(...structuredClone(documents))
      },
      replace (filter, replacement, upsert) {
        const index = state.stored[name].findIndex(doc => doc.id === filter.id)
        // Exercise driver-side mutation without changing the source definitions.
        replacement.query && (replacement.query.driverMutation = true)
        if (index >= 0) {
          state.stored[name][index] = { ...structuredClone(replacement), _id: state.stored[name][index]._id }
          return { matchedCount: 1 }
        }
        if (upsert) state.stored[name].push({ ...structuredClone(replacement), _id: nextId++ })
        return { matchedCount: 0 }
      },
      async bulkWrite (operations, options) {
        state.events.push(`bulk:${name}`)
        assert.deepEqual(options, { ordered: false })
        if (state.onBulk) await state.onBulk(name, operations, collection)
        for (const { replaceOne: op } of operations) {
          assert.equal(op.upsert, true)
          assert.equal(Object.hasOwn(op.replacement, '_id'), false)
          collection.replace(op.filter, op.replacement, true)
        }
      },
      async replaceOne (filter, replacement, options) {
        state.retries.push({ name, id: filter.id })
        assert.deepEqual(options, { upsert: false })
        if (state.retryError) throw state.retryError
        return collection.replace(filter, replacement, false)
      }
    }
    return [name, collection]
  }))
  state.db = { collection: name => collections[name] }
  state.client = {
    async connect () {
      state.events.push('connect')
      if (state.connectError) throw state.connectError
    },
    db (name) { state.databaseName = name; return state.db },
    async close () {
      state.closed++
      if (state.closeError) throw state.closeError
    }
  }
  return Object.fromEntries(['ALARMS', 'DEVICES', 'MODES', 'OPERATIONS'].map(key => [key, [
    { id: 0, key: `${key}-zero`, query: { name: 'original' } },
    { id: 1, key: `${key}-one` }
  ]]))
}

function duplicateError (writeErrors = [{ index: 0, code: 11000 }]) {
  return Object.assign(new Error('Concurrent duplicate key'), {
    name: 'MongoBulkWriteError', writeErrors, result: { getWriteConcernError: () => undefined }
  })
}

test('reference synchronization is idempotent and preserves retired documents, identities and indexes', async t => {
  const str = setup(t)
  const original = structuredClone(str)
  state.stored.devices.push({ _id: 'stable-id', id: 0, key: 'old', removedField: true })
  state.stored.devices.push({ _id: 'retired-id', id: 99, key: 'retired' })
  assert.equal(await init('kn', str), state.db)
  assert.equal(state.databaseName, 'kn')
  const first = structuredClone(state.stored)
  await init('kn', str)
  for (const name of ['devices', 'modes', 'operations']) {
    assert.deepEqual(state.stored[name], first[name])
    assert.deepEqual(state.indexes[name], ['existing-index', 'id_1_unique'])
  }
  assert.equal(state.stored.devices[0]._id, 'stable-id')
  assert.equal(Object.hasOwn(state.stored.devices[0], 'removedField'), false)
  assert.deepEqual(state.stored.devices.find(doc => doc.id === 99), { _id: 'retired-id', id: 99, key: 'retired' })
  assert.deepEqual(str, original)
  assert.equal(state.closed, 0)
})

test('alarms retain their rebuild behavior and permit repeated IDs with different definitions', async t => {
  const str = setup(t)
  str.ALARMS = [{ id: 1, key: 'lift' }, { id: 1, key: 'shuttle' }]
  state.stored.alarms.push({ id: 9, key: 'old' })
  await init('plant', str)
  assert.deepEqual(state.stored.alarms.map(({ id, key }) => ({ id, key })), str.ALARMS)
  assert.equal(state.events.includes('index:alarms'), false)
  assert.equal(state.events.filter(e => e === 'drop:alarms').length, 1)
})

test('every definition array is validated before opening a MongoDB connection', async t => {
  const str = setup(t)
  const invalid = [
    undefined, {}, { ...str, OPERATIONS: [] },
    { ...str, DEVICES: [{ id: 1 }, { id: 1 }] },
    { ...str, MODES: [{ id: -1 }] }, { ...str, MODES: [{ id: '1' }] },
    { ...str, OPERATIONS: [null] }, { ...str, OPERATIONS: [undefined] },
    { ...str, OPERATIONS: Array(1) }
  ]
  for (const definitions of invalid) await assert.rejects(init('plant', definitions), TypeError)
  for (const name of ['', 'plant/name', 'plant.name', 'plant name', null]) {
    await assert.rejects(init(name, str), TypeError)
  }
  delete process.env.MONGODB_URI
  await assert.rejects(init('plant', str), /MONGODB_URI is required/)
  assert.equal(state.clients, 0)
})

test('source _id fields are stripped from copies without modifying definitions', async t => {
  const str = setup(t)
  str.DEVICES[0]._id = 'stale-id'
  await init('plant', str)
  assert.equal(str.DEVICES[0]._id, 'stale-id')
  assert.notEqual(state.stored.devices[0]._id, 'stale-id')
})

test('existing duplicate reference IDs stop initialization before alarms or definitions are modified', async t => {
  const str = setup(t)
  state.stored.modes.push({ id: 1 }, { id: 1 })
  state.stored.alarms.push({ id: 5, key: 'keep' })
  const stored = structuredClone(state.stored)
  await assert.rejects(init('kn', str), error => error.cause.code === 11000 && error.message.includes('kn.modes: create unique id index'))
  assert.deepEqual(state.stored, stored)
  assert.equal(state.events.some(event => event.startsWith('bulk:') || event.startsWith('drop:')), false)
  assert.equal(state.closed, 1)
})

test('only a missing alarm collection is ignored; other drop failures abort initialization', async t => {
  let str = setup(t)
  state.dropError = Object.assign(new Error('Namespace missing'), { code: 26 })
  await init('plant', str)
  assert.equal(state.events.includes('insert:alarms'), true)

  str = setup(t)
  state.dropError = Object.assign(new Error('Not authorized'), { code: 13 })
  await assert.rejects(init('plant', str), error => error.cause === state.dropError && error.message.includes('drop alarms'))
  assert.equal(state.events.includes('insert:alarms'), false)
  assert.equal(state.closed, 1)
})

test('connection, index and insert errors retain context and close the client', async t => {
  for (const [field, context] of [['connectError', 'connect'], ['indexError', 'create unique id index'], ['insertError', 'insert alarms']]) {
    const str = setup(t)
    const cause = new Error(field)
    state[field] = cause
    await assert.rejects(init('plant', str), error => error.cause === cause && error.message.includes(context))
    assert.equal(state.closed, 1)
  }
})

test('a cleanup failure does not hide the original initialization error', async t => {
  const str = setup(t)
  const logger = t.mock.method(console, 'error', () => {})
  state.connectError = new Error('Connection failed')
  state.closeError = new Error('Close failed')
  await assert.rejects(init('plant', str), error => error.cause === state.connectError)
  assert.equal(logger.mock.calls[0].arguments[0].err, state.closeError)
})

test('a concurrent upsert collision retries only the failed ID without inserting again', async t => {
  const str = setup(t)
  state.onBulk = async (name, operations, collection) => {
    if (name !== 'devices') return
    state.stored.devices.push({ _id: 'concurrent-id', id: 0, key: 'other process' })
    const op = operations[1].replaceOne
    collection.replace(op.filter, op.replacement, true)
    throw duplicateError()
  }
  await init('kn', str)
  assert.deepEqual(state.retries, [{ name: 'devices', id: 0 }])
  assert.equal(state.stored.devices.length, 2)
  assert.equal(state.stored.devices[0]._id, 'concurrent-id')
  assert.equal(state.stored.devices[0].key, str.DEVICES[0].key)
  assert.equal(state.closed, 0)
})

test('mixed bulk errors and write concern errors are never treated as harmless collisions', async t => {
  for (const error of [
    duplicateError([{ index: 0, code: 11000 }, { index: 1, code: 121 }]),
    Object.assign(duplicateError(), { result: { getWriteConcernError: () => new Error('Write concern failed') } }),
    Object.assign(duplicateError(), { errorLabels: ['RetryableWriteError'] }),
    new Error('Network unavailable')
  ]) {
    const str = setup(t)
    state.onBulk = async () => { throw error }
    await assert.rejects(init('plant', str), actual => actual.cause === error)
    assert.equal(state.retries.length, 0)
    assert.equal(state.closed, 1)
  }
})

test('a duplicate-key retry with no matching ID aborts instead of silently losing a definition', async t => {
  const str = setup(t)
  const cause = duplicateError()
  state.onBulk = async () => { throw cause }
  await assert.rejects(init('kn', str), error => error.cause === cause)
  assert.equal(state.closed, 1)
})

test('current plant definitions are compatible, including device-specific duplicate alarm IDs', async t => {
  const files = (await readdir(new URL('../aps/', import.meta.url), { recursive: true }))
    .filter(file => file.endsWith('/str.js') && !/^(xian|18017K)\//.test(file) && !file.includes('/tmp/'))
  assert.ok(files.length > 0)
  for (const file of files) {
    setup(t)
    const definitions = await import(new URL(`../aps/${file}`, import.meta.url))
    assert.equal(await init('validation-only', definitions), state.db, file)
  }
})
