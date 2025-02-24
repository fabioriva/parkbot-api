import { format } from 'date-fns'
import util from 'util'
import { getPlcDateTime } from '../lib/utils7.js'
// const i18next = require('i18next')

class Alarm {
  constructor (id, status, str) {
    this.id = str.id // id
    // this.label = 'AL'.concat(str.id)
    this.key = str.key
    this.query = str.query
    this.status = status
  }

  update (buffer) {
    this.status = (buffer[0] & 1) === 1
    this.date = format(
      getPlcDateTime(buffer.readInt16BE(2), buffer.readInt32BE(4)),
      'yyyy-MM-dd HH:mm:ss:SSS'
    )
  }

  // async translate (locale) {
  //   const t = await i18next.changeLanguage(locale)
  //   console.log(
  //     'i18next',
  //     locale,
  //     this.key,
  //     this.query,
  //     t(this.key, {
  //       ns: 'alarms',
  //       interpolation: { escapeValue: false },
  //       ...this.query
  //     })
  //   )
  //   this.i18n = t(this.key, {
  //     ns: 'alarms',
  //     interpolation: { escapeValue: false },
  //     ...this.query
  //   })
  // }
}

export class Alarms {
  constructor (alarms = [], id) {
    this.alarms = alarms
    this.id = id
  }

  get _active () {
    return this.alarms
      .filter(item => item.status !== false)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  // set _active (alarms) {
  //   this.active = alarms.filter(item => item.status !== false)
  // }
}

export const countAlarms = alarms => {
  let count = 0
  alarms.forEach(group => {
    count += group._active.length
  })
  return count
}

export const generateAlarms = (min, max, str) => {
  const alarms = []
  for (let i = min; i <= max; i++) {
    alarms.push(new Alarm(i, false, str[i - 1]))
  }
  return alarms
}

export const updateAlarms = util.promisify(
  (start, buffer, offset, alarms, callback) => {
    let byte = start
    for (let i = 0; i < alarms.length; i++) {
      alarms[i].update(buffer.slice(byte, byte + offset))
      // alarms[i].translate('it')
      byte += offset
    }
    callback(null, alarms)
  }
)
