import util from 'util'

// export const bytesToInt = function bytesToInt (b1, b2) {
//   return (b1 << 8) | b2
// }

// export const bytesToLong = function bytesToLong (b1, b2, b3, b4) {
//   return (b1 << 24) | (b2 << 16) | (b3 << 8) | b4
// }

// export const intToBytes = function intToBytes (i, b) {
//   b[0] = i & 0xff
//   b[1] = (i >> 8) & 0xff
//   return i
// }

// export const longToBytes = function longToBytes (i, b) {
//   b[0] = i & 0xff
//   b[1] = (i >> 8) & 0xff
//   b[2] = (i >> 16) & 0xff
//   b[3] = (i >> 24) & 0xff
//   return i
// }

/**
 * Parameters:
 * days - unsigned PLC DATE: days since 1990-1-1, in UTC
 * msec - unsigned PLC TOD: milliseconds since 00:00 UTC (midnight)
 * Return value:
 * The number of milliseconds between 1 January 1970 00:00:00 UTC and the given date
 */

export function getPlcDateTime (days, msec) {
  return Date.UTC(1990, 0, 1) + days * 86400000 + msec
}

// /** promisify snap7 I/O functions */
export const ReadArea = util.promisify(
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

export const WriteArea = util.promisify(
  (client, area, dbNumber, start, amount, wordLen, buffer, callback) => {
    client.WriteArea(area, dbNumber, start, amount, wordLen, buffer, function (
      err
    ) {
      if (err) return callback(err)
      callback(err, true)
    })
  }
)

/** snap7 async I/O helpers */

// export const ReadArea = async (
//   client,
//   area,
//   dbNumber,
//   start,
//   amount,
//   wordLen
// ) => {
//   return client.ReadArea(area, dbNumber, start, amount, wordLen)
// }

// export const WriteArea = async (
//   client,
//   area,
//   dbNumber,
//   start,
//   amount,
//   wordLen,
//   buffer
// ) => {
//   return client.WriteArea(area, dbNumber, start, amount, wordLen, buffer)
// }
