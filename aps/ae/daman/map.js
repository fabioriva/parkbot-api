import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
// import * as str from './str.js'
import obj from './obj.js'
// import mongo from '../../../lib/db.js'
// import History from '../../../lib/History.js'
// import MailingList from '../../../lib/MailingList.js'
// import Plc from '../../../lib/Plc.js'
// import Plc from './Plc.js'
import Map from './PlcMap.js'
import Router from '../../../lib/Router.js'
// import Router from './Router.js'
// import { updateOnLog } from '../../../lib/Log.js'
import checkAuth from '../../../lib/auth.js'
import { readJson, sendJson, Message } from '../../../lib/json.js'
import { WriteArea } from '../../../lib/utils7.js'

const main = async () => {
  try {
    const app = uWS.App().listen(9136, token => console.info(token))
    // const db = await mongo(def.APS, str)
    // const history = new History(db)
    // const mailingList = new MailingList(db)
    // PLC I/O
    // const plc = new Plc(def.PLC)
    // plc.on('log', async log => {
    //   updateOnLog(def, log, obj, plc)
    //   const doc = await history.saveLog(log)
    //   mailingList.sendMail(def.APS, doc)
    //   app.publish('aps/info', JSON.stringify({ notification: doc }))
    // })
    // plc.on('pub', ({ channel, data }) => app.publish(channel, data))
    // plc.run(def, obj)
    // PLC Map
    const plc = new Map(def.PLC_MAP)
    plc.on('pub', ({ channel, data }) => app.publish(channel, data))
    plc.run(def, obj)
    // API routes
    // const router = new Router(app, history, mailingList, plc)
    // router.run(def, obj)
    const prefix = '/aps/' + def.APS
    // app.get('/*', (res/*, req */) => res.end('Resource not found'))
    // app.get(prefix + '/app/map', (res, req) => {
    //   // this.log(req)
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
    // app.post(prefix + '/app/map/edit', async (res, req) => {
    //   // this.log(req)
    //   const authorization = req.getHeader('authorization')
    //   readJson(res, async json => {
    //     checkSession(res, def.APS, authorization, async (err) => {
    //       if (err) {
    //         console.log(err)
    //         // sendJson(res, { err })
    //         res.writeStatus(err.statusCode.toString()).end(err.message)
    //       } else {
    //         // const { stall, status } = json
    //         console.log(json)
    //         const card = parseInt(json.status)
    //         const stall = parseInt(json.stall)
    //         if (!Number.isInteger(card) || !Number.isInteger(stall)) {
    //           return sendJson(
    //             res,
    //             new Message('warning', 'Parameters not valid')
    //           )
    //         }
    //         if (stall < 1 || stall > def.STALLS) {
    //           return sendJson(res, new Message('warning', 'Stall not valid'))
    //         }
    //         const { FREE, LOCK } = def.STALL_STATUS
    //         const minCard = def.MIN_CARD !== undefined ? def.MIN_CARD : 1
    //         const maxCard = def.MAX_CARD !== undefined ? def.MAX_CARD : def.CARDS
    //         if (
    //           card !== FREE &&
    //             card !== LOCK &&
    //             (card < minCard || card > maxCard)
    //         ) {
    //           return sendJson(res, new Message('warning', 'Card not valid'))
    //         }
    //         const found = obj.stalls.find(stall => stall.status === card)
    //         if (card !== FREE && card !== LOCK && found) {
    //           return sendJson(res, new Message('warning', 'Card in use'))
    //         }
    //         const buffer = Buffer.alloc(4)
    //         buffer.writeInt16BE(stall, 0)
    //         buffer.writeInt16BE(card, 2)
    //         const { area, dbNumber, start, amount, wordLen } = def.MAP_EDIT
    //         // const response = await this.plc.client.WriteArea(area, dbNumber, start, amount, wordLen, buffer)
    //         const response = await WriteArea(map.client, area, dbNumber, start, amount, wordLen, buffer)
    //         console.log(response ? 'success' : 'error')
    //         if (response) map.stall(def, obj, stall)
    //         sendJson(
    //           res,
    //           new Message(
    //             response ? 'success' : 'error',
    //             response ? `Updated stall ${stall} with status ${card}` : 'Write error!'
    //           )
    //         )
    //         // sendJson(res, { stall, status })
    //       }
    //     })
    //     // sendJson(res, { json })
    //   }, () => console.log('Invalid JSON or no data at all!'))

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
    // })
    // app.ws(prefix + '/map', { open: ws => ws.subscribe('aps/map') })
    app.get(prefix + '/map', (res, req) => {
      // this.log(req)
      sendJson(res, obj.map)
    })
    app.get(prefix + '/stalls', (res, req) => {
      // this.log(req)
      sendJson(res, obj.stalls)
    })
    app.post(prefix + '/map/edit', (res, req) => {
      // this.log(req)
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
              const response = await WriteArea(plc.client, area, dbNumber, start, amount, wordLen, buffer)
              if (response) plc.stall(def, obj, stall)
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
    app.ws(prefix + '/map', { open: ws => ws.subscribe('aps/map') })
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

main()
