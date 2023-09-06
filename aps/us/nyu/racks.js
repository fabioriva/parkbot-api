const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_522_1BH01_0AB0,
  S7_522_1BL01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'CPU',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BH01_0AB0(2, ab.slice(0, 2))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'LS1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(2, eb.slice(8, 12)),
    new S7_522_1BL01_0AB0(3, ab.slice(2, 6)),
    new S7_522_1BH01_0AB0(4, ab.slice(6, 8))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200s',
  title: 'KKP1',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[12]),
    new S7_131_6BF00_0BA0(2, eb[13]),
    new S7_131_6BF00_0BA0(3, eb[14]),
    new S7_131_6BF00_0BA0(4, eb[15]),
    new S7_131_6BF00_0BA0(5, eb[16]),
    new S7_132_6BF00_0BA0(6, ab[8]),
    new S7_132_6BF00_0BA0(7, ab[9]),
    new S7_132_6BF00_0BA0(8, ab[10])
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200m',
  title: 'LS2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(17, 21)),
    new S7_521_1BL00_0AB0(2, eb.slice(21, 25)),
    new S7_522_1BL01_0AB0(3, ab.slice(11, 15)),
    new S7_522_1BH01_0AB0(4, ab.slice(15, 17))
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200s',
  title: 'KKP2',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[25]),
    new S7_131_6BF00_0BA0(2, eb[26]),
    new S7_131_6BF00_0BA0(3, eb[27]),
    new S7_131_6BF00_0BA0(4, eb[28]),
    new S7_131_6BF00_0BA0(5, eb[29]),
    new S7_132_6BF00_0BA0(6, ab[17]),
    new S7_132_6BF00_0BA0(7, ab[18]),
    new S7_132_6BF00_0BA0(8, ab[19])
  ]
}

module.exports = [rack1, rack2, rack3, rack4, rack5]
