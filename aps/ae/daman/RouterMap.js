import pino from 'pino'
import checkAuth, { checkSession } from '../../../lib/auth.js'
import { readJson, sendJson, Message } from '../../../lib/json.js'
import { /* getPlcDateTime, ReadArea, */WriteArea } from '../../../lib/utils7.js'

const logger = pino()

class Router {
  constructor (app, plc) {
    this.app = app
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

  map (def, obj, prefix) {
    this.app.get(prefix + '/map', (res, req) => {
      this.log(req)
      sendJson(res, obj.map)
    })
    // this.app.get(prefix + '/stalls', (res, req) => {
    //   this.log(req)
    //   sendJson(res, obj.stalls)
    // })
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

  run (def, obj) {
    const prefix = '/aps/' + def.APS
    this.app.get('/*', (res/*, req */) => res.end('Resource not found'))
    this.app.ws(prefix + '/info', { open: ws => ws.subscribe('aps/info') })
    this.app.ws(prefix + '/mqtt', { open: ws => ws.subscribe('aps/mqtt') })
    this.map(def, obj, prefix)
    // this.app.ws(prefix + '/map', { open: ws => ws.subscribe('aps/map') })
    //
    // this.app.get(prefix + '/app/map', (res, req) => {
    //   this.log(req)
    //   sendJson(res, obj.map)
    //   // const authorization = req.getHeader('authorization')
    //   // checkSession(res, def.APS, authorization, async (err) => {
    //   //   if (err) {
    //   //     console.log(err, err.message)
    //   //     res.cork(() => {
    //   //       res.writeStatus(err.statusCode.toString().concat(' ', err.message)).end('error!!!')
    //   //     })
    //   //   } else {
    //   //     sendJson(res, obj.map)
    //   //   }
    //   // })
    // })

    this.app.post(prefix + '/map/edit/app', async (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      // const json = await readJsonF(res)
      // console.log(json)

      readJson(res, async json => {
      // checkSession(res, def.APS, authorization, async (err) => {
        const err = await checkSession(res, def.APS, authorization)
        if (err) {
          console.log(err)
          // sendJson(res, { err })
          res.writeStatus(err.statusCode.toString()).end(err.message)
        } else {
        // const { stall, status } = json
          const card = parseInt(json.status)
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
              response ? `Updated stall ${stall} with status ${card}` : 'Write error!'
            )
          )
        // sendJson(res, { stall, status })
        }
      // })
      // sendJson(res, { json })
      }, () => console.log('Invalid JSON or no data at all!'))

      //   // readJson(
      //   //   res,
      //   //   async json => {
      //   //     console.log(authorization, json)

      //   //     sendJson(res, { api: prefix + '/app/map/edit' })
      //   //   }, () => sendJson(res, new Message('error', 'Invalid JSON')))

      //   // readJson(res, (json) => {
      //   //   console.log('Posted to ' + authorization + ': ')
      //   //   console.log(obj)

    //   //   // res.end('Thanks for this json!')
    //   //   sendJson(res, json)
    //   // }, () => {
    //   //   /* Request was prematurely aborted or invalid or missing, stop reading */
    //   //   console.log('Invalid JSON or no data at all!')
    //   // })
    //   // sendJson(res, { api: prefix + '/app/map/edit', authorization })
    })
  }
}

export default Router
