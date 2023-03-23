require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const uWS = require('uWebSockets.js')
const def = require('./def')
const obj = require('./obj')
const str = require('./str')
const History = require('../../lib/History')
const MailingList = require('../../lib/MailingList')
const Plc = require('../../lib/Plc')
const Router = require('../../lib/Router')

// const init = async (db) => {
//   try {
//     let result
//     result = await db.collection('alarms').drop().catch(err => console.error(err))
//     console.log(result)
//     result = await db.collection('alarms').insertMany(str.ALARMS)
//     console.log(`${result.insertedCount} documents were inserted`)
//     result = await db.collection('devices').drop().catch(err => console.error(err))
//     console.log(result)
//     result = await db.collection('devices').insertMany(str.DEVICES)
//     console.log(`${result.insertedCount} documents were inserted`)
//     result = await db.collection('modes').drop().catch(err => console.error(err))
//     console.log(result)
//     result = await db.collection('modes').insertMany(str.MODES)
//     console.log(`${result.insertedCount} documents were inserted`)
//     result = await db.collection('operations').drop().catch(err => console.error(err))
//     console.log(result)
//     result = await db.collection('operations').insertMany(str.OPERATIONS)
//     console.log(`${result.insertedCount} documents were inserted`)
//   } catch (err) {
//     console.error(new Error(err))
//   } finally {
//     console.log(await db.listCollections().toArray())
//     // console.log(await db.collection('modes').count())
//     // console.log(await db.collection('modes').find().toArray())
//   }
// }

const init = async (db) => {
  try {
    await db.collection('alarms').drop().catch(err => console.error(err))
    await db.collection('alarms').insertMany(str.ALARMS)
    await db.collection('devices').drop().catch(err => console.error(err))
    await db.collection('devices').insertMany(str.DEVICES)
    await db.collection('modes').drop().catch(err => console.error(err))
    await db.collection('modes').insertMany(str.MODES)
    await db.collection('operations').drop().catch(err => console.error(err))
    await db.collection('operations').insertMany(str.OPERATIONS)
  } catch (err) {
    console.error(new Error(err))
  } finally {
    console.info(await db.listCollections().toArray())
  }
}

const main = async () => {
  try {
    const app = uWS.App().listen(def.HTTP, token => console.info(token))
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await client.connect()
    const db = client.db(def.APS)
    await init(db)
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
