import pino from 'pino'
import querystring from 'querystring'
import { /* readJson, */ sendJson, Message, MESG, SEVERITY } from './json.js'
import { writeArea } from './utils7.js'

const logger = pino()

class Router {
  constructor (app, plc) {
    this.app = app
    this.plc = plc
  }

  log (req) {
    logger.info({
      'user-agent': req.getHeader('user-agent'),
      method: req.getMethod(),
      url: req.getUrl()
    })
  }

  run (def, obj) {
    // const prefix = "/interface/" + def.APS;
    const prefix = '/api'
    /* Endpoint /bay */
    this.app.get(prefix + '/bay', (res, req) => {
      this.log(req)
      const bay = Math.floor(Math.random() * 5) // Expected output: 0, 1, 2, 3 or 4
      sendJson(res, { bay })
    })
    /* Endpoint /overview */
    this.app.get(prefix + '/overview', (res, req) => {
      this.log(req)
      sendJson(res, obj.overview)
    })
    /* Endpoint /map */
    this.app.get(prefix + '/map', (res, req) => {
      this.log(req)
      sendJson(res, obj.map)
    })
    /* Endpoint /entry?bay=x&card=y */
    this.app.get(prefix + '/entry', async (res, req) => {
      this.log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
      const query = querystring.parse(req.getQuery())
      const bay = parseInt(query.bay)
      const card = parseInt(query.card)
      if (!Number.isInteger(card)) {
        return sendJson(
          res,
          new Message(SEVERITY.WARNING, MESG.CARD_NOT_VALID)
        )
      }
      if (card < 1 || card > def.CARDS) {
        return sendJson(
          res,
          new Message(SEVERITY.WARNING, MESG.CARD_NOT_VALID)
        )
      }
      if (obj.stalls.some((stall) => stall.status === card)) {
        return sendJson(res, new Message(SEVERITY.WARNING, MESG.CARD_IN_USE))
      }
      if (obj.overview.devices.some((item) => item.card === card)) {
        return sendJson(
          res,
          new Message(SEVERITY.WARNING, MESG.CARD_IN_OPERATION)
        )
      }
      let write
      switch (bay) {
        case 1:
          write = def.REQ_1
          break

        case 2:
          write = def.REQ_2
          break

        case 3:
          write = def.REQ_3
          break

        case 4:
          write = def.REQ_4
          break

        default:
          return sendJson(
            res,
            new Message(SEVERITY.WARNING, MESG.BAY_NOT_VALID)
          )
      }
      if (obj.overview.bays[bay - 1].status !== 2) {
        return sendJson(res, new Message(SEVERITY.WARNING, MESG.BAY_NOT_READY))
      }
      const { area, dbNumber, start, amount, wordLen } = write
      const buffer = Buffer.allocUnsafe(amount)
      buffer.writeUInt16BE(card, 0)
      const response = await writeArea(
        this.plc.client,
        area,
        dbNumber,
        start,
        amount,
        wordLen,
        buffer
      )
      return sendJson(
        res,
        new Message(
          response ? SEVERITY.SUCCESS : SEVERITY.ERROR,
          response ? MESG.ENTRY_OK : MESG.WRITE_ERROR
        )
      )
    })
    /* Endpoint /entry/close?bay=x */
    this.app.get(prefix + '/entry/close', async (res, req) => {
      this.log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
      const query = querystring.parse(req.getQuery())
      const bay = parseInt(query.bay)
      let write
      switch (bay) {
        case 1:
          write = def.E1_CLS
          break

        case 2:
          write = def.E2_CLS
          break

        case 3:
          write = def.E3_CLS
          break

        case 4:
          write = def.E4_CLS
          break

        default:
          return sendJson(
            res,
            new Message(SEVERITY.WARNING, MESG.BAY_NOT_VALID)
          )
      }
      if (obj.overview.bays[bay - 1].status !== 2) {
        return sendJson(res, new Message(SEVERITY.WARNING, MESG.BAY_NOT_READY))
      }
      const { area, dbNumber, start, amount, wordLen } = write
      const response = await writeArea(
        this.plc.client,
        area,
        dbNumber,
        start,
        amount,
        wordLen,
        Buffer.from('0x01')
      )
      return sendJson(
        res,
        new Message(
          response ? SEVERITY.SUCCESS : SEVERITY.ERROR,
          response ? MESG.GATE_OK : MESG.WRITE_ERROR
        )
      )
    })
    /* Endpoint /entry/open?bay=x */
    this.app.get(prefix + '/entry/open', async (res, req) => {
      this.log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
      const query = querystring.parse(req.getQuery())
      const bay = parseInt(query.bay)
      let write
      switch (bay) {
        case 1:
          write = def.E1_OPN
          break

        case 2:
          write = def.E2_OPN
          break

        case 3:
          write = def.E3_OPN
          break

        case 4:
          write = def.E4_OPN
          break

        default:
          return sendJson(
            res,
            new Message(SEVERITY.WARNING, MESG.BAY_NOT_VALID)
          )
      }
      if (obj.overview.bays[bay - 1].status !== 2) {
        return sendJson(res, new Message(SEVERITY.WARNING, MESG.BAY_NOT_READY))
      }
      const { area, dbNumber, start, amount, wordLen } = write
      const response = await writeArea(
        this.plc.client,
        area,
        dbNumber,
        start,
        amount,
        wordLen,
        Buffer.from('0x01')
      )
      return sendJson(
        res,
        new Message(
          response ? SEVERITY.SUCCESS : SEVERITY.ERROR,
          response ? MESG.GATE_OK : MESG.WRITE_ERROR
        )
      )
    })
    /* Endpoint /exit?card=x */
    this.app.get(prefix + '/exit', async (res, req) => {
      this.log(req)
      res.onAborted(() => {
        res.aborted = true
      })
      /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
      const query = querystring.parse(req.getQuery())
      const card = parseInt(query.card)
      if (!Number.isInteger(card)) {
        return sendJson(
          res,
          new Message(SEVERITY.WARNING, MESG.CARD_NOT_VALID)
        )
      }
      if (card < 1 || card > def.CARDS) {
        return sendJson(
          res,
          new Message(SEVERITY.WARNING, MESG.CARD_NOT_VALID)
        )
      }
      if (!obj.stalls.some((stall) => stall.status === card)) {
        return sendJson(
          res,
          new Message(SEVERITY.WARNING, MESG.CARD_NOT_FOUND)
        )
      }
      if (obj.overview.devices.some((item) => item.card === card)) {
        return sendJson(
          res,
          new Message(SEVERITY.WARNING, MESG.CARD_IN_OPERATION)
        )
      }
      if (obj.overview.queue[def.QUEUE_LEN - 1].card !== 0) {
        return sendJson(res, new Message(SEVERITY.WARNING, MESG.QUEUE_FULL))
      }
      if (obj.overview.queue.some((item) => item.card === card)) {
        return sendJson(res, new Message(SEVERITY.WARNING, MESG.QUEUE_BUSY))
      }
      const { area, dbNumber, start, amount, wordLen } = def.REQ_0
      const buffer = Buffer.allocUnsafe(amount)
      buffer.writeUInt16BE(card, 0)
      const response = await writeArea(
        this.plc.client,
        area,
        dbNumber,
        start,
        amount,
        wordLen,
        buffer
      )
      return sendJson(
        res,
        new Message(
          response ? SEVERITY.SUCCESS : SEVERITY.ERROR,
          response ? MESG.EXIT_OK : MESG.WRITE_ERROR
        )
      )
    })
    this.app.get('/*', (res /*, req */) => res.end('Resource not found'))
  }
}

export default Router
