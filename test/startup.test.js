import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { registerHooks } from 'node:module'

const state = {}
globalThis.apiStartupTest = state
const variants = [
  { name: 'shared', aps: 'sample', port: 9000, database: true },
  { name: 'Daman', entry: 'ae/daman', aps: 'daman-n', port: 9036, database: true, secondary: 'plcw.run' },
  { name: 'KN left', entry: 'in/kn/left', aps: 'knl', port: 9015, database: true, databaseName: 'kn' },
  { name: 'KN right', entry: 'in/kn/right', aps: 'knr', port: 9016, database: true, databaseName: 'kn' },
  { name: 'Hotel Dante', entry: 'ch/hdante', aps: 'hdante', port: 9022, database: true, secondary: 'shuttle.run' },
  { name: 'Daman display API', entry: 'ae/daman/api', aps: 'daman', port: 9100 },
  { name: 'Bugrashov device API', entry: 'il/bugrashov/api', aps: 'bugrashov', port: 9100 }
]
const modules = new Map([
  ['dotenv/config.js', ''],
  ['pino', 'export default () => ({ info() {} })'],
  ['uWebSockets.js', 'export const App = () => { globalThis.apiStartupTest.events.push("app"); return globalThis.apiStartupTest.app }'],
  ['db.js', 'export default async (name) => { const s = globalThis.apiStartupTest; s.databaseName = name; s.events.push("mongo"); await s.databaseGate; if (s.databaseError) throw s.databaseError; return s.db }'],
  ['History.js', 'export default class { constructor() { globalThis.apiStartupTest.events.push("history") } }'],
  ['Notifications.js', 'export default class { constructor() { globalThis.apiStartupTest.events.push("notifications") } }'],
  ['Plc.js', 'export default class { on() { return this } async run() { const s = globalThis.apiStartupTest; s.events.push("plc.run"); await s.plcGate; if (s.plcError) throw s.plcError } }'],
  ['PlcW.js', 'export default class { async run() { globalThis.apiStartupTest.events.push("plcw.run") } }'],
  ['shuttle.js', 'export default class { async run() { globalThis.apiStartupTest.events.push("shuttle.run") } }'],
  ['Router.js', 'export default class { run() { globalThis.apiStartupTest.events.push("routes") } }'],
  ['str.js', 'export const ALARMS = []'],
  ['obj.js', 'export default {}']
])
const hooks = registerHooks({
  resolve (specifier, context, nextResolve) {
    const parent = context.parentURL && new URL(context.parentURL).pathname
    const variant = variants.find(v => v.entry && parent?.endsWith(`/aps/${v.entry}/index.js`))
    if (parent?.endsWith('/lib/main.js') || variant) {
      const key = specifier.startsWith('.') ? specifier.split('/').at(-1) : specifier
      if (key === 'def.js' && variant) {
        return { url: `data:text/javascript,export const APS = ${JSON.stringify(variant.aps)}; export const HTTP = ${variant.port}`, shortCircuit: true }
      }
      if (modules.has(key)) return { url: `data:text/javascript,${encodeURIComponent(modules.get(key))}`, shortCircuit: true }
    }
    return nextResolve(specifier, context)
  }
})
const { default: main } = await import('../lib/main.js')
after(() => { hooks.deregister(); delete globalThis.apiStartupTest })

const turn = () => new Promise(resolve => setImmediate(resolve))
let entryId = 0

function setup (t, variant) {
  for (const key of Object.keys(state)) delete state[key]
  state.events = []
  state.db = {}
  state.app = {
    listen (port, onListen) {
      assert.equal(port, variant.port)
      state.events.push('listen')
      if (state.deferListen) state.finishListen = onListen
      else onListen(state.bindFailure ? false : {})
      return this
    },
    get () {
      if (!state.events.includes('routes')) state.events.push('routes')
      return this
    }
  }
  const errors = t.mock.method(console, 'error', () => {})
  t.mock.method(console, 'info', () => {})
  const exits = t.mock.method(process, 'exit', () => {})
  const invoke = variant.name === 'shared'
    ? () => main({ APS: variant.aps, HTTP: variant.port }, {}, {})
    : async () => {
      await import(`../aps/${variant.entry}/index.js?startup-test=${++entryId}`)
      await turn()
    }
  return { invoke, errors, exits }
}

for (const variant of variants) {
  test(`${variant.name}: routes and any database are ready before listening or starting PLC polling`, async t => {
    const { invoke, exits } = setup(t, variant)
    let ready
    state.databaseGate = new Promise(resolve => { ready = resolve })
    const pending = invoke()
    await turn()
    if (variant.database) assert.deepEqual(state.events, ['app', 'mongo'])
    ready()
    await pending
    assert.deepEqual(state.events, [
      'app',
      ...(variant.database ? ['mongo', 'history', 'notifications'] : []),
      'routes', 'listen', 'plc.run',
      ...(variant.secondary ? [variant.secondary] : [])
    ])
    if (variant.database) assert.equal(state.databaseName, variant.databaseName || variant.aps)
    assert.equal(exits.mock.callCount(), 0)
  })

  test(`${variant.name}: a failed bind terminates startup without starting PLC polling`, async t => {
    const { invoke, errors, exits } = setup(t, variant)
    state.bindFailure = true
    await invoke()
    assert.equal(state.events.includes('plc.run'), false)
    assert.equal(state.events.includes('plcw.run'), false)
    assert.deepEqual(exits.mock.calls[0].arguments, [1])
    const failure = errors.mock.calls[0].arguments[0]
    assert.equal(failure.aps, variant.aps)
    assert.equal(failure.port, variant.port)
    assert.ok(failure.err.message.includes(`Cannot listen on port ${variant.port}`))
  })

  test(`${variant.name}: database failures retain the original error and never open the listener`, { skip: !variant.database }, async t => {
    const { invoke, errors, exits } = setup(t, variant)
    state.databaseError = new Error('MongoDB unavailable')
    await invoke()
    assert.deepEqual(state.events, ['app', 'mongo'])
    assert.equal(errors.mock.calls[0].arguments[0].err, state.databaseError)
    assert.deepEqual(exits.mock.calls[0].arguments, [1])
  })

  test(`${variant.name}: asynchronous PLC startup errors are caught with their original stack`, async t => {
    const { invoke, errors, exits } = setup(t, variant)
    state.plcError = new Error('PLC startup rejected')
    await invoke()
    assert.equal(errors.mock.calls[0].arguments[0].err, state.plcError)
    assert.deepEqual(exits.mock.calls[0].arguments, [1])
    assert.equal(state.events.includes('plcw.run'), false)
  })

  test(`${variant.name}: polling waits for a successful listen callback`, async t => {
    const { invoke, exits } = setup(t, variant)
    state.deferListen = true
    const pending = invoke()
    await turn()
    assert.equal(state.events.at(-1), 'listen')
    assert.equal(state.events.includes('plc.run'), false)
    state.finishListen({})
    await pending
    await turn()
    assert.equal(state.events.includes('plc.run'), true)
    assert.equal(exits.mock.callCount(), 0)
  })
}
