const fetch = require('node-fetch')

class HttpError {
  constructor (statusCode, error, message) {
    this.statusCode = statusCode
    this.error = error
    this.message = message
  }
}

async function checkAuth (res, authorization, cb) {
  if (!authorization) {
    cb(new HttpError(401, 'Unauthorized', 'Authorization header missing'))
  } else {
    res.onAborted(() => {
      res.aborted = true
    })
    try {
      const token = authorization.split(' ')[1]
      const response = await fetch(process.env.AUTH_PROVIDER.concat('/profile'),
        {
          method: 'POST',
          // credentials: 'include',
          headers: {
            Authorization: JSON.stringify({ token })
          }
        }
      )
      const res = await response.json()
      if (res.statusCode !== undefined) return cb(res) // TODO: refactor :-P
      cb(null, res)
    } catch (err) {
      console.error('Authorization error:', err)
      cb(new HttpError(503, 'Service unavailable', err.code))
    }
  }
}

exports.checkAuth = checkAuth
