const { ab, eb, merkers } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0
} = require('../../../models/Modules')
const { Pn } = require('../../../models/Pn')

const PN = []

const rack1 = {
  nr: 1,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4))
  ]
}
const pn1 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
pn1.rack = rack1
PN.push(pn1)

// VTs
const EL = []
let offsetEB = 0
let offsetAB = 0

for (let i = 1; i <= 4; i++) {
  const rack = {
    nr: i + 1,
    cards: [
      new S7_521_1BL00_0AB0(1, eb.slice(4 + offsetEB, 8 + offsetEB)),
      new S7_521_1BL00_0AB0(2, eb.slice(8 + offsetEB, 12 + offsetEB)),
      new S7_521_1BL00_0AB0(3, eb.slice(12 + offsetEB, 16 + offsetEB)),
      new S7_521_1BH00_0AB0(4, eb.slice(16 + offsetEB, 18 + offsetEB)),
      new S7_522_1BL01_0AB0(5, ab.slice(4 + offsetAB, 8 + offsetAB)),
      new S7_522_1BH01_0AB0(6, ab.slice(8 + offsetAB, 10 + offsetAB)),
      new S7_522_1BH01_0AB0(7, ab.slice(10 + offsetAB, 12 + offsetAB))
    ]
  }
  EL.push(rack)
  const pn = new Pn('VT' + i, i, merkers.find(b => b.addr === 'M4.' + (i - 1)), 'IM 155-5 PN', { key: 'im', query: {} })
  pn.rack = rack
  PN.push(pn)
  offsetEB += 14
  offsetAB += 8
}

// SH
const SH = []
offsetEB = 0
offsetAB = 0
for (let i = 1; i <= 7; i++) {
  const rack = {
    nr: i + 5,
    cards: [
      new S7_521_1BL00_0AB0(1, eb.slice(60 + offsetEB, 64 + offsetEB)),
      new S7_521_1BH00_0AB0(2, eb.slice(64 + offsetEB, 66 + offsetEB)),
      new S7_522_1BL01_0AB0(3, ab.slice(36 + offsetAB, 40 + offsetAB))
    ]
  }
  SH.push(rack)
  const pn = new Pn('SH' + i, i + 4, merkers.find(b => b.addr === 'M5.' + (i - 1)), 'IM 155-5 PN', { key: 'im', query: {} })
  pn.rack = rack
  PN.push(pn)
  offsetEB += 6
  offsetAB += 4
}

module.exports = PN
