import { ab, eb, merkers } from './io.js'
import {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_521_1BH00_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const rack1 = {
  nr: 1,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4)),
    new S7_521_1BL00_0AB0(3, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(4, eb.slice(8, 12)),
    new S7_521_1BL00_0AB0(5, eb.slice(12, 16)),
    new S7_521_1BL00_0AB0(6, eb.slice(16, 20)),
    new S7_522_1BL01_0AB0(7, ab.slice(4, 8)),
    new S7_522_1BL01_0AB0(8, ab.slice(8, 12))
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(20, 24)),
    new S7_521_1BH00_0AB0(2, eb.slice(24, 26)),
    new S7_522_1BL01_0AB0(3, ab.slice(12, 16))
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(26, 30)),
    new S7_521_1BH00_0AB0(2, eb.slice(30, 32)),
    new S7_522_1BL01_0AB0(3, ab.slice(16, 20))
  ]
}

const rack4 = {
  nr: 4,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[32]),
    new S7_131_6BF00_0BA0(2, eb[33]),
    new S7_131_6BF00_0BA0(3, eb[34]),
    new S7_132_6BF00_0BA0(4, ab[20]),
    new S7_132_6BF00_0BA0(5, ab[21])
  ]
}

const pn00 = new Pn('LS', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('T1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn02 = new Pn('T2', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn03 = new Pn('EXT', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-6 PN', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3
pn03.rack = rack4

export default [pn00, pn01, pn02, pn03]
