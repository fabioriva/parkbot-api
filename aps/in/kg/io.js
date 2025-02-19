import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 1, str.inputs1)
const inputs2 = generateBits('E', 10, 15, str.inputs2)
const inputs3 = generateBits('E', 20, 23, str.inputs3)
const inputs4 = generateBits('E', 30, 33, str.inputs4)
const inputs5 = generateBits('E', 40, 45, str.inputs5)
const inputs6 = generateBits('E', 50, 54, str.inputs6)
const inputs7 = generateBits('E', 1000, 1001, str.inputs7)
const inputs8 = generateBits('E', 1020, 1021, str.inputs8)
const inputs9 = generateBits('E', 1040, 1040, str.inputs9)
const inputs10 = generateBits('E', 1060, 1060, str.inputs10)
const inputs11 = generateBits('E', 1080, 1081, str.inputs11)
const inputs12 = generateBits('E', 1100, 1100, str.inputs12)
const inputs13 = generateBits('E', 1120, 1120, str.inputs13)

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
  inputs12,
  inputs13
)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 1, str.outputs1)
const outputs2 = generateBits('A', 10, 12, str.outputs2)
const outputs3 = generateBits('A', 20, 21, str.outputs3)
const outputs4 = generateBits('A', 30, 32, str.outputs4)
const outputs5 = generateBits('A', 40, 42, str.outputs5)
const outputs6 = generateBits('A', 50, 52, str.outputs6)
const outputs7 = generateBits('A', 1010, 1010, str.outputs7)
const outputs8 = generateBits('A', 1030, 1030, str.outputs8)
const outputs9 = generateBits('A', 1050, 1050, str.outputs9)
const outputs10 = generateBits('A', 1070, 1070, str.outputs10)
const outputs11 = generateBits('A', 1090, 1090, str.outputs11)
const outputs12 = generateBits('A', 1110, 1110, str.outputs12)
const outputs13 = generateBits('A', 1130, 1130, str.outputs13)

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
  outputs12,
  outputs13
)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
