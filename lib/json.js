export class Message {
  constructor (severity, message) {
    this.severity = severity
    this.message = message
  }
}

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
