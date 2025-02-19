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
// EU1
const rack2 = {
  nr: 2,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(4, 8)), // E100..103
    new S7_521_1BL00_0AB0(2, eb.slice(8, 12)), // E104..107
    new S7_522_1BL01_0AB0(3, ab.slice(4, 8)) // A100..103
  ]
}
// T1
const rack3 = {
  nr: 3,
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(12, 14)), // E200..201
    new S7_522_1BH01_0AB0(2, ab.slice(8, 10)) // A200..201
  ]
}
// KKP1
const rack4 = {
  nr: 4,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(14, 18)), // E202..205
    new S7_522_1BL01_0AB0(2, ab.slice(10, 14)) // A202..205
  ]
}
// EU2
const rack5 = {
  nr: 5,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(18, 22)), // E300..303
    new S7_521_1BL00_0AB0(2, eb.slice(22, 26)), // E304..307
    new S7_522_1BL01_0AB0(3, ab.slice(14, 18)) // A300..303
  ]
}
// T2
const rack6 = {
  nr: 6,
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(26, 28)), // E400..401
    new S7_522_1BH01_0AB0(2, ab.slice(18, 20)) // A400..401
  ]
}
// KKP2
const rack7 = {
  nr: 7,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(28, 32)), // E402..405
    new S7_522_1BL01_0AB0(2, ab.slice(20, 24)) // A402..405
  ]
}
// EU3
const rack8 = {
  nr: 8,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(32, 36)), // E500..503
    new S7_521_1BL00_0AB0(2, eb.slice(36, 40)), // E504..507
    new S7_522_1BL01_0AB0(3, ab.slice(24, 28)) // A500..503
  ]
}
// T3
const rack9 = {
  nr: 9,
  cards: [
    new S7_521_1BH00_0AB0(1, eb.slice(40, 42)), // E600..601
    new S7_522_1BH01_0AB0(2, ab.slice(28, 30)) // A600..601
  ]
}
// KKP3
const rack10 = {
  nr: 10,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(42, 46)), // E602..605
    new S7_522_1BL01_0AB0(2, ab.slice(30, 34)) // A602..605
  ]
}

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('LSE1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn02 = new Pn('T1', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn03 = new Pn('KKP1', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn04 = new Pn('LSE2', 4, merkers.find(b => b.addr === 'M4.3'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn05 = new Pn('T2', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn06 = new Pn('KKP2', 6, merkers.find(b => b.addr === 'M4.5'), 'IM 155-5 PN', { key: 'im', query: {} })
const pn07 = new Pn('LSE3', 7, merkers.find(b => b.addr === 'M4.6'), 'IM 155-5 PN', { key: 'im', query: {} })
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
