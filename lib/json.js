export class Message {
  constructor (severity, message) {
    this.severity = severity
    this.message = message
  }
}

// export const readJson = function readJson (res, cb, err) {
//   let buffer
//   /* Register data cb */
//   res.onData((ab, isLast) => {
//     const chunk = Buffer.from(ab)
//     if (isLast) {
//       let json
//       if (buffer) {
//         try {
//           json = JSON.parse(Buffer.concat([buffer, chunk]))
//         } catch (e) {
//           /* res.close calls onAborted */
//           res.close()
//           return
//         }
//         cb(json)
//       } else {
//         try {
//           json = JSON.parse(chunk)
//         } catch (e) {
//           /* res.close calls onAborted */
//           res.close()
//           return
//         }
//         cb(json)
//       }
//     } else {
//       if (buffer) {
//         buffer = Buffer.concat([buffer, chunk])
//       } else {
//         buffer = Buffer.concat([chunk])
//       }
//     }
//   })
//   /* Register error cb */
//   res.onAborted(err)
// }

export function readJson (res) {
  return new Promise((resolve, reject) => {
    let buffer = ''

    res.onData((chunk, isLast) => {
      if (res.aborted) return

      buffer += Buffer.from(chunk).toString()

      if (isLast) {
        try {
          resolve(JSON.parse(buffer))
        } catch (err) {
          reject(new Error('Invalid JSON'))
        }
      }
    })

    res.onAborted(() => {
      res.aborted = true
      resolve(null) // <-- IMPORTANT: do NOT reject
    })
  })
}

export function safeRoute (handler) {
  return (req, res) => {
    // 1. Attach abort handler immediately
    res.aborted = false
    res.onAborted(() => {
      res.aborted = true
    })

    // 2. Extract everything from req BEFORE any await
    const request = {
      method: req.getMethod(),
      url: req.getUrl(),
      query: req.getQuery(),
      params: {}, // you can fill this if you use params
      headers: {}
    }

    req.forEach((key, value) => {
      request.headers[key] = value
    })

    // 3. Run async logic safely
    ;(async () => {
      try {
        await handler(request, res)
      } catch (err) {
        console.error('Route error:', err)
        if (!res.aborted) {
          sendJson(res, { error: 'Internal Server Error' }, '500 Internal Server Error')
        }
      }
    })()
  }
}

export function sendJson (res, obj, status = '200 OK') {
  // If the client aborted, do nothing
  if (res.aborted) return

  try {
    const body = JSON.stringify(obj)

    res.cork(() => {
      if (res.aborted) return
      res.writeStatus(status)
      res.writeHeader('Content-Type', 'application/json')
      res.end(body)
    })
  } catch (err) {
    console.error('sendJson error:', err)
  }
}

// export const readJson = function readJson (res) {
//   return new Promise((resolve, reject) => {
//     let buffer = ''

//     res.onData((chunk, isLast) => {
//       if (res.aborted) return

//       buffer += Buffer.from(chunk).toString()

//       if (isLast) {
//         try {
//           resolve(JSON.parse(buffer))
//         } catch (err) {
//           reject(new Error('Invalid JSON'))
//         }
//       }
//     })

//     res.onAborted(() => {
//       reject(new Error('Aborted'))
//     })
//   })
// }

// export const readJson = function readJson (res) {
//   return new Promise((resolve, reject) => {
//     let buffer

//     res.onData((ab, isLast) => {
//       const chunk = Buffer.from(ab)

//       if (isLast) {
//         try {
//           const json = buffer
//             ? JSON.parse(Buffer.concat([buffer, chunk]))
//             : JSON.parse(chunk)

//           resolve(json)
//         } catch (e) {
//           // Chiude la connessione → attiva onAborted
//           res.close()
//         }
//       } else {
//         buffer = buffer
//           ? Buffer.concat([buffer, chunk])
//           : Buffer.concat([chunk])
//       }
//     })

//     res.onAborted(() => {
//       reject(new Error('Request aborted'))
//     })
//   })
// }

// export const sendJson = function sendJson (res, data, status) {
//   /* If we were aborted, you cannot respond */
//   if (!res.aborted) {
//     res.cork(() => {
//       res
//         .writeStatus(status || '200 OK')
//         .writeHeader('Content-Type', 'application/json')
//         .end(JSON.stringify(data))
//     })
//   }
// }
