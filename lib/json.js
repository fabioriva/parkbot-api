import { StringDecoder } from 'node:string_decoder'

export const DEFAULT_JSON_BODY_LIMIT = 64 * 1024

export class JsonRequestError extends Error {
  constructor (statusCode, message, options) {
    super(message, options)
    this.name = 'JsonRequestError'
    this.statusCode = statusCode
  }
}

export class Message {
  constructor (severity, message) {
    this.severity = severity
    this.message = message
  }
}

export function readJson (res, { maxBytes = DEFAULT_JSON_BODY_LIMIT } = {}) {
  return new Promise((resolve, reject) => {
    if (res.aborted || res.completed) return resolve(null)
    if (!Number.isSafeInteger(maxBytes) || maxBytes < 1) {
      reject(new RangeError('maxBytes must be a positive safe integer'))
      return
    }
    let decoder = new StringDecoder('utf8')
    let parts = []
    let bytes = 0
    let settled = false

    const finish = (error, value) => {
      if (settled) return
      settled = true
      parts = []
      decoder = null
      if (error) reject(error)
      else resolve(value)
    }

    res.onAborted(() => {
      res.aborted = true
      finish(null, null)
    })

    res.onData((chunk, isLast) => {
      if (settled || res.aborted || res.completed) return
      bytes += chunk.byteLength
      if (bytes > maxBytes) {
        finish(new JsonRequestError(413, 'JSON body too large'))
        return
      }

      try {
        // Decode before returning: uWS releases the received ArrayBuffer.
        const text = decoder.write(Buffer.from(chunk))
        if (text) parts.push(text)
        if (isLast) {
          parts.push(decoder.end())
          const value = JSON.parse(parts.join(''))
          finish(null, value)
        }
      } catch (error) {
        finish(new JsonRequestError(400, 'Invalid JSON', { cause: error }))
      }
    })
  })
}

export function sendJson (res, obj, status = '200 OK') {
  if (res.aborted || res.completed) return

  let body
  try {
    body = JSON.stringify(obj)
    if (body === undefined) throw new TypeError('Response is not JSON serializable')
  } catch (error) {
    console.error({ err: error }, 'JSON serialization failed')
    body = '{"error":"Internal server error"}'
    status = '500 Internal Server Error'
  }
  if (res.aborted || res.completed) return
  res.cork(() => {
    if (res.aborted || res.completed) return
    res.writeStatus(status)
    res.writeHeader('Content-Type', 'application/json; charset=utf-8')
    res.completed = true
    // The unread remainder of an oversized upload must not keep the connection open.
    res.end(body, status === '413 Payload Too Large')
  })
}
