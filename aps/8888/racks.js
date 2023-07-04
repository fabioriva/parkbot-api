const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BH01_0AB0,
  S7_522_1BL01_0AB0
} = require('../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'Main',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'LS1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(2, eb.slice(8, 12)),
    new S7_521_1BH00_0AB0(3, eb.slice(12, 14)),
    new S7_522_1BL01_0AB0(4, ab.slice(4, 8)),
    new S7_522_1BH01_0AB0(5, ab.slice(8, 10))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200m',
  title: 'LS2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(14, 18)),
    new S7_521_1BL00_0AB0(2, eb.slice(18, 22)),
    new S7_521_1BH00_0AB0(3, eb.slice(22, 24)),
    new S7_522_1BL01_0AB0(4, ab.slice(10, 14)),
    new S7_522_1BH01_0AB0(5, ab.slice(14, 16))
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200m',
  title: 'LS3',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(24, 28)),
    new S7_521_1BL00_0AB0(2, eb.slice(28, 32)),
    new S7_521_1BH00_0AB0(3, eb.slice(32, 34)),
    new S7_522_1BL01_0AB0(4, ab.slice(16, 20)),
    new S7_522_1BH01_0AB0(5, ab.slice(20, 22))
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200m',
  title: 'T1',
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(34, 36)),
    new S7_522_1BH01_0AB0(2, ab.slice(22, 24))
  ]
}

const rack6 = {
  nr: 6,
  serie: 'et200m',
  title: 'KKP1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(36, 40)),
    new S7_522_1BL01_0AB0(2, ab.slice(24, 28))
  ]
}

const rack7 = {
  nr: 7,
  serie: 'et200m',
  title: 'T2',
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(40, 42)),
    new S7_522_1BH01_0AB0(2, ab.slice(28, 30))
  ]
}

const rack8 = {
  nr: 8,
  serie: 'et200m',
  title: 'KKP2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(42, 46)),
    new S7_522_1BL01_0AB0(2, ab.slice(30, 34))
  ]
}

const rack9 = {
  nr: 9,
  serie: 'et200m',
  title: 'T3',
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(46, 48)),
    new S7_522_1BH01_0AB0(2, ab.slice(34, 36))
  ]
}

const rack10 = {
  nr: 10,
  serie: 'et200m',
  title: 'KKP3',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(48, 52)),
    new S7_522_1BL01_0AB0(2, ab.slice(36, 40))
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
  rack10
]
