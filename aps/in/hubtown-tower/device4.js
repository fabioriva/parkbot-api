import * as def from './def.js'
import { inputs, merkers, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Barrier, Door, Flap } from '../../../models/Motor.js'
import { Main, Garage } from '../../../models/View.js'

const lamps = [
  inputs.find((b) => b.addr === 'E201.2'),
  outputs.find((b) => b.addr === 'A201.5'),
  outputs.find((b) => b.addr === 'A201.4')
]

const positions = []

const AP = inputs.find((b) => b.addr === 'E202.3')
const EZ = inputs.find((b) => b.addr === 'E205.0')
const EO = inputs.find((b) => b.addr === 'E205.1')
const FB = inputs.find((b) => b.addr === 'E203.3')
const SZ = outputs.find((b) => b.addr === 'A202.2')
const SO = outputs.find((b) => b.addr === 'A202.1')
const KX = outputs.find((b) => b.addr === 'A202.0')

const M2 = new Door(0, [EZ, EO, AP, FB], [SZ, SO, KX])

const APB = inputs.find((b) => b.addr === 'E202.4')
const EZB = inputs.find((b) => b.addr === 'E204.6')
const EOB = inputs.find((b) => b.addr === 'E204.7')
const FBB = inputs.find((b) => b.addr === 'E203.2')
const SZB = outputs.find((b) => b.addr === 'A202.5')
const SOB = outputs.find((b) => b.addr === 'A202.4')
const KXB = outputs.find((b) => b.addr === 'A202.3')

const M3 = new Barrier(0, [EZB, EOB, APB, FBB], [SZB, SOB, KXB])

const ECA = inputs.find((b) => b.addr === 'E203.0')
const ECB = inputs.find((b) => b.addr === 'E203.1')
const AMC = inputs.find((b) => b.addr === 'E202.1')
const SCA = outputs.find((b) => b.addr === 'A201.6')
const SCB = outputs.find((b) => b.addr === 'A201.7')

const M4 = new Flap(0, [ECA, ECB, AMC], [SCA, SCB])

// const A0 = {
//   conn: def.REQ_1,
//   enable: merkers.find((b) => b.addr === 'M3.1'),
//   key: 'action-entry'
// }

const drives = []

const motors = [M2, M3, M4]

const main = new Main(drives, [M2, M3, M4])

const EPZ = inputs.find((b) => b.addr === 'E205.2')
const FPE = inputs.find((b) => b.addr === 'E203.4')
const FLA = inputs.find((b) => b.addr === 'E204.1')
const FLP = inputs.find((b) => b.addr === 'E204.2')
const FDR = inputs.find((b) => b.addr === 'E203.5')
const FDL = inputs.find((b) => b.addr === 'E203.6')
const FTA1 = inputs.find((b) => b.addr === 'E204.3')
const FTA2 = inputs.find((b) => b.addr === 'E204.4')
const FDR2 = inputs.find((b) => b.addr === 'E203.7')
const FDL2 = inputs.find((b) => b.addr === 'E204.0')

const garage = new Garage(
  [],
  [M2, M3, M4],
  [],
  [EPZ, FPE, FLA, FLP, FDL, FDR, FTA1, FTA2]
)

const views = [garage]

const device = new Device(3, 'E2', [], lamps, motors, views)

export default { device, drives, positions }
