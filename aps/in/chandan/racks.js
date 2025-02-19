import { ab, eb, merkers } from './io.js'
import {
  S7_523_1BL00_0AA0,
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const rack1 = {
  nr: 1,
  cards: [new S7_523_1BL00_0AA0(1, eb.slice(0, 2))]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(2, 4)),
    new S7_132_6BH01_0BA0(2, ab.slice(2, 4))
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(4, 6)),
    new S7_131_6BH01_0BA0(2, eb.slice(6, 8)),
    new S7_131_6BH01_0BA0(3, eb.slice(8, 10)),
    new S7_132_6BH01_0BA0(4, ab.slice(4, 6)),
    new S7_132_6BH01_0BA0(5, ab.slice(6, 8)),
    new S7_132_6BH01_0BA0(6, ab.slice(8, 10))
  ]
}

const rack4 = {
  nr: 4,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(10, 12)),
    new S7_132_6BH01_0BA0(2, ab.slice(10, 12))
  ]
}

const rack5 = {
  nr: 5,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(12, 14)),
    new S7_131_6BH01_0BA0(2, eb.slice(14, 16)),
    new S7_131_6BH01_0BA0(3, eb.slice(16, 18)),
    new S7_132_6BH01_0BA0(4, ab.slice(12, 14)),
    new S7_132_6BH01_0BA0(5, ab.slice(14, 16))
  ]
}

const rack6 = {
  nr: 6,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(18, 20)),
    new S7_131_6BH01_0BA0(2, eb.slice(20, 22)),
    new S7_131_6BH01_0BA0(3, eb.slice(22, 24)),
    new S7_132_6BH01_0BA0(4, ab.slice(16, 18)),
    new S7_132_6BH01_0BA0(5, ab.slice(18, 20))
  ]
}

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('LS1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn02 = new Pn('KK1', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn03 = new Pn('LS2', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn04 = new Pn('KK2', 4, merkers.find(b => b.addr === 'M4.3'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn05 = new Pn('LSA', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-6 PN ST', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3
pn03.rack = rack4
pn04.rack = rack5
pn05.rack = rack6

export default [pn00, pn01, pn02, pn03, pn04, pn05]
