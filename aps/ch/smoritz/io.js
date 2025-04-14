import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 4, 15, str.inputs1)
const inputs2 = generateBits('E', 28, 31, str.inputs2)
const inputs3 = generateBits('E', 32, 32, str.inputs3)
export const inputs = inputs1.concat(inputs2, inputs3)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 4, 11, str.outputs1)
const outputs2 = generateBits('A', 28, 29, str.outputs2)
const outputs3 = generateBits('A', 32, 32, str.outputs3)
export const outputs = outputs1.concat(outputs2, outputs3)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
