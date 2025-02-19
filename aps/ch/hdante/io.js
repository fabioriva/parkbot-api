import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 4, 11, str.inputs1)
const inputs2 = generateBits('E', 12, 12, str.inputs2)
const inputs3 = generateBits('E', 24, 25, str.inputs3)
const inputs4 = generateBits('E', 0, 4, str.inputs4)
export const inputs = inputs1.concat(inputs2, inputs3)
export const eb = generateBytes(inputs)
// shuttle I/O
export const inputsSH = inputs4
export const ebSH = generateBytes(inputsSH)

const outputs1 = generateBits('A', 4, 7, str.outputs1)
const outputs2 = generateBits('A', 12, 12, str.outputs2)
const outputs3 = generateBits('A', 24, 25, str.outputs3)
const outputs4 = generateBits('A', 0, 2, str.outputs4)
export const outputs = outputs1.concat(outputs2, outputs3)
export const ab = generateBytes(outputs)
// shuttle I/O
export const outputsSH = outputs4
export const abSH = generateBytes(outputsSH)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
