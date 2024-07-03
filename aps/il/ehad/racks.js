const { ab, eb, merkers } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(0, 2)),
    new S7_521_1BH00_0AB0(2, eb.slice(2, 4)),
    new S7_522_1BH01_0AB0(3, ab.slice(0, 2)),
    new S7_522_1BH01_0AB0(4, ab.slice(2, 4))
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[4]),
    new S7_131_6BF00_0BA0(2, eb[5]),
    new S7_131_6BF00_0BA0(3, eb[6]),
    new S7_131_6BF00_0BA0(4, eb[7]),
    new S7_131_6BF00_0BA0(5, eb[8]),
    new S7_132_6BF00_0BA0(6, ab[4]),
    new S7_132_6BF00_0BA0(7, ab[5]),
    new S7_132_6BF00_0BA0(8, ab[6])
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(9, 13)),
    new S7_521_1BL00_0AB0(2, eb.slice(13, 17)),
    new S7_521_1BH00_0AB0(3, eb.slice(17, 19)),
    new S7_521_1BH00_0AB0(4, eb.slice(19, 21)),
    new S7_521_1BL00_0AB0(5, eb.slice(21, 25)),
    new S7_522_1BH01_0AB0(6, ab.slice(7, 9)),
    new S7_522_1BH01_0AB0(7, ab.slice(9, 11)),
    new S7_522_1BH01_0AB0(8, ab.slice(11, 13)),
    new S7_522_1BL01_0AB0(9, ab.slice(13, 17))
  ]
}

const { Pn } = require('../../../models/Pn')

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('KKU', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn02 = new Pn('LSE', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-5 PN', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3

module.exports = [pn00, pn01, pn02]
