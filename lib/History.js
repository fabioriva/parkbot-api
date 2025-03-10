import { addHours, parseISO, isEqual } from 'date-fns'
import { format/*, toZonedTime */ } from 'date-fns-tz'
import { byDevice, byRange, daily, weekly, monthly, yearly } from './operations.js'

class Log {
  constructor (s7log) {
    this.alarm = s7log.alarm
    this.card = s7log.card
    this.date = new Date(format(s7log.date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
    this.device = s7log.device
    //  this.event = s7log.event
    this.mode = s7log.mode
    this.operation = s7log.operation
    this.size = s7log.size
    this.stall = s7log.stall
  }
}

class History {
  constructor (db) {
    this.collection = db.collection('history')
    this.pipeline = [
      {
        $lookup: {
          from: 'alarms',
          localField: 'alarm',
          foreignField: 'id',
          as: 'alarm'
        }
      },
      { $unwind: { path: '$alarm', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'devices',
          localField: 'device',
          foreignField: 'id',
          as: 'device'
        }
      },
      { $unwind: '$device' },
      {
        $lookup: {
          from: 'modes',
          localField: 'mode',
          foreignField: 'id',
          as: 'mode'
        }
      },
      { $unwind: '$mode' },
      {
        $lookup: {
          from: 'operations',
          localField: 'operation',
          foreignField: 'id',
          as: 'operation'
        }
      },
      { $unwind: '$operation' },
      { $unset: ['_id', 'alarm._id', 'device._id', 'mode._id', 'operation._id'] }
      // { $sort: { date: -1 } }
    ]
  }

  async get (query) {
    // console.log(query)
    // console.log(new Date(query.dateFrom), new Date(query.dateTo))
    // console.log(parseISO(query.dateFrom), parseISO(query.dateTo))
    const match = [{
      $match: {
        date: {
          $gte: addHours(parseISO(query.dateFrom), 1),
          $lt: addHours(parseISO(query.dateTo), 1)
        }
      }
    },
    { $sort: { date: -1 } },
    { $limit: 999 }]
    const pipeline = match.concat(this.pipeline)
    const docs = await this.collection.aggregate(pipeline).toArray()
    return docs
  }

  async getLog (id) {
    const match = [{ $match: { _id: id } }]
    const pipeline = match.concat(this.pipeline)
    const docs = await this.collection.aggregate(pipeline).toArray()
    return docs[0]
  }

  async getDevices (query, devices) {
    const dateFrom = new Date(query.dateFrom)
    const dateTo = new Date(query.dateTo)
    const docs = await byDevice(dateFrom, dateTo, devices.map(d => d.name), this.collection)
    return docs
  }

  async getOperations (query) {
    // console.log(query)
    if (query.dateString !== undefined) {
      const date = new Date(query.dateString)
      const docs = await Promise.all([
        daily(date, this.collection),
        weekly(date, this.collection),
        monthly(date, this.collection),
        yearly(date, this.collection)
      ])
      return docs
    }
    // by range
    const dateFrom = new Date(query.dateFrom)
    const dateTo = new Date(query.dateTo)
    if (isEqual(dateFrom, dateTo)) {
      const docs = await daily(dateFrom, this.collection)
      return docs
    } else {
      const docs = await byRange(dateFrom, dateTo, this.collection)
      return docs
    }
  }

  async getRecentActivity (limit) {
    // const match = [{
    //   $match: {
    //     _id: { $exists: true }
    //   }
    // },
    // { $sort: { date: -1 } },
    // { $limit: limit }]
    // const pipeline = match.concat(this.pipeline)
    // const docs = await this.collection.aggregate(pipeline).toArray()
    const pipeline = [{ $sort: { _id: -1 } }, { $limit: limit }].concat(this.pipeline)
    const docs = await this.collection.aggregate(pipeline).toArray()
    return {
      count: docs.length,
      documents: docs
    }
  }

  async saveLog (s7log) {
    // try {
    const log = new Log(s7log)
    const res = await this.collection.insertOne(log)
    const doc = await this.getLog(res.insertedId)
    return doc
    // } catch (e) {

    // }
  }
}

export default History
