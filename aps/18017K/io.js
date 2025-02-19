import * as str from './str.js'
import { generateBits, generateBytes } from '../../models/Bit.js'

const inputs1 = generateBits('E', 0, 17, str.inputs1)
export const inputs = inputs1
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 13, str.outputs1)
export const outputs = outputs1
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
