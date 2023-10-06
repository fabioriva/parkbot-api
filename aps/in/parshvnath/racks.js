const { ab, eb, merkers } = require('./obj')
const {
  S7_523_1BL00_0AA0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0

} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  cards: [
    new S7_523_1BL00_0AA0(1, eb.slice(0, 2).concat(ab.slice(0, 2))) // 16 DI + 16 DO
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[2]),
    new S7_131_6BF00_0BA0(2, eb[3]),
    new S7_131_6BF00_0BA0(3, eb[4]),
    new S7_131_6BF00_0BA0(4, eb[5]),
    new S7_132_6BF00_0BA0(5, ab[2]),
    new S7_132_6BF00_0BA0(6, ab[3])
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[6]),
    new S7_131_6BF00_0BA0(2, eb[7]),
    new S7_131_6BF00_0BA0(3, eb[8]),
    new S7_131_6BF00_0BA0(4, eb[9]),
    new S7_131_6BF00_0BA0(5, eb[10]),
    new S7_131_6BF00_0BA0(6, eb[11]),
    new S7_132_6BF00_0BA0(7, ab[4]),
    new S7_132_6BF00_0BA0(8, ab[5]),
    new S7_132_6BF00_0BA0(9, ab[6]),
    new S7_132_6BF00_0BA0(10, ab[7])
  ]
}

const rack4 = {
  nr: 4,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[12]),
    new S7_131_6BF00_0BA0(2, eb[13]),
    new S7_131_6BF00_0BA0(3, eb[14]),
    new S7_131_6BF00_0BA0(4, eb[15]),
    new S7_131_6BF00_0BA0(5, eb[16]),
    new S7_131_6BF00_0BA0(6, eb[17]),
    new S7_132_6BF00_0BA0(7, ab[8]),
    new S7_132_6BF00_0BA0(8, ab[9]),
    new S7_132_6BF00_0BA0(9, ab[10]),
    new S7_132_6BF00_0BA0(10, ab[11])
  ]
}

const rack5 = {
  nr: 5,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[18]),
    new S7_131_6BF00_0BA0(2, eb[19]),
    new S7_131_6BF00_0BA0(3, eb[20]),
    new S7_131_6BF00_0BA0(4, eb[21]),
    new S7_132_6BF00_0BA0(5, ab[12]),
    new S7_132_6BF00_0BA0(6, ab[13])
  ]
}

const rack6 = {
  nr: 6,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[22]),
    new S7_131_6BF00_0BA0(2, eb[23]),
    new S7_131_6BF00_0BA0(3, eb[24]),
    new S7_131_6BF00_0BA0(4, eb[25]),
    new S7_131_6BF00_0BA0(5, eb[26]),
    new S7_131_6BF00_0BA0(6, eb[27]),
    new S7_132_6BF00_0BA0(7, ab[14]),
    new S7_132_6BF00_0BA0(8, ab[15]),
    new S7_132_6BF00_0BA0(9, ab[16]),
    new S7_132_6BF00_0BA0(10, ab[17])
  ]
}

const rack7 = {
  nr: 7,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[28]),
    new S7_131_6BF00_0BA0(2, eb[29]),
    new S7_131_6BF00_0BA0(3, eb[30]),
    new S7_131_6BF00_0BA0(4, eb[31]),
    new S7_131_6BF00_0BA0(5, eb[32]),
    new S7_131_6BF00_0BA0(6, eb[33]),
    new S7_132_6BF00_0BA0(7, ab[18]),
    new S7_132_6BF00_0BA0(8, ab[19]),
    new S7_132_6BF00_0BA0(9, ab[20]),
    new S7_132_6BF00_0BA0(10, ab[21])
  ]
}

const rack8 = {
  nr: 8,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[34]),
    new S7_131_6BF00_0BA0(2, eb[35]),
    new S7_131_6BF00_0BA0(3, eb[36]),
    new S7_131_6BF00_0BA0(4, eb[37]),
    new S7_132_6BF00_0BA0(5, ab[22]),
    new S7_132_6BF00_0BA0(6, ab[23])
  ]
}

const rack9 = {
  nr: 9,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[38]),
    new S7_131_6BF00_0BA0(2, eb[39]),
    new S7_131_6BF00_0BA0(3, eb[40]),
    new S7_131_6BF00_0BA0(4, eb[41]),
    new S7_131_6BF00_0BA0(5, eb[42]),
    new S7_131_6BF00_0BA0(6, eb[43]),
    new S7_132_6BF00_0BA0(7, ab[24]),
    new S7_132_6BF00_0BA0(8, ab[25]),
    new S7_132_6BF00_0BA0(9, ab[26]),
    new S7_132_6BF00_0BA0(10, ab[27])
  ]
}

const rack10 = {
  nr: 10,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[44]),
    new S7_131_6BF00_0BA0(2, eb[45]),
    new S7_131_6BF00_0BA0(3, eb[46]),
    new S7_131_6BF00_0BA0(4, eb[47]),
    new S7_131_6BF00_0BA0(5, eb[48]),
    new S7_131_6BF00_0BA0(6, eb[49]),
    new S7_132_6BF00_0BA0(7, ab[28]),
    new S7_132_6BF00_0BA0(8, ab[29]),
    new S7_132_6BF00_0BA0(9, ab[30]),
    new S7_132_6BF00_0BA0(10, ab[31])
  ]
}

const { Pn } = require('../../../models/Pn')

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('EL1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn02 = new Pn('SH1', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn03 = new Pn('KKE1', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn04 = new Pn('EL2', 4, merkers.find(b => b.addr === 'M4.3'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn05 = new Pn('SH2', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn06 = new Pn('KKE2', 6, merkers.find(b => b.addr === 'M4.5'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn07 = new Pn('EL3', 7, merkers.find(b => b.addr === 'M4.7'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn08 = new Pn('SH3', 8, merkers.find(b => b.addr === 'M5.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn09 = new Pn('KKE3', 9, merkers.find(b => b.addr === 'M5.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })

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

module.exports = [pn00, pn01, pn02, pn03, pn04, pn05, pn06, pn07, pn08, pn09]
