import { MongoClient } from 'mongodb'

const collections = [
  ['alarms', 'ALARMS'],
  ['devices', 'DEVICES'],
  ['modes', 'MODES'],
  ['operations', 'OPERATIONS']
]

function prepareDefinitions (aps, str) {
  if (typeof aps !== 'string' || !aps || /\s/.test(aps) ||
      ['/', '\\', '.', '"', '$', '\0'].some(character => aps.includes(character))) {
    throw new TypeError('A valid APS database name is required')
  }

  return collections.map(([name, key]) => {
    const definitions = str?.[key]
    if (!Array.isArray(definitions) || definitions.length === 0) {
      throw new TypeError(`${aps}.${name}: ${key} must be a non-empty array`)
    }
    const ids = new Set()
    const documents = []
    for (const definition of definitions) {
      if (!definition || typeof definition !== 'object' || Array.isArray(definition) ||
          !Number.isSafeInteger(definition.id) || definition.id < 0) {
        throw new TypeError(`${aps}.${name}: each definition must have a non-negative integer id`)
      }
      // Alarm IDs may repeat across device groups; retain their current rebuild.
      if (name !== 'alarms' && ids.has(definition.id)) {
        throw new TypeError(`${aps}.${name}: duplicate definition id ${definition.id}`)
      }
      ids.add(definition.id)
      const document = structuredClone(definition)
      delete document._id
      documents.push(document)
    }
    return { name, documents }
  })
}

async function synchronize (collection, documents) {
  const operations = documents.map(document => ({
    replaceOne: { filter: { id: document.id }, replacement: document, upsert: true }
  }))
  try {
    await collection.bulkWrite(operations, { ordered: false })
  } catch (error) {
    // Two KN processes can both try to insert an ID that did not exist yet.
    // Retry only duplicate-key failures, as replacements without another upsert.
    const failures = error.writeErrors
    if (error.name !== 'MongoBulkWriteError' || !Array.isArray(failures) || !failures.length ||
        error.err || error.result?.getWriteConcernError?.() || error.errorLabels?.length ||
        !failures.every(failure => failure.code === 11000 &&
          Number.isInteger(failure.index) && failure.index >= 0 && failure.index < operations.length)) {
      throw error
    }
    for (const failure of failures) {
      const operation = operations[failure.index].replaceOne
      const result = await collection.replaceOne(operation.filter, operation.replacement, { upsert: false })
      if (result.matchedCount !== 1) throw error
    }
  }
}

export default async function init (aps, str) {
  const definitions = prepareDefinitions(aps, str)
  const uri = process.env.MONGODB_URI
  if (typeof uri !== 'string' || !uri.trim()) throw new TypeError('MONGODB_URI is required')

  let client
  let collectionName
  let operation = 'connect'
  try {
    client = new MongoClient(uri)
    await client.connect()
    const db = client.db(aps)

    // Check uniqueness before replacing any definitions or rebuilding alarms.
    // Existing duplicates require an explicit migration; never remove them here.
    for (const { name } of definitions.filter(item => item.name !== 'alarms')) {
      collectionName = name
      operation = 'create unique id index'
      await db.collection(name).createIndex({ id: 1 }, { unique: true })
    }

    for (const { name, documents } of definitions) {
      collectionName = name
      const collection = db.collection(name)
      if (name === 'alarms') {
        operation = 'drop alarms'
        try {
          await collection.drop()
        } catch (error) {
          if (error.code !== 26) throw error
        }
        operation = 'insert alarms'
        await collection.insertMany(documents)
      } else {
        operation = 'synchronize definitions'
        await synchronize(collection, documents)
      }
    }
    return db
  } catch (error) {
    if (client) {
      try {
        await client.close()
      } catch (closeError) {
        console.error({ aps, err: closeError }, 'MongoDB cleanup failed')
      }
    }
    const context = collectionName ? `${aps}.${collectionName}` : aps
    throw new Error(`MongoDB initialization failed for ${context}: ${operation}`, { cause: error })
  }
}
