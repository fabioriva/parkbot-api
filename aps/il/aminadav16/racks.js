const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BL01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'LS',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(2, eb.slice(4, 8)),
    new S7_521_1BH00_0AB0(3, eb.slice(8, 10)),
    new S7_522_1BL01_0AB0(4, ab.slice(0, 4)),
    new S7_522_1BL01_0AB0(5, ab.slice(4, 8))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200s',
  title: 'KKU',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[10]),
    new S7_131_6BF00_0BA0(2, eb[11]),
    new S7_131_6BF00_0BA0(3, eb[12]),
    new S7_131_6BF00_0BA0(4, eb[13]),
    new S7_131_6BF00_0BA0(5, eb[14]),
    new S7_131_6BF00_0BA0(6, eb[15]),
    new S7_131_6BF00_0BA0(7, eb[16]),
    new S7_132_6BF00_0BA0(8, ab[8]),
    new S7_132_6BF00_0BA0(9, ab[9]),
    new S7_132_6BF00_0BA0(10, ab[10]),
    new S7_132_6BF00_0BA0(11, ab[11])
  ]
}

module.exports = [rack1, rack2]
