import { formatInTimeZone } from 'date-fns-tz'
import pino from 'pino'
import querystring from 'querystring'
import { authorize } from './auth.js'
import { AuthorizationError } from './authorization.js'
import { authenticatedWebSocket } from './websocket-auth.js'
import { readJson, sendJson, Message, JsonRequestError } from './json.js'
import { ParkingOperations, ParkingRequestError, PlcParkingCommands, PpOperations, PpRequestError, PlcPpCommands } from '../models/Parking.js'
import { QueueOperations, QueueRequestError, PlcQueueCommands } from '../models/Queue.js'
import { StallOperations, StallRequestError, PlcStallCommands } from '../models/Stall.js'
import { CardOperations, CardRequestError, PlcCardCommands } from '../models/Card.js'
import PlcClockCommands from '../models/PlcClock.js'

const logger = pino()

function log (req) {
  logger.info({
    'user-agent': req.getHeader('user-agent'),
    method: req.getMethod(),
    url: req.getUrl()
  })
}

function getHeaders (req) {
  const headers = {} // Extract headers into a plain object BEFORE any await
  req.forEach((key, value) => {
    headers[key] = value
  })
  return headers
}

class Router {
  constructor (app, history, notifications, plc) {
    this.app = app
    this.history = history
    this.notifications = notifications
    this.plc = plc
  }

  http (method, path, handler) {
    this.app[method](path, async (res, req) => {
      try {
        // HTTP clients use explicit bearer credentials; cookies are used only
        // for WebSocket upgrades, where the browser cannot set this header.
        if (!/^Bearer\s+\S+$/i.test(req.getHeader('authorization'))) {
          return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized')
        }
        await handler(res, req)
      } catch (error) {
        if (res.aborted || res.completed) return
        if (error instanceof JsonRequestError) {
          return sendJson(res, { error: error.message }, error.statusCode === 413 ? '413 Payload Too Large' : '400 Bad Request')
        }
        if (error instanceof AuthorizationError) {
          return sendJson(res, { error: error.message }, error.status === 401 ? '401 Unauthorized' : '403 Forbidden')
        }
        logger.error({ err: error }, 'Request failed')
        sendJson(res, { error: 'Internal server error' }, '500 Internal Server Error')
      }
    })
  }

  ws (path, aps, permission, topic) {
    this.app.ws(path, authenticatedWebSocket({ authorize, aps, permission, topic }))
  }

  cards (def, obj, prefix) {
    const cards = new CardOperations({
      def,
      obj,
      plc: new PlcCardCommands({ client: this.plc.client, def }),
      history: this.history
    })
    this.http('get', prefix + '/cards', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'read')
      if (res.aborted) return
      sendJson(res, obj.cards)
    })
    this.http('post', prefix + '/card/edit', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      const session = await authorize(headers, def.APS, 'pin.edit')
      if (res.aborted) return

      try {
        const { card, written } = await cards.updatePin({
          card: json.card, code: json.code, user: session.user.email
        })
        sendJson(
          res,
          new Message(
            written ? 'success' : 'error',
            written ? 'Updated card ' + card : 'Write error!'
          )
        )
      } catch (error) {
        if (!(error instanceof CardRequestError)) throw error
        sendJson(res, new Message('warning', error.message))
      }
    })
    this.ws(prefix + '/cards', def.APS, 'read', 'aps/cards')
  }

  dashboard (def, obj, prefix) {
    this.http('get', prefix + '/dashboard', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'read')
      if (res.aborted) return

      // let ping = process.hrtime()
      const activity = await this.history.getRecentActivity(5)
      // exec_time(ping, '[activity]')

      // ping = process.hrtime()
      const occupancy = obj.map.occupancy
      // exec_time(ping, '[occupancy]')

      // ping = process.hrtime()
      const timeZone = def.TIME_ZONE || process.env.APS_TIME_ZONE || 'UTC'
      const today = formatInTimeZone(new Date(), timeZone, 'yyyy-MM-dd')
      const operations = await this.history.getOperations({
        dateFrom: today,
        dateTo: today
      }, timeZone)
      // exec_time(ping, '[operations]')

      // ping = process.hrtime()
      const system = obj.devices.map((device) => {
        const clone = Object.assign({}, device)
        delete clone.views
        return clone
      })
      // exec_time(ping, '[system]')
      sendJson(res, {
        activity,
        occupancy,
        operations: [operations],
        exitQueue: obj.overview.exitQueue,
        system
      })
    })
  }

  history_ (def, obj, prefix) {
    this.http('get', prefix + '/history', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const query = querystring.parse(req.getQuery())
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'read')
      if (res.aborted) return
      const devices = obj.devices.map(({ id, name }) => ({ id, name }))
      devices.unshift({ id: 0, name: 'All' })
      const history = await this.history.get(query)
      sendJson(res, {
        devices,
        hasMore: history.hasMore,
        query: history.data,
        total: history.total
      })
    })
    this.http('get', prefix + '/history/:id', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const id = req.getParameter(0)
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'read')
      if (res.aborted) return
      const docs = await this.history.getLog(id)
      sendJson(res, docs)
    })
  }

  map (def, obj, prefix) {
    const stalls = new StallOperations({
      def,
      obj,
      plc: new PlcStallCommands({ client: this.plc.client, def }),
      history: this.history
    })
    this.http('get', prefix + '/map', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'read')
      if (res.aborted) return
      sendJson(res, obj.map)
    })
    this.http('get', prefix + '/stalls', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'read')
      if (res.aborted) return
      sendJson(res, obj.stalls)
    })
    this.http('post', prefix + '/map/edit', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      const session = await authorize(headers, def.APS, 'map.edit')
      if (res.aborted) return
      try {
        const { stall, written } = await stalls.updateStall({
          card: json.card, stall: json.stall, user: session.user.email
        })
        sendJson(
          res,
          new Message(
            written ? 'success' : 'error',
            written ? 'Updated stall ' + stall : 'Write error!'
          )
        )
      } catch (error) {
        if (!(error instanceof StallRequestError)) throw error
        sendJson(res, new Message('warning', error.message))
      }
    })
    this.ws(prefix + '/map', def.APS, 'read', 'aps/map')
  }

  operations_ (def, obj, prefix) {
    this.http('get', prefix + '/statistics', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const query = querystring.parse(req.getQuery())
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'read')
      if (res.aborted) return
      // const cards = await this.history.getCards(query)
      const timeZone = def.TIME_ZONE || process.env.APS_TIME_ZONE || 'UTC'
      try {
        const devices = await this.history.getDevices(query, obj.devices, timeZone)
        const operations = await this.history.getOperations(query, timeZone)
        sendJson(res, { devices, operations })
      } catch (error) {
        if (!(error instanceof RangeError)) throw error
        sendJson(res, { error: error.message }, '400 Bad Request')
      }
    })
  }

  overview (def, obj, prefix) {
    const pp = new PpOperations({
      obj,
      plc: new PlcPpCommands({ client: this.plc.client, def }),
      history: this.history
    })
    this.http('get', prefix + '/overview', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'technical.read')
      if (res.aborted) return
      sendJson(res, obj.overview)
    })
    this.http('post', prefix + '/operation/pp', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      const session = await authorize(headers, def.APS, 'pp')
      if (res.aborted) return

      try {
        const { value, key, written } = await pp.requestPp({
          device: json.device, key: json.key, value: json.value, user: session.user.email
        })
        sendJson(
          res,
          new Message(
            written ? 'success' : 'error',
            written ? `Sent PP request ${value} + ${key}` : 'Write error!'
          )
        )
      } catch (error) {
        if (!(error instanceof PpRequestError)) throw error
        sendJson(res, new Message('warning', error.message))
      }
    })
    this.ws(prefix + '/overview', def.APS, 'technical.read', 'aps/overview')
  }

  racks (def, obj, prefix) {
    this.http('get', prefix + '/racks', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'technical.read')
      if (res.aborted) return
      sendJson(
        res,
        obj.racks.map(({ rack, ...rest }) => {
          return rack ? { ...rest, rack: { nr: rack.nr } } : rest
        })
      )
    })
    this.http('get', prefix + '/racks/:id', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const id = req.getParameter(0)
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'technical.read')
      if (res.aborted) return
      const rack = obj.racks[id]?.rack
      if (rack === undefined) return sendJson(res, { error: 'Rack not found' }, '404 Not Found')
      sendJson(res, rack)
    })
    obj.racks.forEach((e, index) =>
      this.ws(prefix + '/racks/' + index, def.APS, 'technical.read', 'aps/racks/' + index)
    )
  }

  notifications_ (def, obj, prefix) {
    this.http('get', prefix + '/notifications', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'notifications')
      if (res.aborted) return
      const recipients = await this.notifications.get()
      sendJson(res, { recipients })
    })
    this.http('post', prefix + '/notifications/add', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      await authorize(headers, def.APS, 'notifications')
      if (res.aborted) return
      const result = await this.notifications.add(json)
      sendJson(res, { result })
    })
    this.http('post', prefix + '/notifications/delete', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      await authorize(headers, def.APS, 'notifications')
      if (res.aborted) return
      const result = await this.notifications.delete(json)
      sendJson(res, { result })
    })
    this.http('post', prefix + '/notifications/update', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      await authorize(headers, def.APS, 'notifications')
      if (res.aborted) return
      const result = await this.notifications.update(json)
      sendJson(res, { result })
    })
    this.http('get', prefix + '/recipients', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'notifications')
      if (res.aborted) return
      const recipients = await this.notifications.getRecipients()
      sendJson(res, { recipients })
    })
  }

  queue_ (def, obj, prefix) {
    const queue = new QueueOperations({
      obj,
      plc: new PlcQueueCommands({ client: this.plc.client, def }),
      history: this.history
    })
    this.http('post', prefix + '/queue/delete', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      const session = await authorize(headers, def.APS, 'queue.delete')
      if (res.aborted) return

      try {
        const { card, written } = await queue.deleteRequest({
          card: json.card, index: json.index, user: session.user.email
        })
        sendJson(
          res,
          new Message(
            written ? 'success' : 'error',
            written ? 'Deleted card ' + card : 'Write error!'
          )
        )
      } catch (error) {
        if (!(error instanceof QueueRequestError)) throw error
        sendJson(res, new Message('warning', error.message))
      }
    })
  }

  parking_ (def, obj, prefix) {
    const parking = new ParkingOperations({
      def,
      obj,
      plc: new PlcParkingCommands({ client: this.plc.client, def }),
      history: this.history
    })
    this.http('post', prefix + '/operation/exit', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      const session = await authorize(headers, def.APS, 'exit')
      if (res.aborted) return
      try {
        const { card, written } = await parking.requestExit({ card: json.card, user: session.user.email })
        sendJson(
          res,
          new Message(
            written ? 'success' : 'error',
            written ? 'Sent request for card ' + card : 'Write error!'
          )
        )
      } catch (error) {
        if (!(error instanceof ParkingRequestError)) throw error
        sendJson(res, new Message('warning', error.message))
      }
    })
    this.http('post', prefix + '/operation/entry', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      const session = await authorize(headers, def.APS, 'entry')
      if (res.aborted) return
      try {
        const { card, written } = await parking.requestEntry({
          card: json.card, entry: json.entry, user: session.user.email
        })
        sendJson(
          res,
          new Message(
            written ? 'success' : 'error',
            written ? 'Sent request for card ' + card : 'Write error!'
          )
        )
      } catch (error) {
        if (!(error instanceof ParkingRequestError)) throw error
        sendJson(res, new Message('warning', error.message))
      }
    })
    this.http('post', prefix + '/operation/rollback', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      if (res.aborted) return
      const session = await authorize(headers, def.APS, 'rollback')
      if (res.aborted) return
      try {
        const { card, written } = await parking.requestRollback({
          card: json.card, entry: json.entry, user: session.user.email
        })
        sendJson(
          res,
          new Message(
            written ? 'success' : 'error',
            written ? 'Sent request for card ' + card : 'Write error!'
          )
        )
      } catch (error) {
        if (!(error instanceof ParkingRequestError)) throw error
        sendJson(res, new Message('warning', error.message))
      }
    })
  }

  run (def, obj) {
    const prefix = '/api/aps/' + def.APS
    const clock = new PlcClockCommands({ client: this.plc.client })
    this.http('get', prefix + '/set-now', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      await authorize(headers, def.APS, 'clock.set')
      if (res.aborted) return
      const now = new Date()
      await clock.setClock(now)
      // console.log('Orologio PLC aggiornato')
      sendJson(res, { now })
    })
    this.app.get('/*', (res /*, req */) => res.end('Resource not found'))
    this.ws(prefix + '/info', def.APS, 'read', 'aps/info')
    this.ws(prefix + '/mqtt', def.APS, 'technical.read', 'aps/mqtt')
    this.cards(def, obj, prefix)
    this.dashboard(def, obj, prefix)
    this.history_(def, obj, prefix)
    this.map(def, obj, prefix)
    this.notifications_(def, obj, prefix)
    this.operations_(def, obj, prefix)
    this.overview(def, obj, prefix)
    this.queue_(def, obj, prefix)
    this.parking_(def, obj, prefix)
    this.racks(def, obj, prefix)
  }
}

export default Router
