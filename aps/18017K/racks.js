import { ab, eb, merkers } from './io.js'
import {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0,
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} from '../../models/Modules.js'
import { Pn } from '../../models/Pn.js'

const rack1 = {
  nr: 1,
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(2, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(3, eb.slice(8, 12)),
    new S7_522_1BL01_0AB0(4, ab.slice(0, 4)),
    new S7_522_1BL01_0AB0(5, ab.slice(4, 8)),
    new S7_522_1BH01_0AB0(6, ab.slice(8, 10))
  ]
}

const rack2 = {
  nr: 2,
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(12, 14)),
    new S7_131_6BH01_0BA0(2, eb.slice(14, 16)),
    new S7_131_6BH01_0BA0(3, eb.slice(16, 18)),
    new S7_132_6BH01_0BA0(4, ab.slice(10, 12)),
    new S7_132_6BH01_0BA0(5, ab.slice(12, 14))
  ]
}

const pn00 = new Pn('PLC', 0, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('KKP', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn02 = new Pn('IV1', 2, merkers.find(b => b.addr === 'M4.1'), 'Unidrive M200-M400', { key: 'iv', query: { nr: 1 } })
const pn03 = new Pn('IV2', 3, merkers.find(b => b.addr === 'M4.2'), 'Unidrive M200-M400', { key: 'iv', query: { nr: 2 } })
const pn04 = new Pn('LV1', 4, merkers.find(b => b.addr === 'M4.3'), 'AMS 348i', { key: 'lv', query: { nr: 1 } })
const pn05 = new Pn('LV2', 5, merkers.find(b => b.addr === 'M4.4'), 'AMS 348i', { key: 'lv', query: { nr: 2 } })
const pn06 = new Pn('LH1', 6, merkers.find(b => b.addr === 'M4.5'), 'AMS 348i', { key: 'lh', query: { nr: 1 } })
const pn07 = new Pn('LH2', 7, merkers.find(b => b.addr === 'M4.6'), 'AMS 348i', { key: 'lh', query: { nr: 2 } })
const pn08 = new Pn('ENR', 8, merkers.find(b => b.addr === 'M4.7'), 'CE EPN2', { key: 'en', query: { axis: 'R' } })

pn00.rack = rack1
pn01.rack = rack2

export default [pn00, pn01, pn02, pn03, pn04, pn05, pn06, pn07, pn08]
