import { JsonRequestError } from './json.js'
import { calendarBounds, parseOperationDate } from './operationDates.js'
import {
  byCard,
  byDevice,
  byRange,
  daily,
  weekly,
  monthly,
  yearly
} from './operations.js'

class Log {
  constructor (s7log) {
    this.alarm = s7log.alarm
    this.card = s7log.card
    this.date = new Date(s7log.date)
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
    // this.collection = db.collection('history')
    this.collection = db.collection('logs')
    // this.pipeline = [
    //   {
    //     $lookup: {
    //       from: 'alarms',
    //       localField: 'alarm',
    //       foreignField: 'id',
    //       as: 'alarm'
    //     }
    //   },
    //   { $unwind: { path: '$alarm', preserveNullAndEmptyArrays: true } },
    //   {
    //     $lookup: {
    //       from: 'devices',
    //       localField: 'device',
    //       foreignField: 'id',
    //       as: 'device'
    //     }
    //   },
    //   { $unwind: '$device' },
    //   {
    //     $lookup: {
    //       from: 'modes',
    //       localField: 'mode',
    //       foreignField: 'id',
    //       as: 'mode'
    //     }
    //   },
    //   { $unwind: '$mode' },
    //   {
    //     $lookup: {
    //       from: 'operations',
    //       localField: 'operation',
    //       foreignField: 'id',
    //       as: 'operation'
    //     }
    //   },
    //   { $unwind: '$operation' },
    //   { $unset: ['_id', 'alarm._id', 'device._id', 'mode._id', 'operation._id'] }
    //   // { $sort: { date: -1 } }
    // ]
    this.pipeline = [
      {
        $lookup: {
          from: 'alarms',
          let: { alarmId: '$alarm' },
          pipeline: [
            { $match: { $expr: { $eq: ['$id', '$$alarmId'] } } },
            { $project: { _id: 0 } },
            { $limit: 1 }
          ],
          as: 'alarm'
        }
      },
      { $set: { alarm: { $first: '$alarm' } } },

      {
        $lookup: {
          from: 'devices',
          let: { deviceId: '$device' },
          pipeline: [
            { $match: { $expr: { $eq: ['$id', '$$deviceId'] } } },
            { $project: { _id: 0 } },
            { $limit: 1 }
          ],
          as: 'device'
        }
      },
      { $set: { device: { $first: '$device' } } },

      {
        $lookup: {
          from: 'modes',
          let: { modeId: '$mode' },
          pipeline: [
            { $match: { $expr: { $eq: ['$id', '$$modeId'] } } },
            { $project: { _id: 0 } },
            { $limit: 1 }
          ],
          as: 'mode'
        }
      },
      { $set: { mode: { $first: '$mode' } } },

      {
        $lookup: {
          from: 'operations',
          let: { opId: '$operation' },
          pipeline: [
            { $match: { $expr: { $eq: ['$id', '$$opId'] } } },
            { $project: { _id: 0 } },
            { $limit: 1 }
          ],
          as: 'operation'
        }
      },
      { $set: { operation: { $first: '$operation' } } },

      { $project: { _id: 0 } }
    ]
  }

  async get (query) {
    const card = parseInt(query.card) || 0
    const device = parseInt(query.device) || 0
    const stall = parseInt(query.stall) || 0
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 20
    const skip = (page - 1) * limit
    // console.log(page, limit, skip)
    const pipeline = [
      {
        $match: {
          date: {
            // The frontend supplies ISO timestamps with an explicit UTC offset.
            $gte: new Date(query.dateFrom),
            $lt: new Date(query.dateTo)
          },
          card: card === 0 ? { $gte: 0 } : { $eq: card },
          device: device === 0 ? { $gte: 0 } : { $eq: device },
          stall: stall === 0 ? { $gte: 0 } : { $eq: stall }
        }
      },

      { $sort: { _id: -1 } },

      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },

            {
              $lookup: {
                from: 'alarms',
                let: { alarmId: '$alarm' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$id', '$$alarmId'] } } },
                  { $project: { _id: 0 } },
                  { $limit: 1 }
                ],
                as: 'alarm'
              }
            },
            { $set: { alarm: { $first: '$alarm' } } },

            {
              $lookup: {
                from: 'devices',
                let: { deviceId: '$device' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$id', '$$deviceId'] } } },
                  { $project: { _id: 0 } },
                  { $limit: 1 }
                ],
                as: 'device'
              }
            },
            { $set: { device: { $first: '$device' } } },

            {
              $lookup: {
                from: 'modes',
                let: { modeId: '$mode' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$id', '$$modeId'] } } },
                  { $project: { _id: 0 } },
                  { $limit: 1 }
                ],
                as: 'mode'
              }
            },
            { $set: { mode: { $first: '$mode' } } },

            {
              $lookup: {
                from: 'operations',
                let: { opId: '$operation' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$id', '$$opId'] } } },
                  { $project: { _id: 0 } },
                  { $limit: 1 }
                ],
                as: 'operation'
              }
            },
            { $set: { operation: { $first: '$operation' } } },

            { $project: { _id: 0 } }
          ],

          total: [{ $count: 'count' }]
        }
      }
    ]
    // pipeline = pipeline.filter(Boolean)
    const result = await this.collection.aggregate(pipeline).toArray()
    const data = result[0].data
    const total = result[0].total[0]?.count || 0
    return { data, hasMore: skip + data.length < total, total }
  }

  async export (query) {
    const date = value => {
      if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/i.test(value)) {
        throw new JsonRequestError(400, 'Invalid history date')
      }
      const parsed = new Date(value)
      if (!Number.isFinite(parsed.getTime()) || new Date(value.slice(0, 10) + 'T00:00:00Z').toISOString().slice(0, 10) !== value.slice(0, 10)) throw new JsonRequestError(400, 'Invalid history date')
      return parsed
    }
    const filter = value => {
      if (value === undefined) return { $gte: 0 }
      if (typeof value !== 'string' || !/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
        throw new JsonRequestError(400, 'Invalid history filter')
      }
      return Number(value) === 0 ? { $gte: 0 } : { $eq: Number(value) }
    }
    const from = date(query.dateFrom)
    const to = date(query.dateTo)
    if (from >= to) throw new JsonRequestError(400, 'Invalid history range')
    const maxRecords = 5000
    const records = await this.collection.aggregate([
      {
        $match: {
          date: { $gte: from, $lt: to },
          card: filter(query.card),
          device: filter(query.device),
          stall: filter(query.stall)
        }
      },
      { $sort: { _id: -1 } },
      { $limit: maxRecords + 1 },
      ...this.pipeline
    ], { maxTimeMS: 30000 }).toArray()
    if (records.length > maxRecords) throw new JsonRequestError(413, 'History export exceeds 5000 records')
    return records
  }

  async getLog (id) {
    const match = [{ $match: { _id: id } }]
    const pipeline = match.concat(this.pipeline)
    const docs = await this.collection.aggregate(pipeline).toArray()
    return docs[0]
  }

  async getCards (query, timeZone = query.timeZone || 'UTC') {
    let dateFrom = parseOperationDate(query.dateFrom, timeZone)
    let dateTo = parseOperationDate(query.dateTo, timeZone)
    if (dateTo < dateFrom) throw new RangeError('dateTo must not precede dateFrom')
    if (dateFrom.getTime() === dateTo.getTime()) {
      const bounds = calendarBounds(dateFrom, timeZone, 'daily')
      dateFrom = bounds.start
      dateTo = bounds.end
    }
    const docs = await byCard(dateFrom, dateTo, this.collection, timeZone)
    return docs
  }

  async getDevices (query, devices, timeZone = query.timeZone || 'UTC') {
    let dateFrom = parseOperationDate(query.dateFrom, timeZone)
    let dateTo = parseOperationDate(query.dateTo, timeZone)
    if (dateTo < dateFrom) throw new RangeError('dateTo must not precede dateFrom')
    if (dateFrom.getTime() === dateTo.getTime()) {
      const bounds = calendarBounds(dateFrom, timeZone, 'daily')
      dateFrom = bounds.start
      dateTo = bounds.end
    }
    const docs = await byDevice(
      dateFrom,
      dateTo,
      devices.map((d) => d.name),
      this.collection,
      timeZone
    )
    return docs
  }

  async getOperations (query, timeZone = query.timeZone || 'UTC') {
    if (query.dateString !== undefined) {
      const date = parseOperationDate(query.dateString, timeZone)
      const docs = await Promise.all([
        daily(date, this.collection, timeZone),
        weekly(date, this.collection, timeZone),
        monthly(date, this.collection, timeZone),
        yearly(date, this.collection, timeZone)
      ])
      return docs
    }
    // by range
    const dateFrom = parseOperationDate(query.dateFrom, timeZone)
    const dateTo = parseOperationDate(query.dateTo, timeZone)
    if (dateTo < dateFrom) throw new RangeError('dateTo must not precede dateFrom')
    if (dateFrom.getTime() === dateTo.getTime()) {
      const docs = await daily(dateFrom, this.collection, timeZone)
      return docs
    } else {
      const docs = await byRange(dateFrom, dateTo, this.collection, timeZone)
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
    const pipeline = [{ $sort: { _id: -1 } }, { $limit: limit }].concat(
      this.pipeline
    )
    const docs = await this.collection.aggregate(pipeline).toArray()
    return {
      count: docs.length,
      documents: docs
    }
  }

  async saveAction (log) {
    const res = await this.collection.insertOne({
      ...log,
      date: new Date(log.date),
      alarm: 0,
      device: 0,
      mode: 0,
      size: 0
    })
    await this.getLog(res.insertedId)
    // const doc = await this.getLog(res.insertedId)
    // console.log(doc)
    // return doc
  }

  async saveLog (s7log) {
    const log = new Log(s7log)
    const res = await this.collection.insertOne(log)
    const doc = await this.getLog(res.insertedId)
    return doc
  }
}

export default History
