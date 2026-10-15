import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
import * as str from './str.js'
import obj from './obj.js'
import mongo from '../../../lib/db.js'
import History from '../../../lib/History.js'
import Notifications from '../../../lib/Notifications.js'
import Plc from '../../../lib/Plc.js'
import Router from '../../../lib/Router.js'

import PlcSH from './shuttle.js'
import { listen } from '../../../lib/listen.js'

const main = async () => {
  try {
    const app = uWS.App()
    const db = await mongo(def.APS, str)
    const history = new History(db)
    const notifications = new Notifications(db)
    const plc = new Plc(app, history, notifications)
    // PLC SH
    const plc02 = new PlcSH()
    const router = new Router(app, history, notifications, plc)
    router.run(def, obj)
    await listen(app, def.APS, def.HTTP)
    await plc.run(def, obj)
    await plc02.run(def, obj)
  } catch (err) {
    console.error({ aps: def.APS, port: def.HTTP, err }, 'API startup failed')
    process.exit(1)
  }
}

main()
