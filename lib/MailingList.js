const { format, utcToZonedTime } = require('date-fns-tz')
const fetch = require('node-fetch')
const logger = require('pino')()
const mongo = require('mongodb')

class ListItem {
  constructor (email, name, phone, status = true) {
    this.email = email
    this.name = name
    this.phone = phone
    this.status = status
  }
}

class MailingList {
  constructor (db) {
    this.collection = db.collection('mailingList')
  }

  async deleteListItem ({ _id }) {
    const result = await this.collection.deleteOne({ _id: new mongo.ObjectId(_id) })
    return result
  }

  async get () {
    const docs = await this.collection.find().toArray()
    return docs
  }

  async getRecipientList () {
    const docs = await this.collection.find({ status: true }, { _id: 0, email: 1 }).toArray()
    const recipientList = docs.map(e => e.email)
    return recipientList
  }

  async insertListItem ({ email, name, phone }) {
    const item = new ListItem(email, name, phone)
    const result = await this.collection.insertOne(item)
    return result
  }

  async sendMail (aps, doc) {
    if (doc.operation.id === 1) {
      const recipientList = await this.getRecipientList()
      console.log(recipientList)
      if (recipientList.length > 0) {
        const date = format(
          utcToZonedTime(doc.date, 'UTC'),
          'yyyy-MM-dd HH:mm:ss.SSS',
          {
            timeZone: 'UTC'
          }
        )
        const { device, alarm } = doc
        const body = {
          aps,
          alarm,
          date,
          device,
          locale: 'en',
          recipientList
        }
        // console.log(body)
        const response = await fetch(process.env.MAIL_PROVIDER, {
          method: 'post',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        logger.info(data, 'Mailer')
      }
    }
  }
}

module.exports = MailingList
