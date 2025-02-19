import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
const obj from './io.js'
const Plc = require('./lib/Plc')
const Router = require('./lib/Router')

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
