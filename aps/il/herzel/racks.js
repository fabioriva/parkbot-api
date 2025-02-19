import { ab, eb, merkers } from './io.js'
import {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BL01_0AB0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const rack1 = {
  nr: 1,
  // serie: 'et200m',
  // title: 'MAIN',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4))
  ]
}

const rack2 = {
  nr: 2,
  // serie: 'et200m',
  // title: 'LSA',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(2, eb.slice(8, 12)),
    new S7_521_1BH00_0AB0(3, eb.slice(12, 14)),
    new S7_522_1BL01_0AB0(4, ab.slice(4, 8)),
    new S7_522_1BL01_0AB0(5, ab.slice(8, 12))
  ]
}

const rack3 = {
  nr: 3,
  // serie: 'et200m',
  // title: 'LSB',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(14, 18)),
    new S7_521_1BL00_0AB0(2, eb.slice(18, 22)),
    new S7_521_1BH00_0AB0(3, eb.slice(22, 24)),
    new S7_522_1BL01_0AB0(4, ab.slice(12, 16)),
    new S7_522_1BL01_0AB0(5, ab.slice(16, 20))
  ]
}

const rack4 = {
  nr: 4,
  // serie: 'et200m',
  // title: 'SH1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(24, 28)),
    new S7_521_1BH00_0AB0(2, eb.slice(28, 30)),
    new S7_522_1BL01_0AB0(3, ab.slice(20, 24))
  ]
}

const rack5 = {
  nr: 5,
  // serie: 'et200m',
  // title: 'SH2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(30, 34)),
    new S7_521_1BH00_0AB0(2, eb.slice(34, 36)),
    new S7_522_1BL01_0AB0(3, ab.slice(24, 28))
  ]
}

const rack6 = {
  nr: 6,
  // serie: 'et200m',
  // title: 'SH3',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(36, 40)),
    new S7_521_1BH00_0AB0(2, eb.slice(40, 42)),
    new S7_522_1BL01_0AB0(3, ab.slice(28, 32))
  ]
}

// export default [rack1, rack2, rack3, rack4, rack5, rack6]

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('LSA', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn02 = new Pn('LSB', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn03 = new Pn('SH1', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn04 = new Pn('SH2', 4, merkers.find(b => b.addr === 'M4.3'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn05 = new Pn('SH3', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-5 PN', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3
pn03.rack = rack4
pn04.rack = rack5
pn05.rack = rack6

export default [pn00, pn01, pn02, pn03, pn04, pn05]
