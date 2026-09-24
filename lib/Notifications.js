import mongo from 'mongodb'
// import pino from 'pino'

// const logger = pino()

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
    this.collection = db.collection('recipients')
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

  async getRecipients () {
    const docs = await this.collection.find({}, { _id: 0, email: 1, locale: 1 }).toArray()
    const recipients = docs.map(e => e.email)
    return recipients
  }

  async update ({ email, name, locale, phone }) {
    const result = await this.collection.updateOne({ email }, { $set: { email, name, locale, phone } })
    return result
  }
}

export default Notifications
