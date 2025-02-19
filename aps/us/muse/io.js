import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 5, str.inputs1)
const inputs2 = generateBits('E', 100, 107, str.inputs2)
const inputs3 = generateBits('E', 110, 111, str.inputs3)
const inputs4 = generateBits('E', 200, 207, str.inputs4)
const inputs5 = generateBits('E', 210, 211, str.inputs5)
const inputs6 = generateBits('E', 300, 305, str.inputs6)
const inputs7 = generateBits('E', 310, 314, str.inputs7)
const inputs8 = generateBits('E', 400, 405, str.inputs8)
const inputs9 = generateBits('E', 410, 414, str.inputs9)
export const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7,
  inputs8,
  inputs9
)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 105, str.outputs2)
const outputs3 = generateBits('A', 110, 110, str.outputs3)
const outputs4 = generateBits('A', 200, 205, str.outputs4)
const outputs5 = generateBits('A', 210, 210, str.outputs5)
const outputs6 = generateBits('A', 300, 301, str.outputs6)
const outputs7 = generateBits('A', 304, 304, str.outputs7)
const outputs8 = generateBits('A', 310, 312, str.outputs8)
const outputs9 = generateBits('A', 400, 401, str.outputs9)
const outputs10 = generateBits('A', 404, 404, str.outputs10)
const outputs11 = generateBits('A', 410, 412, str.outputs11)
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
  outputs11
)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
