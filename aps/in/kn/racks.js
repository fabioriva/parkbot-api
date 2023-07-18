const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  // S7_521_1BH00_0AB0,
  S7_522_1BH01_0AB0,
  S7_523_1BL00_0AA0
} = require('../../../models/Modules')

// Racks EL
const EL = []
let offsetEB = 0
let offsetAB = 0

for (let i = 1; i <= 3; i++) {
  EL.push({
    nr: i,
    serie: 'et200m',
    title: 'EL' + i,
    cards: [
      new S7_521_1BL00_0AB0(1, eb.slice(0 + offsetEB, 4 + offsetEB)),
      new S7_521_1BL00_0AB0(2, eb.slice(4 + offsetEB, 8 + offsetEB)),
      new S7_521_1BL00_0AB0(3, eb.slice(8 + offsetEB, 12 + offsetEB)),
      new S7_522_1BL01_0AB0(4, ab.slice(0 + offsetAB, 4 + offsetAB)),
      new S7_522_1BH01_0AB0(5, ab.slice(4 + offsetAB, 6 + offsetAB))
    ]
  })
  offsetEB += 12
  offsetAB += 6
}

// Racks SH
const SH = []
offsetEB = 0
offsetAB = 0

for (let i = 1; i <= 12; i++) {
  SH.push({
    nr: i + 3,
    serie: 'et200m',
    title: 'SH' + i,
    cards: [
      new S7_521_1BL00_0AB0(1, eb.slice(36 + offsetEB, 40 + offsetEB)),
      new S7_523_1BL00_0AA0(2, [eb[40 + offsetEB], ab[18 + offsetAB]]),
      new S7_522_1BH01_0AB0(3, ab.slice(19 + offsetAB, 21 + offsetAB))
    ]
  })
  offsetEB += 5
  offsetAB += 3
}

module.exports = [...EL, ...SH]
