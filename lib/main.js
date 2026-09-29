import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import mongo from './db.js'
import History from './History.js'
import Plc from './Plc.js'
import Router from './Router.js'

const main = async (def, obj, str) => {
  try {
    const app = uWS.App().listen(def.HTTP, token => console.info(token))
    const db = await mongo(def.APS, str)
    const history = new History(db)
    const plc = new Plc(app, history)
    plc.run(def, obj)
    const router = new Router(app, history, plc)
    router.run(def, obj)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

export default main
