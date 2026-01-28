import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
import * as str from './str.js'
import obj from './obj.js'
import mongo from '../../../lib/db.js'
import History from '../../../lib/History.js'
import MailingList from '../../../lib/MailingList.js'
import Plc from '../../../lib/Plc.js'
import PlcW from './PlcW.js'
import Router from '../../../lib/Router.js'
import { updateOnLog } from '../../../lib/Log.js'

const main = async () => {
  try {
    const app = uWS.App().listen(def.HTTP, token => console.info(token))
    const db = await mongo(def.APS, str)
    const history = new History(db)
    const mailingList = new MailingList(db)
    // PLC read
    const plc = new Plc(def.PLC)
    plc.on('log', async log => {
      updateOnLog(def, log, obj, plc)
      const doc = await history.saveLog(log)
      mailingList.sendMail(def.APS, doc)
      app.publish('aps/info', JSON.stringify({ notification: doc }))
    })
    plc.on('pub', ({ channel, data }) => app.publish(channel, data))
    plc.run(def, obj)
    // PLC write
    const plcW = new PlcW(def.PLC)
    plcW.run(def, obj)
    // API routes
    const router = new Router(app, history, mailingList, plcW)
    router.run(def, obj)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

main()
