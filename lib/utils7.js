import { promisify } from 'node:util'

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

/**
 * promisify snap7 I/O functions
 */

export const ReadArea = promisify(
  (client, area, dbNumber, start, amount, wordLen, callback) => {
    client.ReadArea(area, dbNumber, start, amount, wordLen, callback)
  }
)

// Snap7 uses one byte for a single bit, rather than a packed bit array.
const writeWordBytes = new Map([
  [0x01, 1], // Bit
  [0x02, 1], // Byte
  [0x04, 2], // Word
  [0x06, 4], // DWord
  [0x08, 4], // Real
  [0x1C, 2], // Counter
  [0x1D, 2] // Timer
])

export const WriteArea = promisify(
  (client, area, dbNumber, start, amount, wordLen, buffer, callback) => {
    if (!Buffer.isBuffer(buffer)) throw new TypeError('WriteArea buffer must be a Buffer')
    if (!Number.isInteger(amount) || amount < 1 || amount > 0x7FFFFFFF) {
      throw new RangeError('WriteArea amount must be a positive 32-bit signed integer')
    }
    const bytesPerWord = writeWordBytes.get(wordLen)
    if (bytesPerWord === undefined) throw new RangeError('WriteArea wordLen is not supported')
    if (wordLen === 0x01 && amount !== 1) {
      throw new RangeError('WriteArea supports only one bit per write')
    }
    const requiredBytes = amount * bytesPerWord
    if (buffer.length < requiredBytes) {
      throw new RangeError(`WriteArea buffer requires at least ${requiredBytes} bytes; received ${buffer.length}`)
    }
    client.WriteArea(
      area, dbNumber, start, amount, wordLen, buffer,
      err => callback(err, true)
    )
  }
)
