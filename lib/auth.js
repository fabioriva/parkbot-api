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

export async function checkAuth (headers) {
  // Extract headers into a plain object BEFORE any await
  try {
    const session = await auth.api.getSession({ headers })
    // console.log(session)
    return session
  } catch (error) {
    console.error(error)
    return null
  }
}
