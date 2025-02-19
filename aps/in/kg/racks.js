import { ab, eb, merkers } from './io.js'
import {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BH01_0AB0,
  S7_526_1BH00_0AB0,
  S7_526_2BF00_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0,
  S7_136_6BA00_0CA0,
  S7_136_6BD00_0CA0
} from '../../../models/Modules.js'
import { Pn } from '../../../models/Pn.js'

const rack1 = {
  nr: 1,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(27, 29)),
    new S7_526_2BF00_0AB0(2, ab.slice(16, 17)),
    new S7_521_1BH00_0AB0(3, eb.slice(0, 2)),
    new S7_522_1BH01_0AB0(4, ab.slice(0, 2))
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(29, 31)),
    new S7_526_2BF00_0AB0(2, ab.slice(17, 18)),
    new S7_521_1BL00_0AB0(3, eb.slice(2, 6)),
    new S7_522_1BH01_0AB0(4, ab.slice(2, 4))
  ]
}

const rack3 = {
  nr: 3,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[31]),
    new S7_136_6BD00_0CA0(2, ab[18]),
    new S7_131_6BF00_0BA0(3, eb[6]),
    new S7_131_6BF00_0BA0(4, eb[7]),
    new S7_132_6BF00_0BA0(5, ab[4])
  ]
}

const rack4 = {
  nr: 4,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[32]),
    new S7_136_6BD00_0CA0(2, ab[19]),
    new S7_131_6BF00_0BA0(3, eb[8]),
    new S7_131_6BF00_0BA0(4, eb[9]),
    new S7_131_6BF00_0BA0(5, eb[10]),
    new S7_131_6BF00_0BA0(6, eb[11]),
    new S7_132_6BF00_0BA0(7, ab[5]),
    new S7_132_6BF00_0BA0(8, ab[6])
  ]
}

const rack5 = {
  nr: 5,
  cards: [
    new S7_131_6BF00_0BA0(1, eb[12]),
    new S7_131_6BF00_0BA0(2, eb[13]),
    new S7_131_6BF00_0BA0(3, eb[14]),
    new S7_131_6BF00_0BA0(4, eb[15]),
    new S7_132_6BF00_0BA0(5, ab[7]),
    new S7_132_6BF00_0BA0(6, ab[8]),
    new S7_132_6BF00_0BA0(7, ab[9])
  ]
}

const rack6 = {
  nr: 6,
  cards: [
    new S7_526_1BH00_0AB0(1, eb.slice(33, 35)),
    new S7_526_2BF00_0AB0(2, ab.slice(20, 21)),
    new S7_521_1BL00_0AB0(3, eb.slice(16, 20)),
    new S7_522_1BH01_0AB0(4, ab.slice(10, 12))
  ]
}

const rack7 = {
  nr: 7,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[35]),
    new S7_136_6BD00_0CA0(2, ab[21]),
    new S7_131_6BF00_0BA0(3, eb[20]),
    new S7_131_6BF00_0BA0(4, eb[21]),
    new S7_132_6BF00_0BA0(5, ab[12])
  ]
}

const rack8 = {
  nr: 8,
  cards: [
    new S7_136_6BA00_0CA0(1, eb[36]),
    new S7_136_6BD00_0CA0(2, ab[22]),
    new S7_131_6BF00_0BA0(3, eb[22]),
    new S7_131_6BF00_0BA0(4, eb[23]),
    new S7_131_6BF00_0BA0(5, eb[24]),
    new S7_131_6BF00_0BA0(6, eb[25]),
    new S7_131_6BF00_0BA0(7, eb[26]),
    new S7_132_6BF00_0BA0(8, ab[13]),
    new S7_132_6BF00_0BA0(9, ab[14]),
    new S7_132_6BF00_0BA0(10, ab[15])
  ]
}

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('LS1', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-5 PN ST', { key: 'im', query: {} })
const pn02 = new Pn('KKP1', 2, merkers.find(b => b.addr === 'M4.1'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn03 = new Pn('SH1', 3, merkers.find(b => b.addr === 'M4.2'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn04 = new Pn('KKE1', 4, merkers.find(b => b.addr === 'M4.3'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn05 = new Pn('LS2', 5, merkers.find(b => b.addr === 'M4.4'), 'IM 155-5 PN ST', { key: 'im', query: {} })
const pn06 = new Pn('KKP2', 6, merkers.find(b => b.addr === 'M4.5'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn07 = new Pn('SH2', 1, merkers.find(b => b.addr === 'M4.6'), 'IM 155-6 PN ST', { key: 'im', query: {} })

pn00.rack = rack1
pn01.rack = rack2
pn02.rack = rack3
pn03.rack = rack4
pn04.rack = rack5
pn05.rack = rack6
pn06.rack = rack7
pn07.rack = rack8

export default [pn00, pn01, pn02, pn03, pn04, pn05, pn06, pn07]
