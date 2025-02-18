import * as str from './str.js'
import { generateBits, generateBytes } from '../../../models/Bit.js'

const inputs1 = generateBits('E', 4, 13, str.inputs1)
const inputs2 = generateBits('E', 14, 17, str.inputs2)
const inputs_ = inputs1.concat(inputs2)
export const inputs = inputs_
const eb_ = generateBytes(inputs_)
export const eb = eb_

const outputs1 = generateBits('A', 4, 9, str.outputs1)
const outputs2 = generateBits('A', 14, 15, str.outputs2)
const outputs_ = outputs1.concat(outputs2)
export const outputs = outputs_
const ab_ = generateBytes(outputs_)
export const ab = ab_

const merkers_ = generateBits('M', 0, 7)
export const merkers = merkers_
const mb_ = generateBytes(merkers_)
export const mb = mb_
