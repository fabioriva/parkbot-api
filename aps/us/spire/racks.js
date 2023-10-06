const { ab, eb, merkers } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BH01_0AB0,
  S7_522_1BL01_0AB0,
  S7_526_1BH00_0AB0,
  S7_526_2BF00_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0,
  S7_136_6BA00_0CA0,
  S7_136_6BD00_0CA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(72, 74)),
    new S7_526_1BH00_0AB0(2, eb.slice(74, 76)),
    new S7_526_2BF00_0AB0(3, ab.slice(42, 43)),
    new S7_521_1BL00_0AB0(4, eb.slice(0, 4)),
    new S7_521_1BH00_0AB0(5, eb.slice(4, 6)),
    new S7_522_1BL01_0AB0(6, ab.slice(0, 4)),
    new S7_522_1BH01_0AB0(7, ab.slice(4, 6))
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(76, 78)),
    new S7_526_2BF00_0AB0(2, ab.slice(43, 44)),
    new S7_521_1BL00_0AB0(3, eb.slice(6, 10)),
    new S7_521_1BL00_0AB0(4, eb.slice(10, 14)),
    new S7_522_1BL01_0AB0(5, ab.slice(6, 10))
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[78]),
    new S7_136_6BD00_0CA0(2, ab[44]),
    new S7_131_6BF00_0BA0(3, eb[14]),
    new S7_131_6BF00_0BA0(4, eb[15]),
    new S7_131_6BF00_0BA0(5, eb[16]),
    new S7_132_6BF00_0BA0(6, ab[10]),
    new S7_132_6BF00_0BA0(7, ab[11])
  ]
}

const rack4 = {
  nr: 4,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(79, 81)),
    new S7_526_2BF00_0AB0(2, ab.slice(45, 46)),
    new S7_521_1BL00_0AB0(3, eb.slice(17, 21)),
    new S7_521_1BL00_0AB0(4, eb.slice(21, 25)),
    new S7_522_1BL01_0AB0(5, ab.slice(12, 16))
  ]
}

const rack5 = {
  nr: 5,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[81]),
    new S7_136_6BD00_0CA0(2, ab[46]),
    new S7_131_6BF00_0BA0(3, eb[25]),
    new S7_131_6BF00_0BA0(4, eb[26]),
    new S7_131_6BF00_0BA0(5, eb[27]),
    new S7_132_6BF00_0BA0(6, ab[16]),
    new S7_132_6BF00_0BA0(7, ab[17])
  ]
}

const rack6 = {
  nr: 6,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(82, 84)),
    new S7_526_2BF00_0AB0(2, ab.slice(47, 48)),
    new S7_521_1BL00_0AB0(3, eb.slice(28, 32)),
    new S7_521_1BL00_0AB0(4, eb.slice(32, 36)),
    new S7_522_1BL01_0AB0(5, ab.slice(18, 22))
  ]
}

const rack7 = {
  nr: 7,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[84]),
    new S7_136_6BD00_0CA0(2, ab[48]),
    new S7_131_6BF00_0BA0(3, eb[36]),
    new S7_131_6BF00_0BA0(4, eb[37]),
    new S7_131_6BF00_0BA0(5, eb[38]),
    new S7_132_6BF00_0BA0(6, ab[22]),
    new S7_132_6BF00_0BA0(7, ab[23])
  ]
}

const rack8 = {
  nr: 8,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(85, 87)),
    new S7_526_2BF00_0AB0(2, ab.slice(49, 50)),

    new S7_521_1BL00_0AB0(3, eb.slice(39, 43)),
    new S7_522_1BH01_0AB0(4, ab.slice(24, 26))
  ]
}

const rack9 = {
  nr: 9,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[87]),
    new S7_136_6BD00_0CA0(2, ab[50]),

    new S7_131_6BF00_0BA0(3, eb[43]),
    new S7_131_6BF00_0BA0(4, eb[44]),
    new S7_132_6BF00_0BA0(5, ab[26])
  ]
}

const rack10 = {
  nr: 10,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[88]),
    new S7_136_6BD00_0CA0(2, ab[51]),

    new S7_131_6BF00_0BA0(3, eb[45]),
    new S7_131_6BF00_0BA0(4, eb[46]),
    new S7_131_6BF00_0BA0(5, eb[47]),
    new S7_131_6BF00_0BA0(6, eb[48]),
    new S7_131_6BF00_0BA0(7, eb[49]),
    new S7_132_6BF00_0BA0(8, ab[27]),
    new S7_132_6BF00_0BA0(9, ab[28]),
    new S7_132_6BF00_0BA0(10, ab[29])
  ]
}

const rack11 = {
  nr: 11,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(89, 91)),
    new S7_526_2BF00_0AB0(2, ab.slice(52, 53)),

    new S7_521_1BL00_0AB0(3, eb.slice(50, 54)),
    new S7_522_1BH01_0AB0(4, ab.slice(30, 32))
  ]
}

const rack12 = {
  nr: 12,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[91]),
    new S7_136_6BD00_0CA0(2, ab[53]),

    new S7_131_6BF00_0BA0(3, eb[54]),
    new S7_131_6BF00_0BA0(4, eb[55]),
    new S7_132_6BF00_0BA0(5, ab[32])
  ]
}

const rack13 = {
  nr: 13,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[92]),
    new S7_136_6BD00_0CA0(2, ab[54]),

    new S7_131_6BF00_0BA0(3, eb[56]),
    new S7_131_6BF00_0BA0(4, eb[57]),
    new S7_131_6BF00_0BA0(5, eb[58]),
    new S7_131_6BF00_0BA0(6, eb[59]),
    new S7_131_6BF00_0BA0(7, eb[60]),
    new S7_132_6BF00_0BA0(8, ab[33]),
    new S7_132_6BF00_0BA0(9, ab[34]),
    new S7_132_6BF00_0BA0(10, ab[35])
  ]
}

const rack14 = {
  nr: 14,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(93, 95)),
    new S7_526_2BF00_0AB0(2, ab.slice(55, 56)),

    new S7_521_1BL00_0AB0(3, eb.slice(61, 65)),
    new S7_522_1BH01_0AB0(4, ab.slice(36, 38))
  ]
}

const rack15 = {
  nr: 15,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[95]),
    new S7_136_6BD00_0CA0(2, ab[56]),

    new S7_131_6BF00_0BA0(3, eb[65]),
    new S7_131_6BF00_0BA0(4, eb[66]),
    new S7_132_6BF00_0BA0(5, ab[38])
  ]
}

const rack16 = {
  nr: 16,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[96]),
    new S7_136_6BD00_0CA0(2, ab[57]),

    new S7_131_6BF00_0BA0(3, eb[67]),
    new S7_131_6BF00_0BA0(4, eb[68]),
    new S7_131_6BF00_0BA0(5, eb[69]),
    new S7_131_6BF00_0BA0(6, eb[70]),
    new S7_131_6BF00_0BA0(7, eb[71]),
    new S7_132_6BF00_0BA0(8, ab[39]),
    new S7_132_6BF00_0BA0(9, ab[40]),
    new S7_132_6BF00_0BA0(10, ab[41])
  ]
}

const { Pn } = require('../../../models/Pn')

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('LS1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn02 = new Pn('KKM1', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn03 = new Pn('LS2', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn04 = new Pn('KKM2', 4, merkers.find(b => b.addr === 'M4.3'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn05 = new Pn('LS3', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn06 = new Pn('KKM3', 6, merkers.find(b => b.addr === 'M4.5'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn07 = new Pn('LS4', 7, merkers.find(b => b.addr === 'M4.6'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn08 = new Pn('KKP4', 8, merkers.find(b => b.addr === 'M4.7'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn09 = new Pn('SH4', 9, merkers.find(b => b.addr === 'M5.0'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn10 = new Pn('LS5', 10, merkers.find(b => b.addr === 'M5.1'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn11 = new Pn('KKP5', 11, merkers.find(b => b.addr === 'M5.2'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn12 = new Pn('SH5', 12, merkers.find(b => b.addr === 'M5.3'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn13 = new Pn('LS6', 13, merkers.find(b => b.addr === 'M5.4'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn14 = new Pn('KKP6', 14, merkers.find(b => b.addr === 'M5.5'), 'IM 155-6 PN', { key: 'im', query: {} })
const pn15 = new Pn('SH6', 15, merkers.find(b => b.addr === 'M5.6'), 'IM 155-6 PN', { key: 'im', query: {} })

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
pn13.rack = rack14
pn14.rack = rack15
pn15.rack = rack16

module.exports = [pn00, pn01, pn02, pn03, pn04, pn05, pn06, pn07, pn08, pn09, pn10, pn11, pn12, pn13, pn14, pn15]
