import { generateBits } from '../../../models/Bit.js'
import { ab, eb, inputs } from './io.js'
import {
  S7_521_1BH00_0AB0,
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0,
  S7_523_1BL00_0AA0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const str = [
  { addr: 'E19.0', label: '' },
  { addr: 'E19.1', label: '' },
  { addr: 'E19.2', label: '' },
  { addr: 'E19.3', label: '' },
  { addr: 'E19.4', label: '' },
  { addr: 'E19.5', label: '' },
  { addr: 'E19.6', label: '' },
  { addr: 'E19.7', label: '' }
]
const dummy = generateBits('E', 3, 3, str)

const PN = []

// Racks EL
const EL = []
let offsetEB = 0
let offsetAB = 0

for (let i = 1; i <= 5; i++) {
  // console.log(2 + offsetEB, eb[2 + offsetEB])
  const rack = {
    nr: i,
    cards: [
      new S7_521_1BH00_0AB0(1, [eb[2 + offsetEB], dummy]),
      new S7_523_1BL00_0AA0(2, eb.slice(0 + offsetEB, 2 + offsetEB).concat(ab.slice(0 + offsetAB, 2 + offsetAB))), // 16 DI + 16 DO
      new S7_521_1BL00_0AB0(3, eb.slice(4 + offsetEB, 8 + offsetEB)),
      new S7_521_1BL00_0AB0(4, eb.slice(8 + offsetEB, 12 + offsetEB)),
      new S7_522_1BL01_0AB0(5, ab.slice(4 + offsetAB, 8 + offsetAB)),
      new S7_522_1BH01_0AB0(6, ab.slice(8 + offsetAB, 10 + offsetAB))
    ]
  }
  EL.push(rack)
  // const pn = new Pn('EL' + i, i, merkers.find(b => b.addr === 'M4.0'), 'IM 155-5 PN', { key: 'im', query: {} })
  const pn = new Pn('EL' + i, i, inputs.find(b => b.addr === 'E' + (offsetEB + 6).toString() + '.3'), 'IM 155-5 PN', { key: 'im', query: {} })
  pn.rack = rack
  PN.push(pn)
  offsetEB += 12
  offsetAB += 10
}

// Racks SH
const SH = []
offsetEB = 0
offsetAB = 0

for (let i = 1; i <= 14; i++) {
  // console.log(55 + offsetEB, eb[55 + offsetEB])
  const rack = {
    nr: i + 5,
    cards: [
      new S7_521_1BH00_0AB0(1, [eb[62 + offsetEB], dummy]),
      new S7_523_1BL00_0AA0(2, eb.slice(60 + offsetEB, 62 + offsetEB).concat(ab.slice(50 + offsetAB, 52 + offsetAB))), // 16 DI + 16 DO
      new S7_523_1BL00_0AA0(3, eb.slice(64 + offsetEB, 66 + offsetEB).concat(ab.slice(54 + offsetAB, 56 + offsetAB))) // 16 DI + 16 DO
    ]
  }
  SH.push(rack)
  // const pn = new Pn('SH' + i, i + 3, merkers.find(b => b.addr === 'M5.0'), 'IM 155-5 PN', { key: 'im', query: {} })
  const pn = new Pn('SH' + i, i + 5, inputs.find(b => b.addr === 'E' + (offsetEB + 61).toString() + '.3'), 'IM 155-5 PN', { key: 'im', query: {} })
  pn.rack = rack
  PN.push(pn)
  offsetEB += 6
  offsetAB += 6
}

export default PN
