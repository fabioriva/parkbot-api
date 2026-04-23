import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

// const inputs1 = generateBits('E', 0, 1, str.inputs1) // CPU not used
// sys 1
const inputs1 = generateBits('E', 100, 103, str.inputs2)
const inputs2 = generateBits('E', 110, 117, str.inputs3)
const inputs3 = generateBits('E', 120, 127, str.inputs4)
// sys 2
const inputs4 = generateBits('E', 200, 203, str.inputs2)
const inputs5 = generateBits('E', 210, 217, str.inputs3)
const inputs6 = generateBits('E', 220, 227, str.inputs4)
// sys 3
const inputs7 = generateBits('E', 300, 303, str.inputs2)
const inputs8 = generateBits('E', 310, 317, str.inputs3)
const inputs9 = generateBits('E', 320, 327, str.inputs4)
export const inputs = inputs1.concat(inputs2, inputs3, inputs4, inputs5, inputs6, inputs7, inputs8, inputs9)
export const eb = generateBytes(inputs)

// const outputs1 = generateBits('A', 0, 3, str.outputs1) // CPU not used
// sys 1
const outputs1 = generateBits('A', 100, 103, str.outputs2)
const outputs2 = generateBits('A', 110, 115, str.outputs3)
const outputs3 = generateBits('A', 120, 123, str.outputs4)
// sys 2
const outputs4 = generateBits('A', 200, 203, str.outputs2)
const outputs5 = generateBits('A', 210, 215, str.outputs3)
const outputs6 = generateBits('A', 220, 223, str.outputs4)
// sys 3
const outputs7 = generateBits('A', 300, 303, str.outputs2)
const outputs8 = generateBits('A', 310, 315, str.outputs3)
const outputs9 = generateBits('A', 320, 323, str.outputs4)
export const outputs = outputs1.concat(outputs2, outputs3, outputs4, outputs5, outputs6, outputs7, outputs8, outputs9)
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
