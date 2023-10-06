const { ab, eb, merkers } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BH01_0AB0,
  S7_522_1BL01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'CPU',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BH00_0AB0(2, eb.slice(4, 6)),
    new S7_522_1BL01_0AB0(3, ab.slice(0, 4))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'LS1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(6, 10)),
    new S7_521_1BL00_0AB0(2, eb.slice(10, 14)),
    new S7_522_1BL01_0AB0(3, ab.slice(4, 8)),
    new S7_522_1BH01_0AB0(4, ab.slice(8, 10))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200s',
  title: 'KKP1',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[14]),
    new S7_131_6BF00_0BA0(2, eb[15]),
    new S7_132_6BF00_0BA0(3, ab[10])
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200m',
  title: 'LS2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(16, 20)),
    new S7_521_1BL00_0AB0(2, eb.slice(20, 24)),
    new S7_522_1BL01_0AB0(3, ab.slice(11, 15)),
    new S7_522_1BH01_0AB0(4, ab.slice(15, 17))
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200s',
  title: 'KKP2',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[24]),
    new S7_131_6BF00_0BA0(2, eb[25]),
    new S7_132_6BF00_0BA0(3, ab[17])
  ]
}

const rack6 = {
  nr: 6,
  serie: 'et200m',
  title: 'LS3',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(26, 30)),
    new S7_522_1BH01_0AB0(2, ab.slice(18, 20))
  ]
}

const rack7 = {
  nr: 7,
  serie: 'et200s',
  title: 'KKP3',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[30]),
    new S7_131_6BF00_0BA0(2, eb[31]),
    new S7_132_6BF00_0BA0(3, ab[20])
  ]
}

const rack8 = {
  nr: 8,
  serie: 'et200s',
  title: 'KKS3',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[32]),
    new S7_131_6BF00_0BA0(2, eb[33]),
    new S7_131_6BF00_0BA0(3, eb[34]),
    new S7_131_6BF00_0BA0(4, eb[35]),
    new S7_131_6BF00_0BA0(5, eb[36]),
    new S7_132_6BF00_0BA0(6, ab[21]),
    new S7_132_6BF00_0BA0(7, ab[22]),
    new S7_132_6BF00_0BA0(8, ab[23])
  ]
}

const rack9 = {
  nr: 9,
  serie: 'et200m',
  title: 'LS4',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(37, 41)),
    new S7_522_1BH01_0AB0(2, ab.slice(24, 26))
  ]
}

const rack10 = {
  nr: 10,
  // serie: 'et200s',
  // title: 'KKP4',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[41]),
    new S7_131_6BF00_0BA0(2, eb[42]),
    new S7_132_6BF00_0BA0(3, ab[26])
  ]
}

const rack11 = {
  nr: 11,
  // serie: 'et200s',
  // title: 'KKS4',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[43]),
    new S7_131_6BF00_0BA0(2, eb[44]),
    new S7_131_6BF00_0BA0(3, eb[45]),
    new S7_131_6BF00_0BA0(4, eb[46]),
    new S7_131_6BF00_0BA0(5, eb[47]),
    new S7_132_6BF00_0BA0(6, ab[27]),
    new S7_132_6BF00_0BA0(7, ab[28]),
    new S7_132_6BF00_0BA0(8, ab[29])
  ]
}

// module.exports = [
//   rack1,
//   rack2,
//   rack3,
//   rack4,
//   rack5,
//   rack6,
//   rack7,
//   rack8,
//   rack9,
//   rack10,
//   rack11
// ]

const { Pn } = require('../../../models/Pn')

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('LS1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn02 = new Pn('KKP1', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn03 = new Pn('LS2', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn04 = new Pn('KKP2', 4, merkers.find(b => b.addr === 'M4.3'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn05 = new Pn('LS3', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn06 = new Pn('KKP3', 6, merkers.find(b => b.addr === 'M4.5'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn07 = new Pn('KKS3', 7, merkers.find(b => b.addr === 'M4.6'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn08 = new Pn('LS4', 8, merkers.find(b => b.addr === 'M4.7'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn09 = new Pn('KKP4', 9, merkers.find(b => b.addr === 'M5.0'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn10 = new Pn('KKS4', 10, merkers.find(b => b.addr === 'M5.1'), 'IM 155-6 PN', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3
pn03.rack = rack4
pn04.rack = rack5
pn05.rack = rack6
pn06.rack = rack7
pn07.rack = rack8
pn08.rack = rack9
pn09.rack = rack10
pn10.rack = rack11

module.exports = [pn00, pn01, pn02, pn03, pn04, pn05, pn06, pn07, pn08, pn09, pn10]
