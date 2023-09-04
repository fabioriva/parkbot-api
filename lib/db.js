const MongoClient = require('mongodb').MongoClient

async function init (aps, str) {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  const db = client.db(aps)
  await db.collection('alarms').drop().catch(err => console.error(err))
  await db.collection('alarms').insertMany(str.ALARMS)
  await db.collection('devices').drop().catch(err => console.error(err))
  await db.collection('devices').insertMany(str.DEVICES)
  await db.collection('modes').drop().catch(err => console.error(err))
  await db.collection('modes').insertMany(str.MODES)
  await db.collection('operations').drop().catch(err => console.error(err))
  await db.collection('operations').insertMany(str.OPERATIONS)
  // console.info(await db.listCollections().toArray())
  return db
}

module.exports = init
