import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 1, str.inputs1)
const inputs2 = generateBits('E', 10, 17, str.inputs2)
const inputs3 = generateBits('E', 20, 27, str.inputs3)
const inputs4 = generateBits('E', 30, 35, str.inputs4)
export const inputs = inputs1.concat(inputs2, inputs3, inputs4)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 1, str.outputs1)
const outputs2 = generateBits('A', 10, 17, str.outputs2)
const outputs3 = generateBits('A', 20, 25, str.outputs3)
const outputs4 = generateBits('A', 30, 33, str.outputs4)
export const outputs = outputs1.concat(outputs2, outputs3, outputs4)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
