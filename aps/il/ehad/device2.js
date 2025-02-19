import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Barrier, Door } from '../../../models/Motor.js'
import { Garage } from '../../../models/View.js'

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E21.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const drives = []

const FX = inputs.find(b => b.addr === 'E26.0')
const EZ = inputs.find(b => b.addr === 'E24.0')
const EO = inputs.find(b => b.addr === 'E24.1')
const FB = inputs.find(b => b.addr === 'E24.2')
const AP = inputs.find(b => b.addr === 'E27.5')
const KX = outputs.find(b => b.addr === 'A24.3')
const SZ = outputs.find(b => b.addr === 'A24.1')
const SO = outputs.find(b => b.addr === 'A24.2')
const SP = outputs.find(b => b.addr === 'A24.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, SP, KX]
)

const APB = inputs.find(b => b.addr === 'E27.6')
const EZB = inputs.find(b => b.addr === 'E26.2')
const EOB = inputs.find(b => b.addr === 'E26.3')
// const FBB = inputs.find(b => b.addr === 'E4.3')
const SZB = outputs.find(b => b.addr === 'A24.5')
const SOB = outputs.find(b => b.addr === 'A24.6')
const KXB = outputs.find(b => b.addr === 'A24.7')

const M6 = new Barrier(
  0,
  [EZB, EOB, APB], // FBB],
  [SZB, SOB, KXB]
)

const motors = [M5, M6]

const L1 = outputs.find(b => b.addr === 'A22.0')
const L2 = outputs.find(b => b.addr === 'A22.1')
const L3 = outputs.find(b => b.addr === 'A22.2')
const L4 = outputs.find(b => b.addr === 'A22.3')
const L5 = outputs.find(b => b.addr === 'A22.4')

const FDR = inputs.find(b => b.addr === 'E24.4')
const FDL = inputs.find(b => b.addr === 'E24.5')
const FLA = inputs.find(b => b.addr === 'E25.2')
const FLP = inputs.find(b => b.addr === 'E25.0')
const FPE = inputs.find(b => b.addr === 'E24.3')
const EPZ = inputs.find(b => b.addr === 'E22.4')
// const FRE1 = inputs.find(b => b.addr === 'E104.6')
// const FRE2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E24.6')
const FTA2 = inputs.find(b => b.addr === 'E24.7')
const FDL1 = inputs.find(b => b.addr === 'E26.5')
const FDR1 = inputs.find(b => b.addr === 'E26.6')
const FTA3 = inputs.find(b => b.addr === 'E26.7')

// const main = new Main(drives, [M1, M2, M3])

const garage = new Garage(
  [],
  [M5, M6],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3, FDL1, FDR1]
)

const views = [garage]

const device = new Device(2, 'EU1', [], lamps, motors, views)

export default { device, drives, positions }
