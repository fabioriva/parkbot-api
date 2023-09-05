const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'LST',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200s',
  title: 'KKU',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[4]),
    new S7_131_6BF00_0BA0(2, eb[5]),
    new S7_131_6BF00_0BA0(3, eb[6]),
    new S7_131_6BF00_0BA0(4, eb[7]),
    new S7_131_6BF00_0BA0(5, eb[8]),
    new S7_132_6BF00_0BA0(6, ab[4]),
    new S7_132_6BF00_0BA0(7, ab[5]),
    new S7_132_6BF00_0BA0(8, ab[6])
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200m',
  title: 'LS1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(9, 13)),
    new S7_521_1BL00_0AB0(2, eb.slice(13, 17)),
    new S7_521_1BH00_0AB0(3, eb.slice(17, 19)),
    new S7_522_1BL01_0AB0(4, ab.slice(7, 11)),
    new S7_522_1BH01_0AB0(5, ab.slice(11, 15))
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200m',
  title: 'LS2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(19, 23)),
    new S7_521_1BL00_0AB0(2, eb.slice(23, 27)),
    new S7_521_1BH00_0AB0(3, eb.slice(27, 29)),
    new S7_522_1BL01_0AB0(4, ab.slice(15, 19)),
    new S7_522_1BH01_0AB0(5, ab.slice(19, 23))
  ]
}

module.exports = [rack1, rack2, rack3, rack4]
