import assert from 'node:assert/strict'
import test from 'node:test'
import { Alarms, generateAlarms, updateAlarms } from '../models/Alarm.js'

function alarmBuffer (iso, active = true) {
  const instant = Date.parse(iso)
  const midnight = Date.parse(iso.slice(0, 10) + 'T00:00:00.000Z')
  const buffer = Buffer.alloc(8)
  buffer[0] = active ? 1 : 0
  buffer.writeUInt16BE((midnight - Date.UTC(1990, 0, 1)) / 86400000, 2)
  buffer.writeUInt32BE(instant - midnight, 4)
  return buffer
}

const definitions = [
  { id: 1, key: 'alarm-one', query: { device: 'EL1' } },
  { id: 2, key: 'alarm-two', query: {} },
  { id: 3, key: 'alarm-three', query: {} }
]

test('live alarm timestamps preserve UTC and milliseconds across server time zones', async t => {
  const previous = process.env.TZ
  try {
    for (const timeZone of ['UTC', 'Europe/Rome', 'Asia/Dubai', 'America/New_York']) {
      process.env.TZ = timeZone
      await t.test(timeZone, async () => {
        const alarms = generateAlarms(1, 1, definitions)
        for (const iso of [
          '1990-01-01T00:00:00.000Z',
          '2026-10-06T11:18:47.731Z',
          '2024-02-29T23:59:59.999Z',
          '2026-03-29T02:30:00.000Z',
          '2026-10-25T02:30:00.000Z',
          new Date(Date.UTC(1990, 0, 1) + 32768 * 86400000).toISOString()
        ]) {
          await updateAlarms(0, alarmBuffer(iso), 8, alarms)
          assert.deepEqual({ ...alarms[0] }, { ...definitions[0], status: true, date: iso })
          assert.equal(JSON.parse(JSON.stringify({ devices: [{ alarms }] })).devices[0].alarms[0].date, iso)
        }
      })
    }
  } finally {
    if (previous === undefined) delete process.env.TZ
    else process.env.TZ = previous
  }
})

test('active alarms are sorted newest first, excluding inactive alarms', async () => {
  const alarms = generateAlarms(1, 3, definitions)
  const buffer = Buffer.concat([
    alarmBuffer('2026-10-06T00:00:00.001Z'),
    alarmBuffer('2026-10-06T00:00:00.002Z'),
    alarmBuffer('2026-10-06T00:00:00.003Z', false)
  ])
  await updateAlarms(0, buffer, 8, alarms)
  assert.deepEqual(new Alarms(alarms)._active.map(alarm => alarm.id), [2, 1])
})
