import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

// CPU
const inputs1 = generateBits('E', 0, 3, str.inputs1)
// sys 1
const inputs2 = generateBits('E', 100, 117, str.inputs2)
// sys 2
const inputs3 = generateBits('E', 200, 217, str.inputs2)
// sys 3
const inputs4 = generateBits('E', 300, 317, str.inputs2)

export const inputs = inputs1.concat(inputs2, inputs3, inputs4)
export const eb = generateBytes(inputs)

// CPU
const outputs1 = generateBits('A', 0, 3, str.outputs1)
// sys 1
const outputs2 = generateBits('A', 100, 105, str.outputs2)
const outputs3 = generateBits('A', 110, 115, str.outputs3)
// sys 2
const outputs4 = generateBits('A', 200, 205, str.outputs2)
const outputs5 = generateBits('A', 210, 215, str.outputs3)
// sys 3
const outputs6 = generateBits('A', 300, 305, str.outputs2)
const outputs7 = generateBits('A', 310, 315, str.outputs3)

export const outputs = outputs1.concat(outputs2, outputs3, outputs4, outputs5, outputs6, outputs7)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
