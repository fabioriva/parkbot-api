import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

export const inputs = generateBits('E', 0, 95, str.inputs1)
export const eb = generateBytes(inputs)

export const outputs = generateBits('A', 0, 53, str.outputs1)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
