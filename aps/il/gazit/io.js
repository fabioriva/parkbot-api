import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 4, 16, str.inputs1)
export const inputs = inputs1
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 4, 7, str.outputs1)
const outputs2 = generateBits('A', 12, 16, str.outputs2)
export const outputs = outputs1.concat(outputs2)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
