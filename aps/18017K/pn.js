const { merkers } = require('./obj')
const racks = require('./racks')
const { Pn } = require('../../models/Pn')

const pn00 = new Pn('PLC', 1, { status: 1 }, 'CPU', { key: 'cpu', query: {} })
const pn01 = new Pn('KKP', 1, merkers.find(b => b.addr === 'M4.0'), 'IM 155-6 PN ST', { key: 'im', query: {} })
const pn02 = new Pn('IV1', 2, merkers.find(b => b.addr === 'M4.1'), 'Unidrive M200-M400', { key: 'iv', query: { nr: 1 } })
const pn03 = new Pn('IV2', 3, merkers.find(b => b.addr === 'M4.2'), 'Unidrive M200-M400', { key: 'iv', query: { nr: 2 } })
const pn04 = new Pn('LV1', 4, merkers.find(b => b.addr === 'M4.3'), 'AMS 348i', { key: 'lv', query: { nr: 1 } })
const pn05 = new Pn('LV2', 5, merkers.find(b => b.addr === 'M4.4'), 'AMS 348i', { key: 'lv', query: { nr: 2 } })
const pn06 = new Pn('LH1', 6, merkers.find(b => b.addr === 'M4.5'), 'AMS 348i', { key: 'lh', query: { nr: 1 } })
const pn07 = new Pn('LH2', 7, merkers.find(b => b.addr === 'M4.6'), 'AMS 348i', { key: 'lh', query: { nr: 2 } })
const pn08 = new Pn('ENR', 8, merkers.find(b => b.addr === 'M4.7'), 'CE EPN2', { key: 'en', query: { axis: 'R' } })

pn00.rack = racks[0]
pn01.rack = racks[1]

module.exports = [pn00, pn01, pn02, pn03, pn04, pn05, pn06, pn07, pn08]

// const pn01 = {
//   deviceName: 'KKP',
//   deviceNr: 1,
//   online: merkers.find(b => b.addr === 'M4.0'),
//   type: 'IM 155-6 PN ST',
//   key: 'im',
//   query: {}
// }

// const pn02 = {
//   deviceName: 'IV1',
//   deviceNr: 2,
//   online: merkers.find(b => b.addr === 'M4.1'),
//   type: 'Unidrive M200-M400',
//   key: 'iv',
//   query: { nr: 1 }
// }

// const pn03 = {
//   deviceName: 'IV2',
//   deviceNr: 3,
//   online: merkers.find(b => b.addr === 'M4.2'),
//   type: 'Unidrive M200-M400',
//   key: 'iv',
//   query: { nr: 2 }
// }

// const pn04 = {
//   deviceName: 'LV1',
//   deviceNr: 4,
//   online: merkers.find(b => b.addr === 'M4.3'),
//   type: 'AMS 348i',
//   key: 'lv',
//   query: { nr: 1 }
// }

// const pn05 = {
//   deviceName: 'LV2',
//   deviceNr: 5,
//   online: merkers.find(b => b.addr === 'M4.4'),
//   type: 'AMS 348i',
//   key: 'lv',
//   query: { nr: 2 }
// }

// const pn06 = {
//   deviceName: 'LH1',
//   deviceNr: 6,
//   online: merkers.find(b => b.addr === 'M4.5'),
//   type: 'AMS 348i',
//   key: 'lh',
//   query: { nr: 1 }
// }

// const pn07 = {
//   deviceName: 'LH2',
//   deviceNr: 7,
//   online: merkers.find(b => b.addr === 'M4.6'),
//   type: 'AMS 348i',
//   key: 'lh',
//   query: { nr: 2 }
// }

// const pn08 = {
//   deviceName: 'ENR',
//   deviceNr: 8,
//   online: merkers.find(b => b.addr === 'M4.7'),
//   type: 'CE EPN2',
//   key: 'en',
//   query: { axis: 'R' }
// }
