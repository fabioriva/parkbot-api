import pino from 'pino'
import { WriteArea } from '../../../lib/utils7.js'

const logger = pino()

async function checkAuth (res, aps, authorization) {
  // try {
  if (!authorization) {
    throw new Error('authorization header missing')
  }
  const token = authorization.split(' ').pop()
  const response = await fetch(process.env.SESSION_PROVIDER, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  console.log(response)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const session = await response.json()
  const { aps: { ns }, user } = session
  if (ns !== aps) {
    throw new Error('aps authorization failed')
  }
  // TODO check user rights/roles
  return { ...session }
  // } catch(e) {
  // }
}

function readJson (res) {
  return new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0)
    res.onData((ab, isLast) => {
      const chunk = Buffer.from(ab)
      buffer = Buffer.concat([buffer, chunk])
      if (isLast) {
        const json = JSON.parse(buffer)
        resolve({ ...json })
      }
    })
  })
}

function sendError (res, e) {
  if (!res.aborted) {
    res.cork(() => res.writeStatus('401').end(`<h1>parkbot-api: ${e.message}</h1>`))
  }
}

function sendJson (res, json) {
  if (!res.aborted) {
    res.cork(() => res.writeHeader('Content-Type', 'application/json').end(JSON.stringify(json)))
  }
}

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

  run (def, obj) {
    const prefix = '/aps/' + def.APS
    this.app.get(prefix + '/cards', async (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      res.onAborted(() => { res.aborted = true })
      try {
        await checkAuth(res, def.APS, authorization)
        sendJson(res, obj.cards)
      } catch (e) {
        sendError(res, e)
      }
    })
    this.app.post(prefix + '/card/edit', async (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      res.onAborted(() => { res.aborted = true })
      try {
        const json = await readJson(res)
        await checkAuth(res, def.APS, authorization)
        const card = parseInt(json.nr)
        const code = json.code
        if (!Number.isInteger(card)) {
          throw new Error('parameters not valid')
        }
        const minCard = def.MIN_CARD !== undefined ? def.MIN_CARD : 1
        const maxCard = def.MAX_CARD !== undefined ? def.MAX_CARD : def.CARDS
        if (card < minCard || card > maxCard) {
          throw new Error('card is not valid')
        }
        const regexp = /^[a-fA-F0-9]{3}$/
        if (!regexp.test(code) && code !== -1) {
          throw new Error('pin code is not valid')
        }
        const buffer = Buffer.alloc(4)
        buffer.writeUInt16BE(card, 0)
        buffer.writeInt16BE(parseInt(code, 16), 2) // string to hex
        const { area, dbNumber, start, amount, wordLen } = def.CARD_EDIT
        const written = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, buffer)
        sendJson(res, { severity: written ? 'success' : 'error', message: written ? 'updated card ' + card : 'write error' })
      } catch (e) {
        sendError(res, e)
      }
    })
    this.app.get(prefix + '/map', async (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      res.onAborted(() => { res.aborted = true })
      try {
        await checkAuth(res, def.APS, authorization)
        sendJson(res, obj.map)
      } catch (e) {
        sendError(res, e)
      }
    })
    this.app.post(prefix + '/map/edit', async (res, req) => {
      this.log(req)
      const authorization = req.getHeader('authorization')
      res.onAborted(() => { res.aborted = true })
      try {
        const json = await readJson(res)
        await checkAuth(res, def.APS, authorization)
        const card = parseInt(json.status)
        const stall = parseInt(json.stall)
        if (!Number.isInteger(card) || !Number.isInteger(stall)) {
          throw new Error('parameters not valid')
        }
        if (stall < 1 || stall > def.STALLS) {
          throw new Error('stall is not valid')
        }
        const { FREE, LOCK } = def.STALL_STATUS
        const minCard = def.MIN_CARD !== undefined ? def.MIN_CARD : 1
        const maxCard = def.MAX_CARD !== undefined ? def.MAX_CARD : def.CARDS
        if (card !== FREE && card !== LOCK && (card < minCard || card > maxCard)) {
          throw new Error('status is not valid')
        }
        const found = obj.stalls.find(stall => stall.status === card)
        if (card !== FREE && card !== LOCK && found) {
          throw new Error('card in use')
        }
        const buffer = Buffer.alloc(4)
        buffer.writeInt16BE(stall, 0)
        buffer.writeInt16BE(card, 2)
        const { area, dbNumber, start, amount, wordLen } = def.MAP_EDIT
        const written = await WriteArea(this.plc.client, area, dbNumber, start, amount, wordLen, buffer)
        if (written) this.plc.stall(def, obj, stall)
        sendJson(res, { severity: written ? 'success' : 'error', message: written ? 'updated stall ' + stall : 'write error' })
      } catch (e) {
        // console.error(e, e.message)
        sendError(res, e)
      }
    })
    this.app.ws(prefix + '/cards', { open: ws => ws.subscribe('aps/cards') })
    this.app.ws(prefix + '/map', { open: ws => ws.subscribe('aps/map') })
    this.app.get('/*', (res, req) => res.end('<h1>parkbot-api: resource not found</h1>'))
  }
}

export default Router
