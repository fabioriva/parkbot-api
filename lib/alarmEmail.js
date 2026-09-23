import { m } from './paraglide/messages.js'
import { baseLocale, locales } from './paraglide/runtime.js'

export const notificationLocale = locale => locales.includes(locale) ? locale : baseLocale

const escapeHtml = text => text.replace(/[&<>"']/g, char => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[char])

export function composeAlarmEmail (aps, doc, locale) {
  const options = { locale: notificationLocale(locale) }
  const { alarm, device } = doc
  const id = alarm?.id ?? '?'
  const translate = m[`alarm.${alarm?.key}`]
  const description = typeof translate === 'function'
    ? translate(alarm.query ?? {}, options)
    : m['alarm.al-id']({ id }, options)
  const params = {
    aps,
    id,
    device: device?.name ?? device?.id ?? '?',
    alarm: description,
    date: new Intl.DateTimeFormat(options.locale, {
      dateStyle: 'medium',
      timeStyle: 'long',
      timeZone: 'UTC'
    }).format(new Date(doc.date))
  }
  const subject = m.notification_alarm_subject(params, options)
  const text = m.notification_alarm_text(params, options)
  const html = `<div lang="${options.locale}">${escapeHtml(text).replace(/\n/g, '<br>')}</div>`
  return { subject, text, html }
}
