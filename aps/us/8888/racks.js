import { ab, eb, merkers } from './io.js'
import {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BH01_0AB0,
  S7_522_1BL01_0AB0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const rack1 = {
  nr: 1,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4))
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(2, eb.slice(8, 12)),
    new S7_521_1BH00_0AB0(3, eb.slice(12, 14)),
    new S7_522_1BL01_0AB0(4, ab.slice(4, 8)),
    new S7_522_1BH01_0AB0(5, ab.slice(8, 10))
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(14, 18)),
    new S7_521_1BL00_0AB0(2, eb.slice(18, 22)),
    new S7_521_1BH00_0AB0(3, eb.slice(22, 24)),
    new S7_522_1BL01_0AB0(4, ab.slice(10, 14)),
    new S7_522_1BH01_0AB0(5, ab.slice(14, 16))
  ]
}

const rack4 = {
  nr: 4,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(24, 28)),
    new S7_521_1BL00_0AB0(2, eb.slice(28, 32)),
    new S7_521_1BH00_0AB0(3, eb.slice(32, 34)),
    new S7_522_1BL01_0AB0(4, ab.slice(16, 20)),
    new S7_522_1BH01_0AB0(5, ab.slice(20, 22))
  ]
}

const rack5 = {
  nr: 5,
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(34, 36)),
    new S7_522_1BH01_0AB0(2, ab.slice(22, 24))
  ]
}

const rack6 = {
  nr: 6,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(36, 40)),
    new S7_522_1BL01_0AB0(2, ab.slice(24, 28))
  ]
}

const rack7 = {
  nr: 7,
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(40, 42)),
    new S7_522_1BH01_0AB0(2, ab.slice(28, 30))
  ]
}

const rack8 = {
  nr: 8,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(42, 46)),
    new S7_522_1BL01_0AB0(2, ab.slice(30, 34))
  ]
}

const rack9 = {
  nr: 9,
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(46, 48)),
    new S7_522_1BH01_0AB0(2, ab.slice(34, 36))
  ]
}

const rack10 = {
  nr: 10,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(48, 52)),
    new S7_522_1BL01_0AB0(2, ab.slice(36, 40))
  ]
}

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('LS1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn02 = new Pn('LS2', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn03 = new Pn('LS3', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn04 = new Pn('T1', 4, merkers.find(b => b.addr === 'M4.3'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn05 = new Pn('KKP1', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn06 = new Pn('T2', 6, merkers.find(b => b.addr === 'M4.5'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn07 = new Pn('KKP2', 7, merkers.find(b => b.addr === 'M4.6'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn08 = new Pn('T3', 8, merkers.find(b => b.addr === 'M4.7'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn09 = new Pn('KKP3', 9, merkers.find(b => b.addr === 'M5.0'), 'IM 155-5 PN', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3
pn03.rack = rack4
pn04.rack = rack5
pn05.rack = rack6
pn06.rack = rack7
pn07.rack = rack8
pn08.rack = rack9
pn09.rack = rack10

export default [pn00, pn01, pn02, pn03, pn04, pn05, pn06, pn07, pn08, pn09]
