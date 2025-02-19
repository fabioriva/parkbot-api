import { inputs, outputs } from './io.js'
import { Device } from '../../models/Device.js'

const device = new Device(2, 'U1')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: []
}

const inverters = []

const motors = []

export default { device, inverters, motors, positions, view }
