import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Door } from '../../../models/Motor.js'
import { Garage } from '../../../models/View.js'

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const FX = inputs.find(b => b.addr === 'E7.0')
const EZ = inputs.find(b => b.addr === 'E4.0')
const EO = inputs.find(b => b.addr === 'E4.1')
const FB = inputs.find(b => b.addr === 'E4.2')
const AP = inputs.find(b => b.addr === 'E3.6')
const KX = outputs.find(b => b.addr === 'A5.3')
const SP = outputs.find(b => b.addr === 'A5.0')
const SZ = outputs.find(b => b.addr === 'A5.1')
const SO = outputs.find(b => b.addr === 'A5.2')

const M1 = new Door(
  0,
  [EZ, EO, AP, FB, FX],
  [SZ, SO, SP, KX]
)

const motors = [M1]

const L1 = outputs.find(b => b.addr === 'A2.0')
const L2 = outputs.find(b => b.addr === 'A2.1')
const L3 = outputs.find(b => b.addr === 'A2.2')
const L4 = outputs.find(b => b.addr === 'A2.3')
const L5 = outputs.find(b => b.addr === 'A2.4')

const FDL = inputs.find(b => b.addr === 'E4.4')
const FDR = inputs.find(b => b.addr === 'E4.5')
const FLA = inputs.find(b => b.addr === 'E5.2')
const FLP = inputs.find(b => b.addr === 'E5.0')
const FPE = inputs.find(b => b.addr === 'E4.3')
const EPZ = inputs.find(b => b.addr === 'E12.6')
const FRE1 = inputs.find(b => b.addr === 'E12.6')
const FRE2 = inputs.find(b => b.addr === 'E12.7')
const FTA1 = inputs.find(b => b.addr === 'E13.3')
const FTA2 = inputs.find(b => b.addr === 'E13.4')
const FLP2 = inputs.find(b => b.addr === 'E5.1')
const FDL2 = inputs.find(b => b.addr === 'E4.6')
const FDR2 = inputs.find(b => b.addr === 'E4.7')

const garage = new Garage(
  [],
  [M1],
  [L1, L2, L3, L4, L5],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2, FLP2, FDL2, FDR2, FRE1, FRE2]
)

const views = [garage]

const device = new Device(3, 'EU1', [], lamps, motors, views)

const drives = []

const positions = []

export default { device, drives, positions }
