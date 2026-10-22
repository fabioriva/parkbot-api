import { parseArgs } from 'node:util'
import { realpath } from 'node:fs/promises'
import { relative, sep } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { applyOperationMigration, previewOperationMigration } from './operationMigration.js'

export function parseMigrationOptions (args) {
  const { values } = parseArgs({
    args,
    options: {
      def: { type: 'string' },
      apply: { type: 'boolean', default: false },
      help: { type: 'boolean', default: false }
    }
  })
  if (!values.help && !values.def) throw new Error('--def aps/<country>/<plant>/def.js is required')
  return values
}

export async function loadMigrationDefinition (filename) {
  const root = await realpath(new URL('../aps/', import.meta.url))
  const path = await realpath(filename)
  const name = relative(root, path)
  if (name.startsWith('..' + sep) || name === '..' || !name.endsWith(sep + 'def.js')) {
    throw new Error('--def must reference an APS def.js inside this repository')
  }
  const def = await import(pathToFileURL(path).href)
  if (!/^[a-zA-Z0-9_-]+$/.test(def.APS ?? '')) throw new Error('Invalid APS database name')
  return def
}

async function main () {
  const options = parseMigrationOptions(process.argv.slice(2))
  if (options.help) {
    console.log('Usage: node --env-file=.env scripts/migrate-operation-ids.js --def aps/us/menloa/def.js [--apply]')
    console.log('Default: read-only counts. --apply: migrate logs after backup and stopping all writers for this APS.')
    console.log('The operations collection is synchronized by API startup, after migration and PLC updates.')
    return
  }
  const def = await loadMigrationDefinition(options.def)
  if (!process.env.MONGODB_URI?.trim()) throw new Error('MONGODB_URI is required')
  const { MongoClient } = await import('mongodb')
  const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  try {
    await client.connect()
    const db = client.db(def.APS)
    if (!await db.listCollections({ name: 'logs' }, { nameOnly: true }).hasNext()) {
      throw new Error(`Database ${def.APS} has no logs collection`)
    }
    const report = await (options.apply ? applyOperationMigration : previewOperationMigration)(db, def)
    console.log(JSON.stringify(report, null, 2))
    if (report.toReview || report.metadataConflicts) process.exitCode = 2
  } finally {
    await client.close()
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fileURLToPath(pathToFileURL(process.argv[1]))) {
  main().catch(error => {
    // Do not print a MongoDB URI or driver topology containing connection details.
    console.error(error?.name?.startsWith('Mongo')
      ? `MongoDB migration failed (${error.name}${error.code ? `, code ${error.code}` : ''})`
      : error instanceof Error ? error.message : 'Operation migration failed')
    process.exitCode = 1
  })
}
