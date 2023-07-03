const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'LS',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(2, eb.slice(4, 8)),
    new S7_522_1BL01_0AB0(3, ab.slice(0, 4)),
    new S7_522_1BH01_0AB0(4, ab.slice(4, 6)),
    new S7_522_1BH01_0AB0(5, eb.slice(8, 10))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200s',
  title: 'KKP',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[10]),
    new S7_131_6BF00_0BA0(2, eb[11]),
    new S7_131_6BF00_0BA0(3, eb[12]),
    new S7_131_6BF00_0BA0(4, eb[13]),
    new S7_132_6BF00_0BA0(5, ab[6]),
    new S7_132_6BF00_0BA0(6, ab[7])
  ]
}

module.exports = [rack1, rack2]
