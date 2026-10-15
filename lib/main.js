import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import mongo from './db.js'
import History from './History.js'
import Notifications from './Notifications.js'
import Plc from './Plc.js'
import Router from './Router.js'
import { listen } from './listen.js'

const main = async (def, obj, str) => {
  try {
    const app = uWS.App()
    const db = await mongo(def.APS, str)
    const history = new History(db)
    const notifications = new Notifications(db)
    const plc = new Plc(app, history, notifications)
    const router = new Router(app, history, notifications, plc)
    router.run(def, obj)
    await listen(app, def.APS, def.HTTP)
    await plc.run(def, obj)
  } catch (err) {
    console.error({ aps: def.APS, port: def.HTTP, err }, 'API startup failed')
    process.exit(1)
  }
}

export default main
