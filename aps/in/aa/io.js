import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 1, str.inputs1)
const inputs2 = generateBits('E', 100, 103, str.inputs2)
const inputs3 = generateBits('E', 110, 117, str.inputs3)
const inputs4 = generateBits('E', 120, 127, str.inputs4)
export const inputs = inputs1.concat(inputs2, inputs3, inputs4)
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 103, str.outputs2)
const outputs3 = generateBits('A', 110, 115, str.outputs3)
const outputs4 = generateBits('A', 120, 123, str.outputs4)
export const outputs = outputs1.concat(outputs2, outputs3, outputs4)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
