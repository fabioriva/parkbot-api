import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 3, str.inputs1)
const inputs2 = generateBits('E', 100, 113, str.inputs2)
const inputs3 = generateBits('E', 200, 213, str.inputs2)
const inputs4 = generateBits('E', 300, 313, str.inputs2)
const inputs5 = generateBits('E', 400, 413, str.inputs2)
const inputs6 = generateBits('E', 1000, 1005, str.inputs3)
const inputs7 = generateBits('E', 1100, 1105, str.inputs3)
const inputs8 = generateBits('E', 1200, 1205, str.inputs3)
const inputs9 = generateBits('E', 1300, 1305, str.inputs3)
const inputs10 = generateBits('E', 1400, 1405, str.inputs3)
const inputs11 = generateBits('E', 1500, 1505, str.inputs3)
const inputs12 = generateBits('E', 1600, 1605, str.inputs3)
export const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7,
  inputs8,
  inputs9,
  inputs10,
  inputs11,
  inputs12
)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 107, str.outputs2)
const outputs3 = generateBits('A', 200, 207, str.outputs2)
const outputs4 = generateBits('A', 300, 307, str.outputs2)
const outputs5 = generateBits('A', 400, 407, str.outputs2)
const outputs6 = generateBits('A', 1000, 1003, str.outputs3)
const outputs7 = generateBits('A', 1100, 1103, str.outputs3)
const outputs8 = generateBits('A', 1200, 1203, str.outputs3)
const outputs9 = generateBits('A', 1300, 1303, str.outputs3)
const outputs10 = generateBits('A', 1400, 1403, str.outputs3)
const outputs11 = generateBits('A', 1500, 1503, str.outputs3)
const outputs12 = generateBits('A', 1600, 1603, str.outputs3)
export const outputs = outputs1.concat(
  outputs2,
  outputs3,
  outputs4,
  outputs5,
  outputs6,
  outputs7,
  outputs8,
  outputs9,
  outputs10,
  outputs11,
  outputs12
)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
