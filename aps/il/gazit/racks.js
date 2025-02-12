const { ab, eb, merkers } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_523_1BL00_0AA0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  // serie: 'et200m',
  // title: 'LS',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(2, eb.slice(4, 8)),
    new S7_522_1BL01_0AB0(3, ab.slice(0, 4)),
    new S7_523_1BL00_0AA0(4, eb.slice(8, 10).concat(ab.slice(4, 6))) // 16 DI + 16 DO

  ]
}

const rack2 = {
  nr: 2,
  // serie: 'et200s',
  // title: 'SH',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[10]),
    new S7_131_6BF00_0BA0(2, eb[11]),
    new S7_131_6BF00_0BA0(3, eb[12]),
    new S7_132_6BF00_0BA0(4, ab[6]),
    new S7_132_6BF00_0BA0(5, ab[7]),
    new S7_132_6BF00_0BA0(6, ab[8])
  ]
}

const { Pn } = require('../../../models/Pn')

const pn00 = new Pn('LS', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('KKP', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2

module.exports = [pn00, pn01]
