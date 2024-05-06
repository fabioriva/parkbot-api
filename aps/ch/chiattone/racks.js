const { ab, eb, merkers } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_521_1BH00_0AB0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  // serie: 'et200m',
  // title: 'LS',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(2, eb.slice(4, 8)),
    new S7_521_1BH00_0AB0(3, eb.slice(8, 10)),
    new S7_522_1BL01_0AB0(4, ab.slice(0, 4)),
    new S7_521_1BL00_0AB0(5, eb.slice(10, 14)),
    new S7_522_1BL01_0AB0(6, ab.slice(4, 8))
  ]
}

const rack2 = {
  nr: 2,
  // serie: 'et200m',
  // title: 'SH2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(14, 18)),
    new S7_522_1BL01_0AB0(2, ab.slice(8, 12))
  ]
}

const rack3 = {
  nr: 3,
  // serie: 'et200m',
  // title: 'SH3',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(18, 22)),
    new S7_522_1BL01_0AB0(2, ab.slice(12, 16))
  ]
}

// module.exports = [rack1, rack2, rack3]

const { Pn } = require('../../../models/Pn')

const pn00 = new Pn('EL/SH1', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('SH1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn02 = new Pn('SH2', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-5 PN', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3

module.exports = [pn00, pn01, pn02]
