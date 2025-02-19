import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Door } from '../../../models/Motor.js'
import { Garage } from '../../../models/View.js'

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E21.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const drives = []

const FX = inputs.find(b => b.addr === 'E30.0')
const EZ = inputs.find(b => b.addr === 'E28.0')
const EO = inputs.find(b => b.addr === 'E28.1')
const FB = inputs.find(b => b.addr === 'E28.2')
const AP = inputs.find(b => b.addr === 'E31.5')
const KX = outputs.find(b => b.addr === 'A25.3')
const SZ = outputs.find(b => b.addr === 'A25.1')
const SO = outputs.find(b => b.addr === 'A25.2')
const SP = outputs.find(b => b.addr === 'A25.0')

const M5 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, SP, KX]
)

const motors = [M5]

const L1 = outputs.find(b => b.addr === 'A23.0')
const L2 = outputs.find(b => b.addr === 'A23.1')
const L3 = outputs.find(b => b.addr === 'A23.2')
const L4 = outputs.find(b => b.addr === 'A23.3')
const L5 = outputs.find(b => b.addr === 'A23.4')

const FDR = inputs.find(b => b.addr === 'E28.4')
const FDL = inputs.find(b => b.addr === 'E28.5')
const FLA = inputs.find(b => b.addr === 'E29.2')
const FLP = inputs.find(b => b.addr === 'E29.0')
const FPE = inputs.find(b => b.addr === 'E28.3')
const EPZ = inputs.find(b => b.addr === 'E23.4')
// const FRE1 = inputs.find(b => b.addr === 'E104.6')
// const FRE2 = inputs.find(b => b.addr === 'E104.7')
const FTA1 = inputs.find(b => b.addr === 'E28.6')
const FTA2 = inputs.find(b => b.addr === 'E28.7')
const FDL1 = inputs.find(b => b.addr === 'E30.5')
const FDR1 = inputs.find(b => b.addr === 'E30.6')
const FTA3 = inputs.find(b => b.addr === 'E30.7')

// const main = new Main(drives, [M1, M2, M3])

const garage = new Garage(
  [],
  [M5],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FTA3, FDL1, FDR1]
)

const views = [garage]

const device = new Device(3, 'EU2', [], lamps, motors, views)

export default { device, drives, positions }
