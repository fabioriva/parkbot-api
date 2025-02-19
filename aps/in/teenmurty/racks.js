import { ab, eb, merkers } from './io.js'
import {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0,
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const rack1 = {
  nr: 1,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(2, eb.slice(4, 8)),
    new S7_522_1BL01_0AB0(3, ab.slice(0, 4)),
    new S7_522_1BH01_0AB0(4, ab.slice(4, 6))
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(8, 10)),
    new S7_131_6BH01_0BA0(2, eb.slice(10, 12)),
    new S7_131_6BH01_0BA0(3, eb.slice(12, 14)),
    new S7_132_6BH01_0BA0(4, ab.slice(6, 8)),
    new S7_132_6BH01_0BA0(5, ab.slice(8, 10))
  ]
}

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('KKP', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2

export default [pn00, pn01]
