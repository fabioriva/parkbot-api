import pino from 'pino'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
import Plc from './Plc.js'
import { listen } from '../../../../lib/listen.js'

const logger = pino()
const log = (req) => logger.info({
  'user-agent': req.getHeader('user-agent'),
  method: req.getMethod(),
  url: req.getUrl()
})

const obj = Array(20).fill(0)
const main = async () => {
  try {
    const app = uWS.App()
    app.get('/api/data', async (res, req) => {
      log(req)
      res.writeHeader('Content-Type', 'application/json').end(JSON.stringify(obj))
    })
    app.get('/*', (res, req) => res.end('<h1>daman-exit-screen-api: resource not found</h1>'))
    const plc = new Plc(def.PLC)
    plc.on('pub', ({ channel, data }) => app.publish(channel, data))
    await listen(app, def.APS, def.HTTP)
    await plc.run(def, obj)
  } catch (err) {
    console.error({ aps: def.APS, port: def.HTTP, err }, 'API startup failed')
    process.exit(1)
  }
}

main()
