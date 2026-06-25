import { betterAuth } from 'better-auth/minimal'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { bearer } from 'better-auth/plugins'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI + '/parkbot-auth')
const db = client.db()

export const auth = betterAuth({
  database: mongodbAdapter(db),
  plugins: [bearer()]
})

export async function checkAuth (req) {
  try {
    const headers = {}
    req.forEach((key, value) => {
      headers[key] = value
    })
    const session = await auth.api.getSession({ headers })
    console.log(session)
    return session
  } catch (error) {
    console.error(error)
    return null
  }
}

// export async function checkAuth (headers) {
//   try {
//     const session = await auth.api.getSession({ headers })
//     // console.log(session)
//     return session
//   } catch (error) {
//     console.error(error)
//     return null
//   }
// }

// export async function checkAuth (req) {
//   try {
//     // Extract headers into a plain object BEFORE any await
//     const headers = {}
//     req.forEach((key, value) => {
//       headers[key] = value
//     })

//     // Now pass the plain object directly
//     const session = await auth.api.getSession({
//       headers
//     })

//     return session
//   } catch (error) {
//     console.error(error)
//     return null
//   }
// }

// export async function checkAuth (req) {
//   try {
//     // Extract headers into a plain object BEFORE any await
//     const headersObj = {}
//     req.forEach((key, value) => {
//       headersObj[key] = value
//     })

//     // Now create a real Headers instance from the plain object
//     const headers = new Headers(headersObj)

//     // Safe to await now
//     const session = await auth.api.getSession({ headers })
//     return session
//   } catch (error) {
//     console.error(error)
//     return null
//   }
// }

// export async function checkAuth (req) {
//   try {
//     const headers = new Headers()
//     req.forEach((key, value) => headers.append(key, value))
//     console.log(headers)
//     const session = await auth.api.getSession({
//       headers
//     })
//     console.log(session)
//     return session
//   } catch (error) {
//     console.error(error)
//     return null
//   }
// }
