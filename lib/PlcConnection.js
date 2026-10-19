import { promisify } from 'node:util'
import { PlcCommandError } from './utils7.js'

const connect = promisify((client, callback) => client.Connect(callback))
const connectTo = promisify((client, address, rack, slot, callback) => client.ConnectTo(address, rack, slot, callback))

export class PlcUnavailableError extends Error {
  constructor () {
    super('PLC not ready, try again after reconnection')
    this.name = 'PlcUnavailableError'
  }
}

// Callers pass the entire operation explicitly and await native calls in sequence.
// Operations on the same client, including disconnect, run one at a time.
export default class PlcConnection {
  constructor (client, { onUnavailable = () => {}, onDisconnectError = () => {}, canCommand = () => true } = {}) {
    this.client = client
    this.onUnavailable = onUnavailable
    this.onDisconnectError = onDisconnectError
    this.canCommand = canCommand
    this.state = 'disconnected'
    this.generation = 0
    this.tail = Promise.resolve()
  }

  get connected () {
    return this.state === 'loading' || this.state === 'ready'
  }

  get ready () {
    return this.state === 'ready' && this.canCommand()
  }

  markReady () {
    if (!this.connected) throw new PlcUnavailableError()
    this.state = 'ready'
  }

  enqueue (operation) {
    const result = this.tail.then(operation)
    this.tail = result.catch(() => {})
    return result
  }

  run (operation) {
    if (!this.connected) return Promise.reject(new PlcUnavailableError())
    const generation = this.generation
    return this.enqueue(async () => {
      // Never execute work queued before a disconnection on a new session.
      if (!this.connected || generation !== this.generation) throw new PlcUnavailableError()
      try {
        return await operation(this.client)
      } catch (error) {
        // A PLC refusal or an unconfirmed command does not imply a broken link.
        if (!(error instanceof PlcCommandError) && !(error instanceof PlcUnavailableError)) this.disconnect()
        throw error
      }
    })
  }

  runCommand (operation) {
    if (!this.ready) return Promise.reject(new PlcUnavailableError())
    return this.run(client => {
      if (!this.ready) throw new PlcUnavailableError()
      return operation(client)
    })
  }

  connectTo (address, rack, slot) {
    return this.open(client => connectTo(client, address, rack, slot))
  }

  connect () {
    return this.open(client => connect(client))
  }

  open (operation) {
    if (this.connected) return Promise.resolve(true)
    if (this.connecting?.generation === this.generation) return this.connecting.promise
    const attempt = { generation: ++this.generation }
    if (!this.disconnection) this.state = 'connecting'
    attempt.promise = this.enqueue(async () => {
      if (attempt.generation !== this.generation) return false
      this.state = 'connecting'
      try {
        await operation(this.client)
        if (attempt.generation !== this.generation) return false
        this.state = 'loading'
        return true
      } catch (error) {
        if (attempt.generation === this.generation) {
          this.state = 'faulted'
          this.onUnavailable()
        }
        throw error
      }
    })
    this.connecting = attempt
    const clear = () => {
      if (this.connecting === attempt) this.connecting = undefined
    }
    attempt.promise.then(clear, clear)
    return attempt.promise
  }

  disconnect () {
    if (this.disconnection) return this.disconnection
    if (this.state === 'disconnected') return Promise.resolve(true)
    this.state = 'disconnecting'
    this.generation++
    this.onUnavailable()
    this.disconnection = this.enqueue(() => {
      try {
        return this.client.Disconnect()
      } catch (error) {
        this.onDisconnectError(error)
        return false
      } finally {
        this.state = 'disconnected'
        this.disconnection = undefined
      }
    })
    return this.disconnection
  }
}
