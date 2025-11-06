// const fetch = require('node-fetch')

class HttpError {
  constructor (statusCode, error, message) {
    this.statusCode = statusCode
    this.error = error
    this.message = message
  }
}

export default async function checkAuth (res, authorization, cb) {
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

export async function checkSession (res, aps, authorization, cb) {
  try {
    console.log('check session auth header:', authorization, authorization === undefined)

    if (!authorization) {
      throw new Error('Authorization header missing')
    }
    res.onAborted(() => {
      res.aborted = true
    })
    const token = authorization.split(' ').pop()
    console.log('check session token:', token)
    const url = 'http://192.168.20.99:3000/action/get-session'
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.ok) {
      const { aps: { ns }, user } = await response.json()
      console.log('check session aps:', ns, aps)
      if (aps !== ns) {
        throw new Error('Aps authorization failed')
      }
      console.log('check session user:', user)
      cb(null)
    } else {
      throw new Error('Authorization service error')
    }
  } catch (error) {
    console.log(error)
    cb(new HttpError(401, 'Unauthorized', error.message))
  }
}
