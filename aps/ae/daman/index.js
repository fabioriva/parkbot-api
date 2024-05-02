require('dotenv').config()
const uWS = require('uWebSockets.js')
const def = require('./def')
const obj = require('./obj')
const str = require('./str')
const mongo = require('../../../lib/db')
const History = require('../../../lib/History')
const MailingList = require('../../../lib/MailingList')
const Plc = require('../../../lib/Plc')
const Router = require('../../../lib/Router')
const { updateOnLog } = require('../../../lib/Log')

const main = async () => {
  try {
    const app = uWS.App().listen(def.HTTP, token => console.info(token))
    const db = await mongo(def.APS, str)
    const history = new History(db)
    const mailingList = new MailingList(db)
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

main()
