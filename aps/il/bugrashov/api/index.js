import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
import * as obj from './obj.js'
import Plc from './lib/Plc.js'
import Router from './lib/Router.js'
import { listen } from '../../../../lib/listen.js'

const main = async () => {
  try {
    const app = uWS.App()
    const plc = new Plc(def.PLC)
    plc.on('pub', ({ channel, data }) => app.publish(channel, data))
    const router = new Router(app, plc)
    router.run(def, obj)
    await listen(app, def.APS, def.HTTP)
    await plc.run(def, obj)
  } catch (err) {
    console.error({ aps: def.APS, port: def.HTTP, err }, 'API startup failed')
    process.exit(1)
  }
}

main()
