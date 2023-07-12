const { ab, eb } = require('./obj')
const { S7_131_6BH01_0BA0, S7_132_6BH01_0BA0 } = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200s',
  title: 'LS',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(0, 2)),
    new S7_131_6BH01_0BA0(2, eb.slice(2, 4)),
    new S7_131_6BH01_0BA0(3, eb.slice(4, 6)),
    new S7_131_6BH01_0BA0(4, eb.slice(6, 8)),
    new S7_132_6BH01_0BA0(5, ab.slice(0, 2)),
    new S7_132_6BH01_0BA0(6, ab.slice(2, 4)),
    new S7_132_6BH01_0BA0(7, ab.slice(4, 6))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200s',
  title: 'KKP',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(8, 10)),
    new S7_132_6BH01_0BA0(2, ab.slice(6, 8))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200s',
  title: 'SH',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(10, 12)),
    new S7_131_6BH01_0BA0(2, eb.slice(12, 14)),
    new S7_131_6BH01_0BA0(3, eb.slice(14, 16)),
    new S7_132_6BH01_0BA0(4, ab.slice(8, 10)),
    new S7_132_6BH01_0BA0(5, ab.slice(10, 12))
  ]
}

module.exports = [rack1, rack2, rack3]
