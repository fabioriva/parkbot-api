import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
import * as str from './str.js'
import obj from './obj.js'
import mongo from '../../../lib/db.js'
import History from '../../../lib/History.js'
import MailingList from '../../../lib/MailingList.js'
import Mqtt from '../../../lib/Mqtt.js'
import Plc from '../../../lib/Plc.js'
import Router from '../../../lib/Router.js'
import { updateOnLog } from '../../../lib/Log.js'

const main = async () => {
  try {
    const app = uWS.App().listen(def.HTTP, token => console.info(token))
    const db = await mongo(def.APS, str)
    const history = new History(db)
    const mailingList = new MailingList(db)
    const mqtt = new Mqtt(def.APS)
    mqtt.on('log', async log => {
      // console.log('MQTT log', log)
      updateOnLog(def, log, obj, plc)
      const doc = await history.saveLog(log)
      mailingList.sendMail(def.APS, doc)
      app.publish('aps/info', JSON.stringify({ notification: doc }))
    })
    mqtt.on('pub', ({ channel, data }) => app.publish(channel, data))
    mqtt.run(def, obj)
    const plc = new Plc(def.PLC)
    // plc.on('log', async log => {
    //   console.log('TCP Log', log)
    //   updateOnLog(def, log, obj, plc)
    //   const doc = await history.saveLog(log)
    //   mailingList.sendMail(def.APS, doc)
    //   app.publish('aps/info', JSON.stringify({ notification: doc }))
    // })
    plc.on('pub', ({ channel, data }) => app.publish(channel, data))
    plc.run(def, obj)
    const router = new Router(app, history, mailingList, plc)
    router.run(def, obj)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

main()
