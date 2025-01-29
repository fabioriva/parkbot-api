const { ab, eb, merkers } = require('./obj')

const {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(2, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(3, eb.slice(8, 12)),
    new S7_522_1BL01_0AB0(4, ab.slice(0, 4)),
    new S7_522_1BL01_0AB0(5, ab.slice(4, 8))
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[12]),
    new S7_131_6BF00_0BA0(2, eb[13]),
    new S7_131_6BF00_0BA0(3, eb[14]),
    new S7_131_6BF00_0BA0(4, eb[15]),
    new S7_132_6BF00_0BA0(5, ab[8]),
    new S7_132_6BF00_0BA0(6, ab[9])
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[16]),
    new S7_131_6BF00_0BA0(2, eb[17]),
    new S7_132_6BF00_0BA0(3, ab[10])
  ]
}

const { Pn } = require('../../../models/Pn')

const pn00 = new Pn('LS', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('KKP', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn02 = new Pn('SH', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-5 PN', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3

module.exports = [pn00, pn01, pn02]
