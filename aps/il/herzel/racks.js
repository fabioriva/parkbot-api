const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BL01_0AB0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'MAIN',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'LSA',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(2, eb.slice(8, 12)),
    new S7_521_1BH00_0AB0(3, eb.slice(12, 14)),
    new S7_522_1BL01_0AB0(4, ab.slice(4, 8)),
    new S7_522_1BL01_0AB0(5, ab.slice(8, 12))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200m',
  title: 'LSB',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(14, 18)),
    new S7_521_1BL00_0AB0(2, eb.slice(18, 22)),
    new S7_521_1BH00_0AB0(3, eb.slice(22, 24)),
    new S7_522_1BL01_0AB0(4, ab.slice(12, 16)),
    new S7_522_1BL01_0AB0(5, ab.slice(16, 20))
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200m',
  title: 'SH1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(24, 28)),
    new S7_521_1BH00_0AB0(2, eb.slice(28, 30)),
    new S7_522_1BL01_0AB0(3, ab.slice(20, 24))
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200m',
  title: 'SH2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(30, 34)),
    new S7_521_1BH00_0AB0(2, eb.slice(34, 36)),
    new S7_522_1BL01_0AB0(3, ab.slice(24, 28))
  ]
}

const rack6 = {
  nr: 6,
  serie: 'et200m',
  title: 'SH3',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(36, 40)),
    new S7_521_1BH00_0AB0(2, eb.slice(40, 42)),
    new S7_522_1BL01_0AB0(3, ab.slice(28, 32))
  ]
}

module.exports = [rack1, rack2, rack3, rack4, rack5, rack6]
