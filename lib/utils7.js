const util = require('util')

exports.bytesToInt = function bytesToInt (b1, b2) {
  return (b1 << 8) | b2
}

exports.bytesToLong = function bytesToLong (b1, b2, b3, b4) {
  return (b1 << 24) | (b2 << 16) | (b3 << 8) | b4
}

exports.intToBytes = function intToBytes (i, b) {
  b[0] = i & 0xff
  b[1] = (i >> 8) & 0xff
  return i
}

exports.longToBytes = function longToBytes (i, b) {
  b[0] = i & 0xff
  b[1] = (i >> 8) & 0xff
  b[2] = (i >> 16) & 0xff
  b[3] = (i >> 24) & 0xff
  return i
}

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

exports.ReadArea = util.promisify(
  (client, area, dbNumber, start, amount, wordLen, callback) => {
    client.ReadArea(area, dbNumber, start, amount, wordLen, function (
      err,
      s7data
    ) {
      if (err) return callback(err)
      callback(err, s7data)
    })
  }
)

exports.WriteArea = util.promisify(
  (client, area, dbNumber, start, amount, wordLen, buffer, callback) => {
    client.WriteArea(area, dbNumber, start, amount, wordLen, buffer, function (
      err
    ) {
      if (err) return callback(err)
      callback(err, true)
    })
  }
)
