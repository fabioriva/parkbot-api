import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 11, str.inputs1)
const inputs2 = generateBits('E', 12, 13, str.inputs2)
const inputs3 = generateBits('E', 14, 19, str.inputs3)
export const inputs = inputs1.concat(inputs2, inputs3)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 7, str.outputs1)
const outputs2 = generateBits('A', 12, 13, str.outputs2)
const outputs3 = generateBits('A', 14, 17, str.outputs3)
export const outputs = outputs1.concat(outputs2, outputs3)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
