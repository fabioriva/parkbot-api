import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
// import * as str from './str.js'
import obj from './obj.js'
// import Plc from '../../../lib/Plc.js'
import Plc from './PlcMap.js'
// import Router from '../../../lib/Router.js'
import Router from './Api.js'

const main = async () => {
  try {
    const app = uWS.App().listen(9136, token => console.info(token))
    const plc = new Plc(def.PLC_MAP)
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
