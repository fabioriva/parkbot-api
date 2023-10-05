class Pn {
  constructor (name, nr, online, type, i18n) {
    this.deviceName = name
    this.deviceNr = nr
    this.online = online
    this.type = type
    this.key = i18n.key
    this.query = i18n.query
  }
}

module.exports = { Pn }
