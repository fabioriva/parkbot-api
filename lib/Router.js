import { parseISO/*, subDays */ } from 'date-fns'
import { format/*, toZonedTime */ } from 'date-fns-tz'
import pino from 'pino'
import querystring from 'querystring'
import checkAuth from './auth.js'
import { readJson, sendJson, Message } from './json.js'
import { /* getPlcDateTime, ReadArea, */WriteArea } from './utils7.js'

const logger = pino()

class Router {
  constructor (app, history, mailingList, plc) {
    this.app = app
    this.history = history
    this.mailingList = mailingList
    this.plc = plc
  }

  exec_time (ping, func_) {
    const pong = process.hrtime(ping)
    console.log(''.concat('Execution time in millisecond: ', (pong[0] * 1000000000 + pong[1]) / 1000000, func_))
  }

  log (req) {
    logger.info({
      'user-agent': req.getHeader('user-agent'),
      method: req.getMethod(),
      url: req.getUrl()
    })
  }

  cards (def, obj, prefix) {
    this.app.get(prefix + '/cards', (res, req) => {
      this.log(req)
      // const authorization = req.getHeader('authorization')
      // checkAuth(res, authorization, async (err, user) => {
      //   if (err) {
      //     res.writeStatus(err.statusCode.toString()).end(err.message)
      //   } else {
      //     sendJson(res, obj.cards)
      //   }
      // })
      sendJson(res, obj.cards)
    })
    this.app.post(prefix + '/card/edit', (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      readJson(
        res,
        async json => {
          checkAuth(res, authorization, async (err, user) => {
            if (err) {
              res.writeStatus(err.statusCode.toString()).end(err.message)
            } else {
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
                // buffer.writeUInt16BE(parseInt(code, 16), 2) // string to hex
                buffer.writeInt16BE(parseInt(code, 16), 2) // string to hex
                // const response = await this.plc.write(def.CARD_EDIT, buffer)
                const { area, dbNumber, start, amount, wordLen } = def.CARD_EDIT
                // const response = await this.plc.client.WriteArea(area, dbNumber, start, amount, wordLen, buffer)
                const response = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, buffer)
                sendJson(
                  res,
                  new Message(
                    response ? 'success' : 'error',
                    response ? 'Updated card ' + card : 'Write error!'
                  )
                )
              } else {
                sendJson(
                  res,
                  new Message('warning', 'PIN code regexp is not valid')
                )
              }
            }
          })
        },
        () => sendJson(res, new Message('error', 'Invalid JSON'))
      )
    })
    this.app.ws(prefix + '/cards', { open: ws => ws.subscribe('aps/cards') })
  }

  dashboard (def, obj, prefix) {
    this.app.get(prefix + '/dashboard', async (res, req) => {
      this.log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
      // let ping = process.hrtime()
      const activity = await this.history.getRecentActivity(5)
      // this.exec_time(ping, '[activity]')

      // ping = process.hrtime()
      const occupancy = obj.map.occupancy
      // this.exec_time(ping, '[occupancy]')

      // ping = process.hrtime()
      // const operations = await this.history.getOperations({ dateString: format(new Date(), 'yyyy-MM-dd') })
      const operations = await this.history.getOperations({ dateFrom: format(new Date(), 'yyyy-MM-dd'), dateTo: format(new Date(), 'yyyy-MM-dd') })
      // this.exec_time(ping, '[operations]')

      // ping = process.hrtime()
      const system = obj.devices.map((device) => {
        const clone = Object.assign({}, device)
        delete clone.views
        return clone
      })
      // this.exec_time(ping, '[system]')
      sendJson(res, {
        activity,
        occupancy,
        operations: [operations],
        system
      })
    })
  }

  dss (def, obj, prefix) {
    this.app.get(prefix + '/dss', (res, req) => {
      this.log(req)
      sendJson(res, obj.dss)
    })
    this.app.get(prefix + '/dss/exit', (res, req) => {
      this.log(req)
      sendJson(res, obj.dss.exitScreen)
    })
    this.app.get(prefix + '/dss/garage/:id', (res, req) => {
      this.log(req)
      sendJson(res, obj.screens[req.getParameter(0)])
    })
  }

  history_ (def, obj, prefix) {
    this.app.get(prefix + '/history', async (res, req) => {
      this.log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
      const query = querystring.parse(req.getQuery())
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
      this.log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const docs = await this.history.getLog(req.getParameter(0))
      sendJson(res, docs)
    })
  }

  map (def, obj, prefix) {
    this.app.get(prefix + '/map', (res, req) => {
      this.log(req)
      sendJson(res, obj.map)
    })
    this.app.get(prefix + '/stalls', (res, req) => {
      this.log(req)
      sendJson(res, obj.stalls)
    })
    this.app.post(prefix + '/map/edit', (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      readJson(
        res,
        async json => {
          checkAuth(res, authorization, async (err, user) => {
            if (err) {
              res.writeStatus(err.statusCode.toString()).end(err.message)
            } else {
              const card = parseInt(json.card)
              const stall = parseInt(json.stall)
              if (!Number.isInteger(card) || !Number.isInteger(stall)) {
                return sendJson(
                  res,
                  new Message('warning', 'Parameters not valid')
                )
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
              const found = obj.stalls.find(stall => stall.status === card)
              if (card !== FREE && card !== LOCK && found) {
                return sendJson(res, new Message('warning', 'Card in use'))
              }
              const buffer = Buffer.alloc(4)
              buffer.writeInt16BE(stall, 0)
              buffer.writeInt16BE(card, 2)
              const { area, dbNumber, start, amount, wordLen } = def.MAP_EDIT
              // const response = await this.plc.client.WriteArea(area, dbNumber, start, amount, wordLen, buffer)
              const response = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, buffer)
              if (response) this.plc.stall(def, obj, stall)
              sendJson(
                res,
                new Message(
                  response ? 'success' : 'error',
                  response ? 'Updated stall ' + stall : 'Write error!'
                )
              )
            }
          })
        },
        () => sendJson(res, new Message('error', 'Invalid JSON'))
      )
    })
    this.app.ws(prefix + '/map', { open: ws => ws.subscribe('aps/map') })
  }

  mailingList_ (def, obj, prefix) {
    this.app.get(prefix + '/mailingList', async (res, req) => {
      this.log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      const docs = await this.mailingList.get()
      sendJson(res, docs)
    })
    this.app.post(prefix + '/mailingList/add', (res, req) => {
      this.log(req)
      readJson(
        res,
        async json => {
          // console.log(json)
          const result = await this.mailingList.insertListItem(json)
          sendJson(res, result)
        },
        () => {
          sendJson(res, {
            type: 'error',
            info: 'Invalid JSON!'
          })
        }
      )
    })
    this.app.post(prefix + '/mailingList/remove', (res, req) => {
      this.log(req)
      readJson(
        res,
        async json => {
          // console.log(json)
          const result = await this.mailingList.deleteListItem(json)
          sendJson(res, result)
        },
        () => {
          sendJson(res, {
            type: 'error',
            info: 'Invalid JSON!'
          })
        }
      )
    })
  }

  operations_ (def, obj, prefix) {
    this.app.get(prefix + '/statistics', async (res, req) => {
      this.log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
      const query = querystring.parse(req.getQuery())
      const devices = await this.history.getDevices(query, obj.devices)
      const operations = await this.history.getOperations(query)
      sendJson(res, { devices, operations })
    })
  }

  overview (def, obj, prefix) {
    this.app.get(prefix + '/overview', (res, req) => {
      this.log(req)
      sendJson(res, obj.overview)
    })
    this.app.post(prefix + '/operation/entry', (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      readJson(
        res,
        async json => {
          checkAuth(res, authorization, async (err, user) => {
            if (err) {
              res.writeStatus(err.statusCode.toString()).end(err.message)
            } else {
              const card = parseInt(json.card)
              if (!Number.isInteger(card)) {
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
              const { area, dbNumber, start, amount, wordLen } = json.writeArea
              const buffer = Buffer.allocUnsafe(amount)
              buffer.writeUInt16BE(card, 0)
              // const response = await this.plc.client.WriteArea(area, dbNumber, start, amount, wordLen, buffer)
              const response = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, buffer)
              sendJson(
                res,
                new Message(
                  response ? 'success' : 'error',
                  response ? 'Sent request for card ' + card : 'Write error!'
                )
              )
            }
          })
        },
        () => sendJson(res, new Message('error', 'Invalid JSON'))
      )
    })
    this.app.post(prefix + '/operation/exit', (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      readJson(
        res,
        async json => {
          checkAuth(res, authorization, async (err, user) => {
            if (err) {
              res.writeStatus(err.statusCode.toString()).end(err.message)
            } else {
              const card = parseInt(json.card)
              if (!Number.isInteger(card)) {
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
              if (!obj.stalls.some(stall => stall.status === card)) {
                return sendJson(res, new Message('warning', 'Card not found'))
              }
              const { area, dbNumber, start, amount, wordLen } = json.writeArea
              const buffer = Buffer.allocUnsafe(amount)
              buffer.writeUInt16BE(card, 0)
              // const response = await this.plc.client.WriteArea(area, dbNumber, start, amount, wordLen, buffer)
              const response = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, buffer)
              sendJson(
                res,
                new Message(
                  response ? 'success' : 'error',
                  response ? 'Sent request for card ' + card : 'Write error!'
                )
              )
            }
          })
        },
        () => sendJson(res, new Message('error', 'Invalid JSON'))
      )
    })
    this.app.post(prefix + '/operation/rollback', (res, req) => {
      this.log(req)
      readJson(
        res,
        async json => {
          const { buffer, writeArea } = json
          // console.log(typeof buffer, buffer, writeArea)
          const { area, dbNumber, start, amount, wordLen } = writeArea
          // const response = await this.plc.client.WriteArea(area, dbNumber, start, amount, wordLen, Buffer.from(buffer))
          const response = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, Buffer.from(buffer))
          sendJson(
            res,
            new Message(
              response ? 'success' : 'error',
              response ? 'Written' : 'Write error!'
            )
          )
        },
        () => sendJson(res, new Message('error', 'Invalid JSON'))
      )
    })
    this.app.post(prefix + '/operation/pp', async (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      readJson(
        res,
        async json => {
          checkAuth(res, authorization, async (err, user) => {
            if (err) {
              res.writeStatus(err.statusCode.toString()).end(err.message)
            } else {
              const { key, value } = json
              const buffer = Buffer.allocUnsafe(4)
              buffer.writeUInt16BE(value, 0)
              buffer.writeUInt16BE(parseInt(key, 16), 2)
              const { area, dbNumber, start, amount, wordLen } = def.REQ_PP
              const response = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, buffer)
              // console.log(buffer, response)
              sendJson(
                res,
                new Message(
                  response ? 'success' : 'error',
                  response ? `Sent PP request key ${key} value ${value}` : 'Write error!'
                )
              )
            }
          })
        },
        () => sendJson(res, new Message('error', 'Invalid JSON'))
      )
    })
    this.app.post(prefix + '/queue/delete', (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      readJson(
        res,
        async json => {
          checkAuth(res, authorization, async (err, user) => {
            if (err) {
              res.writeStatus(err.statusCode.toString()).end(err.message)
            } else {
              const { card, index } = json
              const buffer = Buffer.alloc(def.QUEUE_DELETE.amount).fill(0)
              buffer.writeUInt16BE(index, 0)
              buffer.writeUInt16BE(card, 2)
              const { area, dbNumber, start, amount, wordLen } = def.QUEUE_DELETE
              // const response = await this.plc.client.WriteArea(area, dbNumber, start, amount, wordLen, buffer)
              const response = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, buffer)
              sendJson(
                res,
                new Message(
                  response ? 'success' : 'error',
                  response ? 'Deleted card ' + card : 'Write error!'
                )
              )
            }
          })
        },
        () => sendJson(res, new Message('error', 'Invalid JSON'))
      )
    })
    this.app.ws(prefix + '/overview', { open: ws => ws.subscribe('aps/overview') })
  }

  racks (def, obj, prefix) {
    this.app.get(prefix + '/racks', (res, req) => {
      this.log(req)
      // sendJson(res, obj.racks)
      sendJson(res, obj.racks.map(({ rack, ...rest }) => {
        return rack ? { ...rest, rack: { nr: rack.nr } } : rest
      }))
    })
    this.app.get(prefix + '/racks/:id', (res, req) => {
      this.log(req)
      sendJson(res, obj.racks[req.getParameter(0)]?.rack)
    })
    obj.racks.forEach((e, index) =>
      this.app.ws(prefix + '/racks/' + index, {
        open: ws => {
          ws.subscribe('aps/racks/' + index)
        }
      })
    )
  }

  run (def, obj) {
    const prefix = '/aps/' + def.APS
    this.app.get('/*', (res/*, req */) => res.end('Resource not found'))
    this.app.ws(prefix + '/info', { open: ws => ws.subscribe('aps/info') })
    this.app.ws(prefix + '/mqtt', { open: ws => ws.subscribe('aps/mqtt') })
    this.cards(def, obj, prefix)
    this.dashboard(def, obj, prefix)
    this.dss(def, obj, prefix)
    this.history_(def, obj, prefix)
    this.map(def, obj, prefix)
    this.mailingList_(def, obj, prefix)
    this.overview(def, obj, prefix)
    this.operations_(def, obj, prefix)
    this.racks(def, obj, prefix)
  }
}

export default Router
