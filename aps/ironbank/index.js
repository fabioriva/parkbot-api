require('dotenv').config()
const uWS = require('uWebSockets.js')
const def = require('./def')
const obj = require('./obj')
const str = require('./str')
const mongo = require('../../lib/db')
const History = require('../../lib/History')
const MailingList = require('../../lib/MailingList')
const Plc = require('../../lib/Plc')
const Router = require('../../lib/Router')

const main = async () => {
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

main()
