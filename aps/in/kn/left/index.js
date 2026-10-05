import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
import * as str from '../str.js'
import obj from '../obj.js'
import mongo from '../../../../lib/db.js'
import History from '../../../../lib/History.js'
import Notifications from '../../../../lib/Notifications.js'
import Plc from '../../../../lib/Plc.js'
import Router from '../../../../lib/Router.js'

const main = async () => {
  try {
    const app = uWS.App().listen(def.HTTP, token => console.info(token))
    const db = await mongo('kn', str)
    const history = new History(db)
    const notifications = new Notifications(db)
    const plc01 = new Plc(app, history, notifications)
    plc01.run(def, obj)
    const router = new Router(app, history, notifications, plc01)
    router.run(def, obj)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

main()
