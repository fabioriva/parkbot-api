import { ObjectId } from 'mongodb'
import pino from 'pino'
import Notifications from './Notifications.js'
import { composeAlarmEmail, notificationLocale } from './alarmEmail.js'

const logger = pino()

class ListItem {
  constructor (email, name, phone, status = true, locale = 'en') {
    this.email = email
    this.name = name
    this.phone = phone
    this.status = status
    this.locale = notificationLocale(locale)
  }
}

class MailingList {
  constructor (db) {
    this.notifications = new Notifications()
    this.collection = db.collection('mailingList')
  }

  async deleteListItem ({ _id }) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(_id) })
    return result
  }

  async get () {
    const docs = await this.collection.find().toArray()
    return docs
  }

  async getRecipientList () {
    const docs = await this.collection.find({ status: true }, { projection: { _id: 0, email: 1 } }).toArray()
    const recipientList = docs.map(e => e.email)
    return recipientList
  }

  async insertListItem ({ email, name, phone, locale }) {
    const item = new ListItem(email, name, phone, true, locale)
    const result = await this.collection.insertOne(item)
    return result
  }

  async sendMail (aps, doc) {
    if (doc.operation?.id !== 1) return

    const recipients = await this.collection.find(
      { status: true },
      { projection: { _id: 0, email: 1, locale: 1 } }
    ).toArray()
    const groups = new Map()
    for (const recipient of recipients) {
      const locale = notificationLocale(recipient.locale)
      if (!groups.has(locale)) groups.set(locale, new Set())
      groups.get(locale).add(recipient.email)
    }

    for (const [locale, emails] of groups) {
      const { subject, text, html } = composeAlarmEmail(aps, doc, locale)
      await this.notifications.sendEmailNotification([...emails], subject, text, html)
      logger.info({ locale, recipients: emails.size }, 'Alarm email accepted by SendGrid')
    }
  }
}

export default MailingList
