import util from 'util'

/**
 * Parameters:
 * days - number of days since 1990-1-1
 * msec - number of milliseconds since 00:00 (midnight)
 * Return value:
 * The number of milliseconds between 1 January 1970 00:00:00 UTC and the given date
 */

exports.getPlcDateTime = function getPlcDateTime (days, msec) {
  const h = Math.floor(msec / 3600000)
  const m = Math.floor((msec % 3600000) / 60000)
  const s = Math.floor(((msec % 3600000) % 60000) / 1000)
  const ms = Math.floor(((msec % 3600000) % 60000) % 1000)
  const d = new Date(1990, 0, 1, h, m, s, ms)
  return d.setDate(d.getDate() + days)
}

/** promisify snap7 I/O functions */

exports.readArea = util.promisify(
  (client, area, dbNumber, start, amount, wordLen, callback) => {
    client.ReadArea(
      area,
      dbNumber,
      start,
      amount,
      wordLen,
      function (err, s7data) {
        if (err) return callback(err)
        callback(err, s7data)
      }
    )
  }
)

exports.writeArea = util.promisify(
  (client, area, dbNumber, start, amount, wordLen, buffer, callback) => {
    client.WriteArea(
      area,
      dbNumber,
      start,
      amount,
      wordLen,
      buffer,
      function (err) {
        if (err) return callback(err)
        callback(err, true)
      }
    )
  }
)
