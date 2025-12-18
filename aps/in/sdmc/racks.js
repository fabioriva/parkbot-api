import { ab, eb, merkers } from './io.js'
import {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

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

// ELs
const EL = []
let offsetEB = 0
let offsetAB = 0

for (let i = 1; i <= 5; i++) {
  const rack = {
    nr: i + 1,
    cards: [
      new S7_521_1BL00_0AB0(1, eb.slice(4 + offsetEB, 8 + offsetEB)),
      new S7_521_1BL00_0AB0(2, eb.slice(8 + offsetEB, 12 + offsetEB)),
      new S7_522_1BL01_0AB0(3, ab.slice(4 + offsetAB, 8 + offsetAB))
    ]
  }
  EL.push(rack)
  const pn = new Pn('EL' + i, i, merkers.find(b => b.addr === 'M4.' + (i - 1)), 'IM 155-5 PN', { key: 'im', query: {} })
  pn.rack = rack
  PN.push(pn)
  offsetEB += 8
  offsetAB += 4
}

// SH
const SH = []
offsetEB = 0
offsetAB = 0
for (let i = 1; i <= 7; i++) {
  const rack = {
    nr: i + 5,
    cards: [
      new S7_131_6BH01_0BA0(1, eb.slice(44 + offsetEB, 46 + offsetEB)),
      new S7_131_6BH01_0BA0(2, eb.slice(46 + offsetEB, 48 + offsetEB)),
      new S7_131_6BH01_0BA0(3, eb.slice(48 + offsetEB, 50 + offsetEB)),
      new S7_132_6BH01_0BA0(4, ab.slice(24 + offsetAB, 26 + offsetAB)),
      new S7_132_6BH01_0BA0(5, ab.slice(26 + offsetAB, 28 + offsetAB))
    ]
  }
  SH.push(rack)
  const pn = new Pn('SH' + i, i + 5, merkers.find(b => b.addr === 'M5.' + (i - 1)), 'IM 155-5 PN', { key: 'im', query: {} })
  pn.rack = rack
  PN.push(pn)
  offsetEB += 6
  offsetAB += 4
}

export default PN
