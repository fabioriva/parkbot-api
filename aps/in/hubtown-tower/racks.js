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
    new S7_521_1BL00_0AB0(1, eb.slice(0, 2)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 2))
  ]
}
const pn1 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
pn1.rack = rack1
PN.push(pn1)

const rack2 = {
  nr: 2,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(2, 6)),
    new S7_521_1BL00_0AB0(2, eb.slice(6, 10)),
    new S7_522_1BL01_0AB0(3, ab.slice(2, 6))
  ]
}
const pn2 = new Pn(
  'LS1',
  1,
  merkers.find((b) => b.addr === 'M4.0'),
  'IM 155-6 PN ST',
  { key: 'im', query: {} }
)
pn2.rack = rack2
PN.push(pn2)

const rack3 = {
  nr: 3,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(10, 12)),
    new S7_132_6BH01_0BA0(2, ab.slice(6, 8))
  ]
}
const pn3 = new Pn(
  'KKP1',
  1,
  merkers.find((b) => b.addr === 'M4.1'),
  'IM 155-6 PN ST',
  { key: 'im', query: {} }
)
pn3.rack = rack3
PN.push(pn3)

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
const pn4 = new Pn(
  'SH1',
  1,
  merkers.find((b) => b.addr === 'M4.2'),
  'IM 155-6 PN ST',
  { key: 'im', query: {} }
)
pn4.rack = rack4
PN.push(pn4)

const rack5 = {
  nr: 5,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(18, 22)),
    new S7_521_1BL00_0AB0(2, eb.slice(22, 26)),
    new S7_522_1BL01_0AB0(3, ab.slice(12, 16))
  ]
}
const pn5 = new Pn(
  'LS2',
  1,
  merkers.find((b) => b.addr === 'M4.3'),
  'IM 155-6 PN ST',
  { key: 'im', query: {} }
)
pn5.rack = rack5
PN.push(pn5)

const rack6 = {
  nr: 6,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(26, 28)),
    new S7_132_6BH01_0BA0(2, ab.slice(16, 18))
  ]
}
const pn6 = new Pn(
  'KKP2',
  1,
  merkers.find((b) => b.addr === 'M4.4'),
  'IM 155-6 PN ST',
  { key: 'im', query: {} }
)
pn6.rack = rack6
PN.push(pn6)

const rack7 = {
  nr: 7,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(28, 30)),
    new S7_131_6BH01_0BA0(2, eb.slice(30, 32)),
    new S7_131_6BH01_0BA0(3, eb.slice(32, 34)),
    new S7_132_6BH01_0BA0(4, ab.slice(18, 20)),
    new S7_132_6BH01_0BA0(5, ab.slice(20, 22))
  ]
}
const pn7 = new Pn(
  'SH2',
  1,
  merkers.find((b) => b.addr === 'M4.5'),
  'IM 155-6 PN ST',
  { key: 'im', query: {} }
)
pn7.rack = rack7
PN.push(pn7)

export default PN
