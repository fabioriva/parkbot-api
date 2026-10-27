import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 11, str.inputsEL)
const inputs2 = generateBits('E', 12, 23, str.inputsEL)
const inputs3 = generateBits('E', 24, 35, str.inputsEL)
const inputs4 = generateBits('E', 36, 47, str.inputsEL)
const inputs5 = generateBits('E', 48, 59, str.inputsEL)
const inputs6 = generateBits('E', 60, 65, str.inputsSH)
const inputs7 = generateBits('E', 66, 71, str.inputsSH)
const inputs8 = generateBits('E', 72, 77, str.inputsSH)
const inputs9 = generateBits('E', 78, 83, str.inputsSH)
const inputs10 = generateBits('E', 84, 89, str.inputsSH)
const inputs11 = generateBits('E', 90, 95, str.inputsSH)
const inputs12 = generateBits('E', 96, 101, str.inputsSH)
const inputs13 = generateBits('E', 102, 107, str.inputsSH)
const inputs14 = generateBits('E', 108, 113, str.inputsSH)
const inputs15 = generateBits('E', 114, 119, str.inputsSH)
const inputs16 = generateBits('E', 120, 125, str.inputsSH)
const inputs17 = generateBits('E', 126, 131, str.inputsSH)
const inputs18 = generateBits('E', 132, 137, str.inputsSH)
const inputs19 = generateBits('E', 138, 143, str.inputsSH)

export const inputs = [
  ...inputs1, ...inputs2, ...inputs3, ...inputs4, ...inputs5,
  ...inputs6, ...inputs7, ...inputs8, ...inputs9, ...inputs10,
  ...inputs11, ...inputs12, ...inputs13, ...inputs14, ...inputs15,
  ...inputs16, ...inputs17, ...inputs18, ...inputs19
]
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 9, str.outputsEL)
const outputs2 = generateBits('A', 10, 19, str.outputsEL)
const outputs3 = generateBits('A', 20, 29, str.outputsEL)
const outputs4 = generateBits('A', 30, 39, str.outputsEL)
const outputs5 = generateBits('A', 40, 49, str.outputsEL)
const outputs6 = generateBits('A', 50, 55, str.outputsSH)
const outputs7 = generateBits('A', 56, 61, str.outputsSH)
const outputs8 = generateBits('A', 62, 67, str.outputsSH)
const outputs9 = generateBits('A', 68, 73, str.outputsSH)
const outputs10 = generateBits('A', 74, 79, str.outputsSH)
const outputs11 = generateBits('A', 80, 85, str.outputsSH)
const outputs12 = generateBits('A', 86, 91, str.outputsSH)
const outputs13 = generateBits('A', 92, 97, str.outputsSH)
const outputs14 = generateBits('A', 98, 103, str.outputsSH)
const outputs15 = generateBits('A', 104, 109, str.outputsSH)
const outputs16 = generateBits('A', 110, 115, str.outputsSH)
const outputs17 = generateBits('A', 116, 121, str.outputsSH)
const outputs18 = generateBits('A', 122, 127, str.outputsSH)
const outputs19 = generateBits('A', 128, 133, str.outputsSH)
export const outputs = [
  ...outputs1, ...outputs2, ...outputs3, ...outputs4, ...outputs5,
  ...outputs6, ...outputs7, ...outputs8, ...outputs9, ...outputs10,
  ...outputs11, ...outputs12, ...outputs13, ...outputs14, ...outputs15,
  ...outputs16, ...outputs17, ...outputs18, ...outputs19
]
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
