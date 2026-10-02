import mongo from 'mongodb'
import { readFile } from 'node:fs/promises'
// import pino from 'pino'

// const logger = pino()

const COLLECTION = 'recipients'

async function getToken (aps) {
  const file = process.env.NOTIFICATIONS_API_TOKENS_FILE
  if (!file?.trim()) {
    throw new Error('NOTIFICATIONS_API_TOKENS_FILE is required')
  }

  let contents
  try {
    contents = await readFile(file, 'utf8')
  } catch {
    throw new Error('Cannot read NOTIFICATIONS_API_TOKENS_FILE')
  }

  let tokens
  try {
    tokens = JSON.parse(contents)
  } catch {
    throw new Error('NOTIFICATIONS_API_TOKENS_FILE must contain valid JSON')
  }
  if (!tokens || typeof tokens !== 'object' || Array.isArray(tokens)) {
    throw new Error('NOTIFICATIONS_API_TOKENS_FILE must contain an object mapping APS names to tokens')
  }

  const token = Object.hasOwn(tokens, aps) ? tokens[aps] : undefined
  if (typeof token !== 'string' || !token.trim() || /\s/.test(token)) {
    throw new Error(`Missing or invalid token for aps "${aps}" in NOTIFICATIONS_API_TOKENS_FILE`)
  }
  return token
}

class Recipient {
  constructor (email, name, locale, phone) {
    this.email = email
    this.name = name
    this.locale = locale
    this.phone = phone
  }
}

class Notifications {
  constructor (db) {
    this.collection = db.collection(COLLECTION)
  }

  async add ({ email, name, locale, phone }) {
    const result = await this.collection.insertOne(new Recipient(email, name, locale, phone))
    return result
  }

  async delete ({ _id }) {
    const result = await this.collection.deleteOne({ _id: new mongo.ObjectId(_id) })
    return result
  }

  async get () {
    const docs = await this.collection.find().toArray()
    return docs
  }

  async mailingList () {
    const docs = await this.collection.find({}, {
      projection: { _id: 0, email: 1, locale: 1 }
    }).toArray()
    return docs
  }

  async send (aps, doc) {
    const token = await getToken(aps)
    const { alarm, device } = doc
    const recipients = await this.mailingList()
    if (recipients.length === 0) {
      throw new Error('Recipients list is empty')
    }

    // const body = {
    //   eventId: 'log-12',
    //   aps,
    //   recipients: [{ email: 'f.riva@sotefin.ch', locale: 'it' }],
    //   alarmLog: {
    //     operation: { id: 1 },
    //     alarm: {
    //       id: 12,
    //       key: 'al-pn',
    //       query: { name: 'PLC <A&B>' }
    //     },
    //     device: { id: 2, name: 'Lift 2' },
    //     date: '2026-09-23T10:20:30.000Z'
    //   }
    // }
    const url = process.env.NOTIFICATIONS_URL
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventId: `log-${alarm?.id}`,
        aps,
        recipients,
        alarmLog: {
          operation: { id: 1 },
          alarm,
          device: { id: device?.id, name: device?.key },
          date: new Date().toISOString()
        }
      })
    })
    const text = await res.text()
    if (!res.ok) {
      throw new Error(`Notifications request failed for aps "${aps}" (HTTP ${res.status})`)
    }
    // console.log('status:', res.status)
    // console.log('response:', text)
    // if (res.ok) {
    //   const json = await res.json()
    //   console.log(json)
    // } else {
    //   console.log('/api/notifications fetch error')
    // }
  }

  async update ({ email, name, locale, phone }) {
    const result = await this.collection.updateOne({ email }, { $set: { email, name, locale, phone } })
    return result
  }
}

export default Notifications
