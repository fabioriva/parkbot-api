import { formatInTimeZone } from 'date-fns-tz'
import { calendarBounds, operationQuery } from './operationDates.js'

export const byCard = async function byCard (start, end, history, timeZone = 'UTC') {
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
      }
    },
    {
      $group: {
        _id: '$card',
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    // { $sort: { _id: 1 } }
    { $sort: { total: -1 } }
  ]
  const docs = await history.aggregate(pipeline).toArray()
  return {
    data: docs.map((e) => {
      return {
        name: e._id,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    }),
    key: 'range',
    query: operationQuery(start, end, timeZone)
  }
}

export const byDevice = async function byDevice (start, end, devices, history, timeZone = 'UTC') {
  // console.log('by device', start, end)
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
      }
    },
    {
      $group: {
        _id: '$device',
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  const docs = await history.aggregate(pipeline).toArray()
  return {
    data: docs.map((e) => {
      return {
        name: devices[e._id - 1],
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    }),
    key: 'range',
    query: operationQuery(start, end, timeZone)
  }
}

export const byRange = async function byRange (start, end, history, timeZone = 'UTC') {
  // console.log('by range', start, end)
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
      }
    },
    {
      $group: {
        _id: {
          year: { $year: { date: '$date', timezone: timeZone } },
          month: { $month: { date: '$date', timezone: timeZone } },
          day: { $dayOfMonth: { date: '$date', timezone: timeZone } }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  const docs = await history.aggregate(pipeline).toArray()
  return {
    data: docs.map(e => {
      return {
        name: e._id.month + '-' + e._id.day,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    }),
    key: 'range',
    query: operationQuery(start, end, timeZone)
  }
}

export const daily = async function daily (date, history, timeZone = 'UTC') {
  const { start, end } = calendarBounds(date, timeZone, 'daily')
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
      }
    },
    {
      $group: {
        _id: {
          hour: { $hour: { date: '$date', timezone: timeZone } }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  const docs = await history.aggregate(pipeline).toArray()
  return {
    data: docs.map(e => {
      const hour = e._id.hour % 12 || 12
      const name = e._id.hour < 12 || e._id.hour === 24 ? hour + ' am' : hour + ' pm'
      return {
        name,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    }),
    key: 'daily',
    query: operationQuery(start, end, timeZone, true)
  }
}

export const weekly = async function weekly (date, history, timeZone = 'UTC') {
  const { start, end } = calendarBounds(date, timeZone, 'weekly')
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
      }
    },
    {
      $group: {
        _id: {
          year: { $year: { date: '$date', timezone: timeZone } },
          month: { $month: { date: '$date', timezone: timeZone } },
          day: { $dayOfMonth: { date: '$date', timezone: timeZone } }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  const docs = await history.aggregate(pipeline).toArray()
  return {
    data: docs.map(e => {
      return {
        name: e._id.month + '-' + e._id.day,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    }),
    key: 'weekly',
    query: operationQuery(start, end, timeZone)
  }
}

export const monthly = async function monthly (date, history, timeZone = 'UTC') {
  const { start, end } = calendarBounds(date, timeZone, 'monthly')
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
      }
    },
    {
      $group: {
        _id: {
          year: { $year: { date: '$date', timezone: timeZone } },
          month: { $month: { date: '$date', timezone: timeZone } },
          day: { $dayOfMonth: { date: '$date', timezone: timeZone } }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  const docs = await history.aggregate(pipeline).toArray()
  return {
    data: docs.map(e => {
      return {
        name: e._id.month + '-' + e._id.day,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    }),
    key: 'monthly',
    query: operationQuery(start, end, timeZone)
  }
}

export const yearly = async function yearly (date, history, timeZone = 'UTC') {
  const { start, end } = calendarBounds(date, timeZone, 'yearly')
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
      }
    },
    {
      $group: {
        _id: {
          year: { $year: { date: '$date', timezone: timeZone } },
          month: { $month: { date: '$date', timezone: timeZone } }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  const docs = await history.aggregate(pipeline).toArray()
  return {
    data: docs.map(e => {
      return {
        name: formatInTimeZone(new Date(Date.UTC(e._id.year, e._id.month - 1, 1)), 'UTC', 'MMM'),
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    }),
    key: 'yearly',
    query: operationQuery(start, end, timeZone)
  }
}
