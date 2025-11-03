import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 0, 10, str.inputsEL)
const inputs2 = generateBits('E', 11, 21, str.inputsEL)
const inputs3 = generateBits('E', 22, 32, str.inputsEL)
const inputs4 = generateBits('E', 33, 43, str.inputsEL)
const inputs5 = generateBits('E', 44, 54, str.inputsEL)
const inputs6 = generateBits('E', 55, 59, str.inputsSH)
const inputs7 = generateBits('E', 60, 64, str.inputsSH)
const inputs8 = generateBits('E', 65, 69, str.inputsSH)
const inputs9 = generateBits('E', 70, 74, str.inputsSH)
const inputs10 = generateBits('E', 75, 79, str.inputsSH)
const inputs11 = generateBits('E', 80, 84, str.inputsSH)
const inputs12 = generateBits('E', 85, 89, str.inputsSH)
const inputs13 = generateBits('E', 90, 94, str.inputsSH)
const inputs14 = generateBits('E', 95, 99, str.inputsSH)
const inputs15 = generateBits('E', 100, 104, str.inputsSH)
const inputs16 = generateBits('E', 105, 109, str.inputsSH)
const inputs17 = generateBits('E', 110, 114, str.inputsSH)
const inputs18 = generateBits('E', 115, 119, str.inputsSH)
const inputs19 = generateBits('E', 120, 124, str.inputsSH)
export const inputs = [
  ...inputs1, ...inputs2, ...inputs3, ...inputs4, ...inputs5,
  ...inputs6, ...inputs7, ...inputs8, ...inputs9, ...inputs10,
  ...inputs11, ...inputs12, ...inputs13, ...inputs14, ...inputs15,
  ...inputs16, ...inputs17, ...inputs18, ...inputs19
]
export const eb = generateBytes(inputs)

const outputs1 = generateBits('A', 0, 7, str.outputsEL)
const outputs2 = generateBits('A', 8, 15, str.outputsEL)
const outputs3 = generateBits('A', 16, 23, str.outputsEL)
const outputs4 = generateBits('A', 24, 31, str.outputsEL)
const outputs5 = generateBits('A', 32, 39, str.outputsEL)
const outputs6 = generateBits('A', 40, 43, str.outputsSH)
const outputs7 = generateBits('A', 44, 47, str.outputsSH)
const outputs8 = generateBits('A', 48, 51, str.outputsSH)
const outputs9 = generateBits('A', 52, 55, str.outputsSH)
const outputs10 = generateBits('A', 56, 59, str.outputsSH)
const outputs11 = generateBits('A', 60, 63, str.outputsSH)
const outputs12 = generateBits('A', 64, 67, str.outputsSH)
const outputs13 = generateBits('A', 68, 71, str.outputsSH)
const outputs14 = generateBits('A', 72, 75, str.outputsSH)
const outputs15 = generateBits('A', 76, 79, str.outputsSH)
const outputs16 = generateBits('A', 80, 83, str.outputsSH)
const outputs17 = generateBits('A', 84, 87, str.outputsSH)
const outputs18 = generateBits('A', 88, 91, str.outputsSH)
const outputs19 = generateBits('A', 92, 95, str.outputsSH)
export const outputs = [
  ...outputs1, ...outputs2, ...outputs3, ...outputs4, ...outputs5,
  ...outputs6, ...outputs7, ...outputs8, ...outputs9, ...outputs10,
  ...outputs11, ...outputs12, ...outputs13, ...outputs14, ...outputs15,
  ...outputs16, ...outputs17, ...outputs18, ...outputs19
]
export const ab = generateBytes(outputs)

export const merkers = generateBits('M', 0, 7)
export const mb = generateBytes(merkers)
