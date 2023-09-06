const { ab, eb } = require('./obj')
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
  serie: 'et200m',
  title: 'Main',
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
  serie: 'et200m',
  title: 'LS1',
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
  serie: 'et200s',
  title: 'KKM1',
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
  serie: 'et200m',
  title: 'LS2',
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
  serie: 'et200s',
  title: 'KKM2',
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
  serie: 'et200m',
  title: 'LS3',
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
  serie: 'et200s',
  title: 'KKM3',
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
  serie: 'et200m',
  title: 'LS4',
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(85, 87)),
    new S7_526_2BF00_0AB0(2, ab.slice(49, 50)),

    new S7_521_1BL00_0AB0(3, eb.slice(39, 43)),
    new S7_522_1BH01_0AB0(4, ab.slice(24, 26))
  ]
}

const rack9 = {
  nr: 9,
  serie: 'et200s',
  title: 'KKP4',
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
  serie: 'et200s',
  title: 'SH4',
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
  serie: 'et200m',
  title: 'LS5',
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(89, 91)),
    new S7_526_2BF00_0AB0(2, ab.slice(52, 53)),

    new S7_521_1BL00_0AB0(3, eb.slice(50, 54)),
    new S7_522_1BH01_0AB0(4, ab.slice(30, 32))
  ]
}

const rack12 = {
  nr: 12,
  serie: 'et200s',
  title: 'KKP5',
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
  serie: 'et200s',
  title: 'SH5',
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
  serie: 'et200m',
  title: 'LS6',
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(93, 95)),
    new S7_526_2BF00_0AB0(2, ab.slice(55, 56)),

    new S7_521_1BL00_0AB0(3, eb.slice(61, 65)),
    new S7_522_1BH01_0AB0(4, ab.slice(36, 38))
  ]
}

const rack15 = {
  nr: 15,
  serie: 'et200s',
  title: 'KKP6',
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
  serie: 'et200s',
  title: 'SH6',
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

module.exports = [
  rack1,
  rack2,
  rack3,
  rack4,
  rack5,
  rack6,
  rack7,
  rack8,
  rack9,
  rack10,
  rack11,
  rack12,
  rack13,
  rack14,
  rack15,
  rack16
]
