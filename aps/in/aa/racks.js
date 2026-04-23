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
// KKE1
const rack4 = {
  nr: 4,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(12, 14)),
    new S7_131_6BH01_0BA0(2, eb.slice(14, 16)),
    new S7_131_6BH01_0BA0(3, eb.slice(16, 18)),
    new S7_131_6BH01_0BA0(3, eb.slice(18, 20)),
    new S7_132_6BH01_0BA0(4, ab.slice(10, 12)),
    new S7_132_6BH01_0BA0(5, ab.slice(12, 14))
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
const pn04 = new Pn('KKE1', 2, merkers.find(b => b.addr === 'M4.3'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn04.rack = rack4
PN.push(pn04)

// LS2
const rack5 = {
  nr: 5,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(20, 24)),
    new S7_522_1BL01_0AB0(2, ab.slice(14, 18))
  ]
}
// KKP2
const rack6 = {
  nr: 6,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(24, 26)),
    new S7_132_6BH01_0BA0(2, ab.slice(18, 20))
  ]
}
// SH2
const rack7 = {
  nr: 7,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(26, 28)),
    new S7_131_6BH01_0BA0(2, eb.slice(28, 30)),
    new S7_131_6BH01_0BA0(3, eb.slice(30, 32)),
    new S7_132_6BH01_0BA0(4, ab.slice(20, 22)),
    new S7_132_6BH01_0BA0(5, ab.slice(22, 24))
  ]
}
// KKE2
const rack8 = {
  nr: 8,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(32, 34)),
    new S7_131_6BH01_0BA0(2, eb.slice(34, 36)),
    new S7_131_6BH01_0BA0(3, eb.slice(36, 38)),
    new S7_131_6BH01_0BA0(3, eb.slice(38, 40)),
    new S7_132_6BH01_0BA0(4, ab.slice(24, 26)),
    new S7_132_6BH01_0BA0(5, ab.slice(26, 28))
  ]
}
const pn05 = new Pn('LS2', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn05.rack = rack5
PN.push(pn05)
const pn06 = new Pn('KKP2', 6, merkers.find(b => b.addr === 'M4.5'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn06.rack = rack6
PN.push(pn06)
const pn07 = new Pn('SH2', 7, merkers.find(b => b.addr === 'M4.6'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn07.rack = rack7
PN.push(pn07)
const pn08 = new Pn('KKE2', 8, merkers.find(b => b.addr === 'M4.7'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn08.rack = rack8
PN.push(pn08)

// LS3
const rack9 = {
  nr: 9,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(40, 44)),
    new S7_522_1BL01_0AB0(2, ab.slice(28, 32))
  ]
}
// KKP3
const rack10 = {
  nr: 10,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(44, 46)),
    new S7_132_6BH01_0BA0(2, ab.slice(32, 34))
  ]
}
// SH3
const rack11 = {
  nr: 11,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(46, 48)),
    new S7_131_6BH01_0BA0(2, eb.slice(48, 50)),
    new S7_131_6BH01_0BA0(3, eb.slice(50, 52)),
    new S7_132_6BH01_0BA0(4, ab.slice(34, 36)),
    new S7_132_6BH01_0BA0(5, ab.slice(36, 38))
  ]
}
// KKE3
const rack12 = {
  nr: 12,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(52, 54)),
    new S7_131_6BH01_0BA0(2, eb.slice(54, 56)),
    new S7_131_6BH01_0BA0(3, eb.slice(56, 58)),
    new S7_131_6BH01_0BA0(3, eb.slice(58, 60)),
    new S7_132_6BH01_0BA0(4, ab.slice(38, 40)),
    new S7_132_6BH01_0BA0(5, ab.slice(40, 42))
  ]
}
const pn09 = new Pn('LS3', 9, merkers.find(b => b.addr === 'M5.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn09.rack = rack9
PN.push(pn09)
const pn10 = new Pn('KKP3', 10, merkers.find(b => b.addr === 'M5.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn10.rack = rack10
PN.push(pn10)
const pn11 = new Pn('SH3', 11, merkers.find(b => b.addr === 'M5.2'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn11.rack = rack11
PN.push(pn11)
const pn12 = new Pn('KK3', 12, merkers.find(b => b.addr === 'M5.3'), 'IM 155-6 PN ST', { key: 'im', query: {} })
pn12.rack = rack12
PN.push(pn12)

export default PN
