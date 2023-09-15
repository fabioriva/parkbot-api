const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'LS1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(2, eb.slice(4, 8)),
    new S7_522_1BL01_0AB0(3, ab.slice(0, 4)),
    new S7_522_1BH01_0AB0(4, ab.slice(4, 6))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200s',
  title: 'KKU1',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[8]),
    new S7_131_6BF00_0BA0(2, eb[9]),
    new S7_131_6BF00_0BA0(3, eb[10]),
    new S7_131_6BF00_0BA0(4, eb[11]),
    new S7_131_6BF00_0BA0(5, eb[12]),
    new S7_131_6BF00_0BA0(6, eb[13]),
    new S7_131_6BF00_0BA0(7, eb[14]),
    new S7_132_6BF00_0BA0(8, ab[6]),
    new S7_132_6BF00_0BA0(9, ab[7]),
    new S7_132_6BF00_0BA0(10, ab[8]),
    new S7_132_6BF00_0BA0(11, ab[9])
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200m',
  title: 'LS2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(15, 19)),
    new S7_521_1BL00_0AB0(2, eb.slice(19, 23)),
    new S7_522_1BL01_0AB0(3, ab.slice(10, 14)),
    new S7_522_1BH01_0AB0(4, ab.slice(14, 16))
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200s',
  title: 'KKU2',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[23]),
    new S7_131_6BF00_0BA0(2, eb[24]),
    new S7_131_6BF00_0BA0(3, eb[25]),
    new S7_131_6BF00_0BA0(4, eb[26]),
    new S7_131_6BF00_0BA0(5, eb[27]),
    new S7_131_6BF00_0BA0(6, eb[28]),
    new S7_131_6BF00_0BA0(7, eb[29]),
    new S7_132_6BF00_0BA0(8, ab[16]),
    new S7_132_6BF00_0BA0(9, ab[17]),
    new S7_132_6BF00_0BA0(10, ab[18]),
    new S7_132_6BF00_0BA0(11, ab[19])
  ]
}

module.exports = [rack1, rack2, rack3, rack4]
