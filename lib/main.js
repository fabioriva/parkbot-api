require('dotenv').config()
const uWS = require('uWebSockets.js')
const mongo = require('./db')
const History = require('./History')
const MailingList = require('./MailingList')
const Plc = require('./Plc')
const Router = require('./Router')

const main = async (def, obj, str) => {
  try {
    const app = uWS.App().listen(def.HTTP, token => console.info(token))
    const db = await mongo(def.APS, str)
    const history = new History(db)
    const mailingList = new MailingList(db)
    const plc01 = new Plc(def.PLC)
    plc01.on('log', async log => {
      const doc = await history.saveLog(log)
      mailingList.sendMail(def.APS, doc)
      app.publish('aps/info', JSON.stringify({ notification: doc }))
    })
    plc01.on('pub', ({ channel, data }) => app.publish(channel, data))
    plc01.run(def, obj)
    const router = new Router(app, history, mailingList, plc01)
    router.run(def, obj)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

module.exports = main
