const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_521_1BH00_0AB0,
  // S7_522_1BH01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'LS',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4)),
    new S7_521_1BL00_0AB0(3, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(4, eb.slice(8, 12)),
    new S7_521_1BL00_0AB0(5, eb.slice(12, 16)),
    new S7_521_1BL00_0AB0(6, eb.slice(16, 20)),
    new S7_522_1BL01_0AB0(7, ab.slice(4, 8)),
    new S7_522_1BL01_0AB0(8, ab.slice(8, 12))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'T1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(20, 24)),
    new S7_521_1BH00_0AB0(2, eb.slice(24, 26)),
    new S7_522_1BL01_0AB0(3, ab.slice(12, 16))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200m',
  title: 'T2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(26, 30)),
    new S7_521_1BH00_0AB0(2, eb.slice(30, 32)),
    new S7_522_1BL01_0AB0(3, ab.slice(16, 20))
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200s',
  title: 'EXT',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[32]),
    new S7_131_6BF00_0BA0(2, eb[33]),
    new S7_131_6BF00_0BA0(3, eb[34]),
    new S7_132_6BF00_0BA0(4, ab[20]),
    new S7_132_6BF00_0BA0(5, ab[21])
  ]
}

module.exports = [rack1, rack2, rack3, rack4]
