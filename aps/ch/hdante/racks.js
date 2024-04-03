const { ab, abSH, eb, ebSH, merkers } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
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
    new S7_521_1BH00_0AB0(4, [eb[8], ab[4]]) // 8 DI  + 8 DO
  ]
}

const rack2 = {
  nr: 2,
  // serie: 'et200m',
  // title: 'KKP',
  cards: [
    new S7_523_1BL00_0AA0(1, eb.slice(9, 11).concat(ab.slice(5, 7))) // 16 DI + 16 DO
  ]
}

const rack3 = {
  nr: 3,
  // serie: 'et200s',
  // title: 'SH',
  cards: [
    new S7_131_6BF00_0BA0(1, ebSH[0]),
    new S7_131_6BF00_0BA0(2, ebSH[1]),
    new S7_131_6BF00_0BA0(3, ebSH[2]),
    new S7_131_6BF00_0BA0(4, ebSH[3]),
    new S7_131_6BF00_0BA0(5, ebSH[4]),
    new S7_132_6BF00_0BA0(6, abSH[0]),
    new S7_132_6BF00_0BA0(7, abSH[1]),
    new S7_132_6BF00_0BA0(8, abSH[2])
  ]
}

// module.exports = [rack1, rack2, rack3]

const { Pn } = require('../../../models/Pn')

const pn00 = new Pn('LS', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('KKP', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn02 = new Pn('SH', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-5 PN', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3

module.exports = [pn00, pn01, pn02]
