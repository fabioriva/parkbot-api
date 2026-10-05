import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'

export function parseOperationDate (value, timeZone) {
  // Validate the zone even when the input already contains an offset.
  new Intl.DateTimeFormat('en', { timeZone }).format(0)
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:$|T.*(?:Z|[+-]\d{2}:\d{2})$)/.test(value)) {
    throw new RangeError('Expected YYYY-MM-DD or an ISO timestamp with an explicit offset')
  }
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value)
  const date = dateOnly ? fromZonedTime(value + 'T00:00:00', timeZone) : new Date(value)
  if (!Number.isFinite(date.getTime()) || (dateOnly && dateLabel(date, timeZone) !== value)) {
    throw new RangeError('Invalid operation date')
  }
  return date
}

export function dateLabel (date, timeZone) {
  return formatInTimeZone(date, timeZone, 'yyyy-MM-dd')
}

export function calendarBounds (date, timeZone, period) {
  // UTC here is a calendar arithmetic workspace, not the report's time zone.
  const day = new Date(dateLabel(date, timeZone) + 'T00:00:00Z')
  let start = new Date(day)
  let end = new Date(day)
  if (period === 'daily') {
    end.setUTCDate(end.getUTCDate() + 1)
  } else if (period === 'weekly') {
    start.setUTCDate(start.getUTCDate() - (start.getUTCDay() + 6) % 7 - 7)
    end = new Date(start)
    end.setUTCDate(end.getUTCDate() + 7)
  } else if (period === 'monthly') {
    end.setUTCDate(1)
    start = new Date(end)
    start.setUTCMonth(start.getUTCMonth() - 1)
  } else if (period === 'yearly') {
    const month = start.getUTCMonth()
    start.setUTCFullYear(start.getUTCFullYear() - 1)
    // Clamp February 29 to February 28 in non-leap years.
    if (start.getUTCMonth() !== month) start.setUTCDate(0)
  } else {
    throw new RangeError('Invalid report period')
  }
  const midnight = value => fromZonedTime(value.toISOString().slice(0, 10) + 'T00:00:00', timeZone)
  return { start: midnight(start), end: midnight(end) }
}

export function operationQuery (start, end, timeZone, daily = false) {
  return {
    date: daily ? dateLabel(start, timeZone) : dateLabel(start, timeZone) + ' ' + dateLabel(end, timeZone),
    dateFrom: start.toISOString(),
    dateTo: end.toISOString(),
    timeZone
  }
}
