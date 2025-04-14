import { inputs, outputs } from './io.js'
import { Device } from '../../../models/Device.js'
import { Drive } from '../../../models/Drive.js'
import { Main } from '../../../models/View.js'

const EN1 = inputs.find(b => b.addr === 'E9.6')

const IV1 = new Drive(2, 'IVL', EN1)

const drives = [IV1]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A8.7'),
  outputs.find(b => b.addr === 'A8.6')
]

const positions = []

const motors = []

const main = new Main(drives, [])

const views = [main]

const device = new Device(2, 'EL(L)', [], lamps, motors, views)

export default { device, drives, positions }
