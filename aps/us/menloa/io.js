import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 3, str.inputs1)
const inputs2 = generateBits('E', 100, 107, str.inputs2)
const inputs3 = generateBits('E', 200, 205, str.inputs3)
const inputs4 = generateBits('E', 300, 307, str.inputs4)
const inputs5 = generateBits('E', 400, 405, str.inputs5)
const inputs6 = generateBits('E', 500, 507, str.inputs6)
const inputs7 = generateBits('E', 600, 605, str.inputs7)
export const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7
)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 103, str.outputs2)
const outputs3 = generateBits('A', 200, 205, str.outputs3)
const outputs4 = generateBits('A', 300, 303, str.outputs4)
const outputs5 = generateBits('A', 400, 405, str.outputs5)
const outputs6 = generateBits('A', 500, 503, str.outputs6)
const outputs7 = generateBits('A', 600, 605, str.outputs7)
export const outputs = outputs1.concat(
  outputs2,
  outputs3,
  outputs4,
  outputs5,
  outputs6,
  outputs7
)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
