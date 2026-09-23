import assert from 'node:assert/strict'
import { test } from 'node:test'
import sgMail from '@sendgrid/mail'
import Notifications from '../lib/Notifications.js'
import MailingList from '../lib/MailingList.js'
import { composeAlarmEmail } from '../lib/alarmEmail.js'

const alarmLog = {
  operation: { id: 1 },
  alarm: { id: 12, key: 'al-pn', query: { name: 'PLC <A&B>' } },
  device: { id: 2, name: 'Lift 2' },
  date: '2026-09-23T10:20:30.000Z'
}

function mockSendGrid (t) {
  const previous = {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_SENDER: process.env.SENDGRID_SENDER
  }
  process.env.SENDGRID_API_KEY = 'SG.test-only-key'
  process.env.SENDGRID_SENDER = 'sender@example.com'
  t.after(() => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
  })
  const requests = []
  t.mock.method(sgMail.client, 'request', async request => {
    requests.push(request)
    return [{ statusCode: 202 }, {}]
  })
  return requests
}

function mockDb (recipients) {
  return {
    collection: () => ({
      find: filter => {
        assert.deepEqual(filter, { status: true })
        return { toArray: async () => recipients }
      }
    })
  }
}

test('renders Italian and English independently and escapes HTML parameters', () => {
  const italian = composeAlarmEmail('Daman', alarmLog, 'it')
  const english = composeAlarmEmail('Daman', alarmLog, 'en')
  assert.match(italian.subject, /Allarme AL12/)
  assert.match(italian.text, /Profinet nodo PLC <A&B>/)
  assert.match(english.text, /Profinet node PLC <A&B>/)
  assert.match(italian.html, /PLC &lt;A&amp;B&gt;/)
  assert.doesNotMatch(italian.html, /<A&B>/)
  assert.match(italian.text, /10:20:30/)
  assert.deepEqual(composeAlarmEmail('Daman', alarmLog, 'fr'), english)
})

test('unknown alarm keys preserve the alarm identifier', () => {
  const result = composeAlarmEmail('Daman', {
    ...alarmLog,
    alarm: { id: 999, key: 'unknown' }
  }, 'it')
  assert.match(result.text, /Allarme AL999/)
})

test('sends localized emails with private recipient lists and English fallback', async t => {
  const requests = mockSendGrid(t)
  const mailingList = new MailingList(mockDb([
    { email: 'it@example.com', locale: 'it' },
    { email: 'en@example.com', locale: 'en' },
    { email: 'legacy@example.com' }
  ]))
  await mailingList.sendMail('Daman', alarmLog)
  assert.equal(requests.length, 2)
  assert.match(requests[0].body.subject, /Allarme/)
  assert.match(requests[1].body.subject, /Alarm/)
  assert.deepEqual(requests[1].body.personalizations.map(p => p.to.map(recipient => recipient.email)), [
    ['en@example.com'],
    ['legacy@example.com']
  ])
  assert.equal(requests[0].body.content.length, 2)
})

test('skips non-alarm events and empty mailing lists', async t => {
  const requests = mockSendGrid(t)
  const mailingList = new MailingList(mockDb([]))
  await mailingList.sendMail('Daman', alarmLog)
  await mailingList.sendMail('Daman', { operation: { id: 2 } })
  assert.equal(requests.length, 0)
})

test('reports missing configuration and propagates provider errors', async t => {
  const requests = mockSendGrid(t)
  const notifications = new Notifications()
  delete process.env.SENDGRID_SENDER
  await assert.rejects(
    notifications.sendEmailNotification('to@example.com', 'Alarm', 'Text'),
    /SENDGRID_SENDER/
  )
  assert.equal(requests.length, 0)
  process.env.SENDGRID_SENDER = 'sender@example.com'
  const error = new Error('Provider unavailable')
  t.mock.method(sgMail.client, 'request', async () => { throw error })
  await assert.rejects(
    notifications.sendEmailNotification('to@example.com', 'Alarm', 'Text'),
    error
  )
})
