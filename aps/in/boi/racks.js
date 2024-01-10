const { ab, eb, merkers } = require('./obj')
const {
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(0, 2)),
    new S7_132_6BH01_0BA0(2, ab.slice(0, 2))
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(2, 4)),
    new S7_132_6BH01_0BA0(2, ab.slice(2, 4))
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(4, 6)),
    new S7_131_6BH01_0BA0(2, eb.slice(6, 8)),
    new S7_131_6BH01_0BA0(3, eb.slice(8, 10)),
    new S7_132_6BH01_0BA0(4, ab.slice(4, 6)),
    new S7_132_6BH01_0BA0(5, ab.slice(6, 8))
  ]
}

const rack4 = {
  nr: 4,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(10, 12)),
    new S7_131_6BH01_0BA0(2, eb.slice(12, 14)),
    new S7_132_6BH01_0BA0(3, ab.slice(8, 10))
  ]
}

const rack5 = {
  nr: 5,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(14, 16)),
    new S7_132_6BH01_0BA0(2, ab.slice(10, 12))
  ]
}

const rack6 = {
  nr: 6,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(16, 18)),
    new S7_132_6BH01_0BA0(2, ab.slice(12, 14))
  ]
}

const rack7 = {
  nr: 7,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(18, 20)),
    new S7_131_6BH01_0BA0(2, eb.slice(20, 22)),
    new S7_131_6BH01_0BA0(3, eb.slice(22, 24)),
    new S7_132_6BH01_0BA0(4, ab.slice(14, 16)),
    new S7_132_6BH01_0BA0(5, ab.slice(16, 18))
  ]
}

const rack8 = {
  nr: 8,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(24, 26)),
    new S7_132_6BH01_0BA0(2, ab.slice(18, 20))
  ]
}

const rack9 = {
  nr: 9,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(26, 28)),
    new S7_131_6BH01_0BA0(2, eb.slice(28, 30)),
    new S7_131_6BH01_0BA0(3, eb.slice(30, 32)),
    new S7_132_6BH01_0BA0(4, ab.slice(20, 22)),
    new S7_132_6BH01_0BA0(5, ab.slice(22, 24))
  ]
}

const rack10 = {
  nr: 10,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(32, 34)),
    new S7_131_6BH01_0BA0(2, eb.slice(34, 36)),
    new S7_132_6BH01_0BA0(3, ab.slice(24, 26))
  ]
}

const rack11 = {
  nr: 11,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(36, 38)),
    new S7_132_6BH01_0BA0(2, ab.slice(26, 28))
  ]
}

const rack12 = {
  nr: 12,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(38, 40)),
    new S7_132_6BH01_0BA0(2, ab.slice(28, 30))
  ]
}

const rack13 = {
  nr: 13,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(40, 42)),
    new S7_131_6BH01_0BA0(2, eb.slice(42, 44)),
    new S7_131_6BH01_0BA0(3, eb.slice(44, 46)),
    new S7_132_6BH01_0BA0(4, ab.slice(30, 32)),
    new S7_132_6BH01_0BA0(5, ab.slice(32, 34))
  ]
}

const { Pn } = require('../../../models/Pn')

const pn00 = new Pn('PLC', 0, merkers.find(b => b.addr === 'M4.0'), 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('LS1', 1, merkers.find(b => b.addr === 'M4.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn02 = new Pn('KKE1', 2, merkers.find(b => b.addr === 'M4.2'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn03 = new Pn('KKP1', 3, merkers.find(b => b.addr === 'M4.3'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn04 = new Pn('LSA', 4, merkers.find(b => b.addr === 'M4.4'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn05 = new Pn('KKPA', 5, merkers.find(b => b.addr === 'M4.5'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn06 = new Pn('SHA', 6, merkers.find(b => b.addr === 'M4.6'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn07 = new Pn('LS2', 1, merkers.find(b => b.addr === 'M4.7'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn08 = new Pn('KKE2', 2, merkers.find(b => b.addr === 'M5.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn09 = new Pn('KKP2', 3, merkers.find(b => b.addr === 'M5.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn10 = new Pn('LSB', 4, merkers.find(b => b.addr === 'M5.2'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn11 = new Pn('KKPB', 5, merkers.find(b => b.addr === 'M5.3'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn12 = new Pn('SHB', 6, merkers.find(b => b.addr === 'M5.4'), 'IM 155-6 PN ST', { key: 'im', query: {} })

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
pn11.rack = rack12
pn12.rack = rack13

module.exports = [pn00, pn01, pn02, pn03, pn04, pn05, pn06, pn07, pn08, pn09, pn10, pn11, pn12]
