import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
import * as obj from './obj.js'
import Plc from './lib/Plc.js'
import Router from './lib/Router.js'

const main = async () => {
  try {
    const app = uWS.App().listen(def.HTTP, (token) => console.info(token))
    const plc = new Plc(def.PLC)
    plc.on('pub', ({ channel, data }) => app.publish(channel, data))
    plc.run(def, obj)
    const router = new Router(app, plc)
    router.run(def, obj)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

main()
