import 'dotenv/config.js'
import * as uWS from 'uWebSockets.js'
import * as def from './def.js'
import * as str from './str.js'
import obj from './obj.js'
import mongo from '../../../lib/db.js'
import History from '../../../lib/History.js'
// import MailingList from '../../../lib/MailingList.js'
import Plc from '../../../lib/Plc.js'
import PlcW from './PlcW.js'
import Router from '../../../lib/Router.js'
// import { updateOnLog } from '../../../lib/Log.js'

import { sendJson } from '../../../lib/json.js'
import querystring from 'querystring'

const main = async () => {
  try {
    const app = uWS.App().listen(def.HTTP, (token) => console.info(token))
    const db = await mongo(def.APS, str)
    app.get('/api/aps/daman-n/items', async (res, req) => {
      res.onAborted(() => {
        res.aborted = true
      })
      const query = querystring.parse(req.getQuery())

      const page = parseInt(query.page) || 1 // parseInt(req.query.page) || 1;
      const limit = parseInt(query.limit) || 20 // parseInt(req.query.limit) || 20;
      console.log(query, page, limit)

      const skip = (page - 1) * limit

      const [items, total] = await Promise.all([
        db
          .collection('logs')
          .find({})
          .sort({ _id: -1 }) // ordinamento stabile
          .skip(skip)
          .limit(limit)
          .toArray(),

        db.collection('logs').countDocuments()
      ])
      // console.log(items, total);

      sendJson(res, {
        items,
        total,
        page,
        hasMore: skip + items.length < total
      })
    })

    const history = new History(db)
    // const mailingList = new MailingList(db)
    // PLC read
    const plc = new Plc(app, history)
    // const plc = new Plc(def.PLC)
    // plc.on('log', async log => {
    //   updateOnLog(def, log, obj, plc)
    //   const doc = await history.saveLog(log)
    //   mailingList.sendMail(def.APS, doc)
    //   app.publish('aps/info', JSON.stringify({ notification: doc }))
    // })
    // plc.on('pub', ({ channel, data }) => app.publish(channel, data))
    plc.run(def, obj)
    // PLC write
    const plcW = new PlcW(def.PLC)
    plcW.run(def, obj)
    // API routes
    const router = new Router(app, history, plcW)
    router.run(def, obj)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

main()
