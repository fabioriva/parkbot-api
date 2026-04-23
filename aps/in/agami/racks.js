import { ab, eb, merkers } from './io.js'
import {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0,
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const PN = []

// PLC
const rack1 = {
  nr: 1,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(1, eb.slice(4, 8)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4))
  ]
}
// LS1
const rack2 = {
  nr: 2,
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(8, 10)),
    new S7_522_1BH01_0AB0(2, ab.slice(4, 6))
  ]
}
// KKP1
const rack3 = {
  nr: 3,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(10, 12)),
    new S7_132_6BH01_0BA0(2, ab.slice(6, 8))
  ]
}
// SH1
const rack4 = {
  nr: 4,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(12, 14)),
    new S7_131_6BH01_0BA0(2, eb.slice(14, 16)),
    new S7_131_6BH01_0BA0(3, eb.slice(16, 18)),
    new S7_132_6BH01_0BA0(4, ab.slice(8, 10)),
    new S7_132_6BH01_0BA0(5, ab.slice(10, 12))
  ]
}

const pn01 = new Pn('PLC', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn01.rack = rack1
PN.push(pn01)
const pn02 = new Pn('LS1', 1, merkers.find(b => b.addr === 'M4.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn02.rack = rack2
PN.push(pn02)
const pn03 = new Pn('KKP1', 2, merkers.find(b => b.addr === 'M4.2'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn03.rack = rack3
PN.push(pn03)
const pn04 = new Pn('SH1', 2, merkers.find(b => b.addr === 'M4.3'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn04.rack = rack4
PN.push(pn04)

export default PN