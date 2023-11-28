const {
  addHours,
  format,
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
  subYears
} = require('date-fns')

exports.byDevice = async function byRange (start, end, devices, history) {
  // const start_ = addHours(startOfDay(start), 1)
  // const end_ = addHours(endOfDay(end), 1)
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
    query: { date: format(start, 'yyyy-MM-dd') + ' ' + format(end, 'yyyy-MM-dd') }
  }
}

exports.byRange = async function byRange (start, end, history) {
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
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' }
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
    query: { date: format(start, 'yyyy-MM-dd') + ' ' + format(end, 'yyyy-MM-dd') }
  }
}

exports.daily = async function daily (date, history) {
  const start = addHours(startOfDay(date), 1)
  const end = addHours(endOfDay(date), 1)
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
          hour: { $hour: '$date' }
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
    query: { date: format(date, 'yyyy-MM-dd') }
  }
}

exports.weekly = async function weekly (date, history) {
  const start = startOfWeek(subWeeks(date, 1), { weekStartsOn: 1 })
  const end = endOfWeek(subWeeks(date, 1), { weekStartsOn: 1 })
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
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' }
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
    query: { date: format(start, 'yyyy-MM-dd') + ' ' + format(end, 'yyyy-MM-dd') }
  }
}

exports.monthly = async function monthly (date, history) {
  const start = startOfMonth(subMonths(date, 1))
  const end = endOfMonth(subMonths(date, 1))
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
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' }
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
    query: { date: format(start, 'yyyy-MM-dd') + ' ' + format(end, 'yyyy-MM-dd') }
  }
}

exports.yearly = async function yearly (date, history) {
  const start = subYears(date, 1) // startOfYear(subYears(date, 1))
  const end = date // endOfYear(subYears(date, 1))
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
          year: { $year: '$date' },
          month: { $month: '$date' }
          // day: { $dayOfMonth: '$date' }
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
        name: format(new Date().setMonth(e._id.month - 1), 'MMM'),
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    }),
    key: 'yearly',
    query: { date: format(start, 'yyyy-MM-dd') + ' ' + format(end, 'yyyy-MM-dd') }
  }
}
