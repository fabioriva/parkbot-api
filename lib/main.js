import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import mongo from './db.js'
import History from './History.js'
import MailingList from './MailingList.js'
// const Mqtt from './Mqtt')
import Plc from './Plc.js'
import Router from './Router.js'
import { updateOnLog } from './Log.js'

const main = async (def, obj, str) => {
  try {
    const app = uWS.App().listen(def.HTTP, token => console.info(token))
    const db = await mongo(def.APS, str)
    const history = new History(db)
    const mailingList = new MailingList(db)
    // const mqtt = new Mqtt(def.APS)
    // mqtt.on('log', async log => {
    //   updateOnLog(def, log, obj, plc)
    //   const doc = await history.saveLog(log)
    //   mailingList.sendMail(def.APS, doc)
    //   app.publish('aps/info', JSON.stringify({ notification: doc }))
    // })
    // mqtt.on('pub', ({ channel, data }) => app.publish(channel, data))
    // mqtt.run(def, obj)
    const plc = new Plc(def.PLC)
    plc.on('log', async log => {
      updateOnLog(def, log, obj, plc)
      const doc = await history.saveLog(log)
      mailingList.sendMail(def.APS, doc)
      app.publish('aps/info', JSON.stringify({ notification: doc }))
    })
    plc.on('pub', ({ channel, data }) => app.publish(channel, data))
    plc.run(def, obj)
    const router = new Router(app, history, mailingList, plc)
    router.run(def, obj)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

export default main
