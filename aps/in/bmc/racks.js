import { ab, eb, merkers } from './io.js'
import {
  S7_523_1BL00_0AA0,
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const rack1 = {
  nr: 1,
  cards: [new S7_523_1BL00_0AA0(1, eb.slice(0, 2))] // [eb.slice(0, 2), ab.slice(0, 2)])]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(2, 4)),
    new S7_131_6BH01_0BA0(2, eb.slice(4, 6)),
    new S7_131_6BH01_0BA0(3, eb.slice(6, 8)),
    new S7_131_6BH01_0BA0(4, eb.slice(8, 10)),
    new S7_132_6BH01_0BA0(5, ab.slice(2, 4)),
    new S7_132_6BH01_0BA0(6, ab.slice(4, 6)),
    new S7_132_6BH01_0BA0(7, ab.slice(6, 8))
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(10, 12)),
    new S7_132_6BH01_0BA0(2, ab.slice(8, 10))
  ]
}

const rack4 = {
  nr: 4,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(12, 14)),
    new S7_132_6BH01_0BA0(2, ab.slice(10, 12))
  ]
}

const rack5 = {
  nr: 5,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(14, 16)),
    new S7_131_6BH01_0BA0(2, eb.slice(16, 18)),
    new S7_132_6BH01_0BA0(3, ab.slice(12, 14)),
    new S7_132_6BH01_0BA0(4, ab.slice(14, 16))
  ]
}

const rack6 = {
  nr: 6,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(18, 20)),
    new S7_131_6BH01_0BA0(2, eb.slice(20, 22)),
    new S7_131_6BH01_0BA0(3, eb.slice(22, 24)),
    new S7_131_6BH01_0BA0(4, eb.slice(24, 26)),
    new S7_132_6BH01_0BA0(5, ab.slice(16, 18)),
    new S7_132_6BH01_0BA0(6, ab.slice(18, 20)),
    new S7_132_6BH01_0BA0(7, ab.slice(20, 22))
  ]
}

const rack7 = {
  nr: 7,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(26, 28)),
    new S7_132_6BH01_0BA0(2, ab.slice(22, 24))
  ]
}

const rack8 = {
  nr: 8,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(28, 30)),
    new S7_132_6BH01_0BA0(2, ab.slice(24, 26))
  ]
}

const rack9 = {
  nr: 9,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(30, 32)),
    new S7_131_6BH01_0BA0(2, eb.slice(32, 34)),
    new S7_132_6BH01_0BA0(3, ab.slice(26, 28)),
    new S7_132_6BH01_0BA0(4, ab.slice(28, 30))
  ]
}

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('KKE1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn02 = new Pn('LS1', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn03 = new Pn('KKP1', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn04 = new Pn('SH1', 4, merkers.find(b => b.addr === 'M4.3'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn05 = new Pn('KKE2', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn06 = new Pn('LS2', 6, merkers.find(b => b.addr === 'M4.5'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn07 = new Pn('KKP2', 7, merkers.find(b => b.addr === 'M4.6'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn08 = new Pn('SH2', 8, merkers.find(b => b.addr === 'M4.7'), 'IM 155-6 PN ST', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3
pn03.rack = rack4
pn04.rack = rack5
pn05.rack = rack6
pn06.rack = rack7
pn07.rack = rack8
pn08.rack = rack9

export default [pn00, pn01, pn02, pn03, pn04, pn05, pn06, pn07, pn08]
