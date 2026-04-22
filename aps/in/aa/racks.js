import { ab, eb, merkers } from './io.js'
import {
  S7_521_1BL00_0AB0,
  // S7_521_1BH00_0AB0,
  S7_522_1BL01_0AB0,
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const PN = []

// LS1
const rack1 = {
  nr: 1,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4))
  ]
}
// KKP1
const rack2 = {
  nr: 2,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(4, 6)),
    new S7_132_6BH01_0BA0(2, ab.slice(4, 6))
  ]
}
// SH1
const rack3 = {
  nr: 3,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(6, 8)),
    new S7_131_6BH01_0BA0(2, eb.slice(8, 10)),
    new S7_131_6BH01_0BA0(3, eb.slice(10, 12)),
    new S7_132_6BH01_0BA0(4, ab.slice(6, 8)),
    new S7_132_6BH01_0BA0(5, ab.slice(8, 10))
  ]
}
const pn01 = new Pn('LS1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn01.rack = rack1
PN.push(pn01)
const pn02 = new Pn('KKP1', 1, merkers.find(b => b.addr === 'M4.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn02.rack = rack2
PN.push(pn02)
const pn03 = new Pn('SH1', 2, merkers.find(b => b.addr === 'M4.2'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn03.rack = rack3
PN.push(pn03)

export default PN
