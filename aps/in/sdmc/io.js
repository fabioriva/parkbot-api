import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 3, str.inputs1)
const inputs2 = generateBits('E', 100, 107, str.inputs2)
const inputs3 = generateBits('E', 200, 207, str.inputs2)
const inputs4 = generateBits('E', 300, 307, str.inputs2)
const inputs5 = generateBits('E', 400, 407, str.inputs2)
const inputs6 = generateBits('E', 500, 507, str.inputs3)
const inputs7 = generateBits('E', 600, 605, str.inputs4)
const inputs8 = generateBits('E', 700, 705, str.inputs4)
const inputs9 = generateBits('E', 800, 805, str.inputs4)
const inputs10 = generateBits('E', 900, 905, str.inputs4)
const inputs11 = generateBits('E', 1000, 1005, str.inputs4)
const inputs12 = generateBits('E', 1100, 1105, str.inputs4)
const inputs13 = generateBits('E', 1200, 1205, str.inputs4)
export const inputs = inputs1.concat(inputs2, inputs3, inputs4, inputs5, inputs6, inputs7, inputs8,
  inputs9,
  inputs10,
  inputs11,
  inputs12,
  inputs13
)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 103, str.outputs2)
const outputs3 = generateBits('A', 200, 203, str.outputs2)
const outputs4 = generateBits('A', 300, 303, str.outputs2)
const outputs5 = generateBits('A', 400, 403, str.outputs2)
const outputs6 = generateBits('A', 500, 503, str.outputs3)
const outputs7 = generateBits('A', 600, 603, str.outputs4)
const outputs8 = generateBits('A', 700, 703, str.outputs4)
const outputs9 = generateBits('A', 800, 803, str.outputs4)
const outputs10 = generateBits('A', 900, 903, str.outputs4)
const outputs11 = generateBits('A', 1000, 1003, str.outputs4)
const outputs12 = generateBits('A', 1100, 1103, str.outputs4)
const outputs13 = generateBits('A', 1200, 1203, str.outputs4)
export const outputs = outputs1.concat(outputs2, outputs3, outputs4, outputs5, outputs6, outputs7, outputs8,
  outputs9,
  outputs10,
  outputs11,
  outputs12,
  outputs13
)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
