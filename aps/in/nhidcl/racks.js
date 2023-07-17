const { ab, eb } = require('./obj')
const { S7_131_6BH01_0BA0, S7_132_6BH01_0BA0 } = require('../../../models/Modules')

const rack1 = {
  nr: 1,
  serie: 'et200s',
  title: 'LS',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(0, 2)),
    new S7_131_6BH01_0BA0(2, eb.slice(2, 4)),
    new S7_132_6BH01_0BA0(3, ab.slice(0, 2)),
    new S7_132_6BH01_0BA0(4, ab.slice(2, 4))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200s',
  title: 'LS1',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(4, 6)),
    new S7_131_6BH01_0BA0(2, eb.slice(6, 8)),
    new S7_131_6BH01_0BA0(3, eb.slice(8, 10)),
    new S7_131_6BH01_0BA0(4, eb.slice(10, 12)),
    new S7_131_6BH01_0BA0(5, eb.slice(12, 14)),
    new S7_132_6BH01_0BA0(6, ab.slice(4, 6)),
    new S7_132_6BH01_0BA0(7, ab.slice(6, 8)),
    new S7_132_6BH01_0BA0(8, ab.slice(8, 10)),
    new S7_132_6BH01_0BA0(9, ab.slice(10, 12))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200s',
  title: 'KKP1',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(14, 16)),
    new S7_132_6BH01_0BA0(2, ab.slice(12, 14))
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200s',
  title: 'SH1',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(16, 18)),
    new S7_131_6BH01_0BA0(2, eb.slice(18, 20)),
    new S7_131_6BH01_0BA0(3, eb.slice(20, 22)),
    new S7_132_6BH01_0BA0(4, ab.slice(14, 16)),
    new S7_132_6BH01_0BA0(5, ab.slice(16, 18))
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200s',
  title: 'LS2',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(22, 24)),
    new S7_131_6BH01_0BA0(2, eb.slice(24, 26)),
    new S7_131_6BH01_0BA0(3, eb.slice(26, 28)),
    new S7_131_6BH01_0BA0(4, eb.slice(28, 30)),
    new S7_131_6BH01_0BA0(5, eb.slice(30, 32)),
    new S7_132_6BH01_0BA0(6, ab.slice(18, 20)),
    new S7_132_6BH01_0BA0(7, ab.slice(20, 22)),
    new S7_132_6BH01_0BA0(8, ab.slice(22, 24)),
    new S7_132_6BH01_0BA0(9, ab.slice(24, 26))
  ]
}

const rack6 = {
  nr: 6,
  serie: 'et200s',
  title: 'KKP2',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(32, 34)),
    new S7_132_6BH01_0BA0(2, ab.slice(26, 28))
  ]
}

const rack7 = {
  nr: 7,
  serie: 'et200s',
  title: 'SH2',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(34, 36)),
    new S7_131_6BH01_0BA0(2, eb.slice(36, 38)),
    new S7_131_6BH01_0BA0(3, eb.slice(38, 40)),
    new S7_132_6BH01_0BA0(4, ab.slice(28, 30)),
    new S7_132_6BH01_0BA0(5, ab.slice(30, 32))
  ]
}

module.exports = [rack1, rack2, rack3, rack4, rack5, rack6, rack7]
