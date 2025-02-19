import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 3, str.inputs1)
const inputs2 = generateBits('E', 100, 109, str.inputs2)
const inputs3 = generateBits('E', 200, 209, str.inputs2)
const inputs4 = generateBits('E', 300, 309, str.inputs2)
const inputs5 = generateBits('E', 400, 401, str.inputs5)
const inputs6 = generateBits('E', 410, 413, str.inputs6)
const inputs7 = generateBits('E', 500, 501, str.inputs5)
const inputs8 = generateBits('E', 510, 513, str.inputs6)
const inputs9 = generateBits('E', 600, 601, str.inputs5)
const inputs10 = generateBits('E', 610, 613, str.inputs6)
export const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7,
  inputs8,
  inputs9,
  inputs10
)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 105, str.outputs2)
const outputs3 = generateBits('A', 200, 205, str.outputs2)
const outputs4 = generateBits('A', 300, 305, str.outputs2)
const outputs5 = generateBits('A', 400, 401, str.outputs5)
const outputs6 = generateBits('A', 410, 413, str.outputs6)
const outputs7 = generateBits('A', 500, 501, str.outputs5)
const outputs8 = generateBits('A', 510, 513, str.outputs6)
const outputs9 = generateBits('A', 600, 601, str.outputs5)
const outputs10 = generateBits('A', 610, 613, str.outputs6)
export const outputs = outputs1.concat(
  outputs2,
  outputs3,
  outputs4,
  outputs5,
  outputs6,
  outputs7,
  outputs8,
  outputs9,
  outputs10
)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
