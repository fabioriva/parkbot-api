import { parseISO /*, subDays */ } from 'date-fns'
import { format /*, toZonedTime */ } from 'date-fns-tz'
import pino from 'pino'
import querystring from 'querystring'
import { checkAuth } from './auth.js'
import { readJson, sendJson, Message } from './json.js'
import { /* getPlcDateTime, ReadArea, */ WriteArea } from './utils7.js'

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
  constructor (app, history, mailingList, plc) {
    this.app = app
    this.history = history
    this.mailingList = mailingList
    this.plc = plc
  }

  cards (def, obj, prefix) {
    this.app.get(prefix + '/cards', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      sendJson(res, obj.cards)
    })
    this.app.post(prefix + '/card/edit', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }

      const { card, code } = json
      const minCard = def.MIN_CARD !== undefined ? def.MIN_CARD : 1
      const maxCard = def.MAX_CARD !== undefined ? def.MAX_CARD : def.CARDS
      if (card < minCard || card > maxCard) {
        return sendJson(res, new Message('warning', 'Card not valid'))
      }
      const regexp = /^[a-fA-F0-9]{3}$/
      if (regexp.test(code) || code === -1) {
        const buffer = Buffer.alloc(4)
        buffer.writeUInt16BE(card, 0)
        buffer.writeInt16BE(parseInt(code, 16), 2) // string to hex
        const { area, dbNumber, start, amount, wordLen } = def.CARD_EDIT
        const response = await WriteArea(
          this.plc.client,
          area,
          dbNumber,
          start,
          amount,
          wordLen,
          buffer
        )
        sendJson(
          res,
          new Message(
            response ? 'success' : 'error',
            response ? 'Updated card ' + card : 'Write error!'
          )
        )
      } else {
        sendJson(res, new Message('warning', 'PIN code regexp is not valid'))
      }
    })
    this.app.ws(prefix + '/cards', { open: (ws) => ws.subscribe('aps/cards') })
  }

  dashboard (def, obj, prefix) {
    this.app.get(prefix + '/dashboard', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }

      // let ping = process.hrtime()
      const activity = await this.history.getRecentActivity(5)
      // exec_time(ping, '[activity]')

      // ping = process.hrtime()
      const occupancy = obj.map.occupancy
      // exec_time(ping, '[occupancy]')

      // ping = process.hrtime()
      // const operations = await this.history.getOperations({ dateString: format(new Date(), 'yyyy-MM-dd') })
      const operations = await this.history.getOperations({
        dateFrom: format(new Date(), 'yyyy-MM-dd'),
        dateTo: format(new Date(), 'yyyy-MM-dd')
      })
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
    this.app.get(prefix + '/history', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const query = querystring.parse(req.getQuery())
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }

      const docs = await this.history.get(query)
      const result = {
        count: docs.length,
        dateFrom: format(parseISO(query.dateFrom), 'yyyy-MM-dd HH:mm'),
        dateTo: format(parseISO(query.dateTo), 'yyyy-MM-dd HH:mm'),
        // dateFrom: format(utcToZonedTime(parseISO(query.dateFrom), 'UTC'), 'yyyy-MM-dd HH:mm', {
        //   timeZone: 'UTC'
        // }),
        // dateTo: format(utcToZonedTime(parseISO(query.dateTo), 'UTC'), 'yyyy-MM-dd HH:mm', {
        //   timeZone: 'UTC'
        // }),
        query: docs
      }
      sendJson(res, result) // docs)
    })
    this.app.get(prefix + '/history/:id', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      const docs = await this.history.getLog(req.getParameter(0))
      sendJson(res, docs)
    })
  }

  map (def, obj, prefix) {
    this.app.get(prefix + '/map', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      sendJson(res, obj.map)
    })
    this.app.get(prefix + '/stalls', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      sendJson(res, obj.stalls)
    })
    this.app.post(prefix + '/map/edit', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      const card = parseInt(json.card)
      const stall = parseInt(json.stall)
      if (!Number.isInteger(card) || !Number.isInteger(stall)) {
        return sendJson(res, new Message('warning', 'Parameters not valid'))
      }
      if (stall < 1 || stall > def.STALLS) {
        return sendJson(res, new Message('warning', 'Stall not valid'))
      }
      const { FREE, LOCK } = def.STALL_STATUS
      const minCard = def.MIN_CARD !== undefined ? def.MIN_CARD : 1
      const maxCard = def.MAX_CARD !== undefined ? def.MAX_CARD : def.CARDS
      if (
        card !== FREE &&
        card !== LOCK &&
        (card < minCard || card > maxCard)
      ) {
        return sendJson(res, new Message('warning', 'Card not valid'))
      }
      const found = obj.stalls.find((stall) => stall.status === card)
      if (card !== FREE && card !== LOCK && found) {
        return sendJson(res, new Message('warning', 'Card in use'))
      }
      const buffer = Buffer.alloc(4)
      buffer.writeInt16BE(stall, 0)
      buffer.writeInt16BE(card, 2)
      const { area, dbNumber, start, amount, wordLen } = def.MAP_EDIT
      const response = await WriteArea(
        this.plc.client,
        area,
        dbNumber,
        start,
        amount,
        wordLen,
        buffer
      )
      if (response) {
        const doc = await this.history.saveAction({
          alarm: 0,
          card,
          date: new Date(format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")),
          device: 0,
          mode: 0,
          operation: 10, // 'op-req-exit'
          size: 0,
          stall,
          user: 'f.riva@sotefin.ch'
        })
        console.log(doc)
        this.plc.stall(def, obj, stall)
      }
      sendJson(
        res,
        new Message(
          response ? 'success' : 'error',
          response ? 'Updated stall ' + stall : 'Write error!'
        )
      )
    })
    this.app.ws(prefix + '/map', { open: (ws) => ws.subscribe('aps/map') })
  }

  operations_ (def, obj, prefix) {
    this.app.get(prefix + '/statistics', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const query = querystring.parse(req.getQuery())
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      const cards = await this.history.getCards(query)
      const devices = await this.history.getDevices(query, obj.devices)
      const operations = await this.history.getOperations(query)
      sendJson(res, { cards, devices, operations })
    })
  }

  overview (def, obj, prefix) {
    this.app.get(prefix + '/overview', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      sendJson(res, obj.overview)
    })
    this.app.post(prefix + '/operation/entry', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      const card = parseInt(json.card)
      const entry = parseInt(json.entry)
      if (!Number.isInteger(card) || !Number.isInteger(entry)) {
        return sendJson(
          res,
          new Message('warning', 'Parameters not valid')
        )
      }
      const minCard = def.MIN_CARD !== undefined ? def.MIN_CARD : 1
      const maxCard = def.MAX_CARD !== undefined ? def.MAX_CARD : def.CARDS
      if (card < minCard || card > maxCard) {
        return sendJson(res, new Message('warning', 'Card not valid'))
      }
      if (obj.stalls.some(stall => stall.status === card)) {
        return sendJson(res, new Message('warning', 'Card in use'))
      }
      if (entry <= def.REQ_ENTRY) {
        return sendJson(res, new Message('warning', 'Entry not valid'))
      }
      const { area, dbNumber, start, amount, wordLen } = def.REQ_ENTRY[entry - 1]
      const buffer = Buffer.allocUnsafe(amount)
      buffer.writeUInt16BE(card, 0)
      const response = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, buffer)
      sendJson(
        res,
        new Message(
          response ? 'success' : 'error',
          response ? 'Sent request for card ' + card : 'Write error!'
        )
      )
    })
    this.app.post(prefix + '/operation/exit', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      const card = parseInt(json.card)
      if (!Number.isInteger(card)) {
        return sendJson(res, new Message('warning', 'Parameters not valid'))
      }
      const minCard = def.MIN_CARD !== undefined ? def.MIN_CARD : 1
      const maxCard = def.MAX_CARD !== undefined ? def.MAX_CARD : def.CARDS
      if (card < minCard || card > maxCard) {
        return sendJson(res, new Message('warning', 'Card not valid'))
      }
      if (!obj.stalls.some((stall) => stall.status === card)) {
        return sendJson(res, new Message('warning', 'Card not found'))
      }
      const { area, dbNumber, start, amount, wordLen } = def.REQ_0
      const buffer = Buffer.allocUnsafe(amount)
      buffer.writeUInt16BE(card, 0)
      const response = await WriteArea(
        this.plc.client,
        area,
        dbNumber,
        start,
        amount,
        wordLen,
        buffer
      )
      sendJson(
        res,
        new Message(
          response ? 'success' : 'error',
          response ? 'Sent request for card ' + card : 'Write error!'
        )
      )
    })
    // this.app.post(prefix + '/operation/rollback', (res, req) => {
    //   log(req)
    //   readJson(
    //     res,
    //     async json => {
    //       const { buffer, writeArea } = json
    //       // console.log(typeof buffer, buffer, writeArea)
    //       const { area, dbNumber, start, amount, wordLen } = writeArea
    //       // const response = await this.plc.client.WriteArea(area, dbNumber, start, amount, wordLen, Buffer.from(buffer))
    //       const response = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, Buffer.from(buffer))
    //       sendJson(
    //         res,
    //         new Message(
    //           response ? 'success' : 'error',
    //           response ? 'Written' : 'Write error!'
    //         )
    //       )
    //     },
    //     () => sendJson(res, new Message('error', 'Invalid JSON'))
    //   )
    // })
    this.app.post(prefix + '/operation/pp', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }

      const { device, key, value } = json
      const buffer = Buffer.allocUnsafe(4)
      buffer.writeUInt16BE(value, 0)
      buffer.writeUInt8(parseInt(key, 16), 2)
      buffer.writeUInt8(device, 3)
      const { area, dbNumber, start, amount, wordLen } = def.REQ_PP
      const response = await WriteArea(
        this.plc.client,
        area,
        dbNumber,
        start,
        amount,
        wordLen,
        buffer
      )
      sendJson(
        res,
        new Message(
          response ? 'success' : 'error',
          response ? `Sent PP request ${value} + ${key}` : 'Write error!'
        )
      )
    })
    this.app.post(prefix + '/queue/delete', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const json = await readJson(res)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }

      const { card, index } = json
      const buffer = Buffer.alloc(def.QUEUE_DELETE.amount).fill(0)
      buffer.writeUInt16BE(index, 0)
      buffer.writeUInt16BE(card, 2)
      const { area, dbNumber, start, amount, wordLen } = def.QUEUE_DELETE
      const response = await WriteArea(
        this.plc.client,
        area,
        dbNumber,
        start,
        amount,
        wordLen,
        buffer
      )
      sendJson(
        res,
        new Message(
          response ? 'success' : 'error',
          response ? 'Deleted card ' + card : 'Write error!'
        )
      )
    })
    this.app.ws(prefix + '/overview', {
      open: (ws) => ws.subscribe('aps/overview')
    })
  }

  racks (def, obj, prefix) {
    this.app.get(prefix + '/racks', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      sendJson(
        res,
        obj.racks.map(({ rack, ...rest }) => {
          return rack ? { ...rest, rack: { nr: rack.nr } } : rest
        })
      )
    })
    this.app.get(prefix + '/racks/:id', async (res, req) => {
      log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const id = req.getParameter(0)
      const headers = getHeaders(req)
      const session = await checkAuth(headers)
      if (!session) { return sendJson(res, { error: 'Unauthorized' }, '401 Unauthorized') }
      sendJson(res, obj.racks[id]?.rack)
    })
    obj.racks.forEach((e, index) =>
      this.app.ws(prefix + '/racks/' + index, {
        open: (ws) => {
          ws.subscribe('aps/racks/' + index)
        }
      })
    )
  }

  run (def, obj) {
    const prefix = '/api/aps/' + def.APS
    this.app.get('/*', (res /*, req */) => res.end('Resource not found'))
    this.app.ws(prefix + '/info', { open: (ws) => ws.subscribe('aps/info') })
    this.app.ws(prefix + '/mqtt', { open: (ws) => ws.subscribe('aps/mqtt') })
    this.cards(def, obj, prefix)
    this.dashboard(def, obj, prefix)
    this.history_(def, obj, prefix)
    this.map(def, obj, prefix)
    this.operations_(def, obj, prefix)
    this.overview(def, obj, prefix)
    this.racks(def, obj, prefix)
  }
}

export default Router
