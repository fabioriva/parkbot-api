import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import test from 'node:test'
import { OPERATION, createOperationDefinitions } from '../lib/operationDefinitions.js'

const keys = [
  'op-no', 'op-alarm-on', 'op-alarm-off', 'op-switch-mode', 'op-change-pin',
  'op-stall-in', 'op-stall-out', 'op-shuffle-in', 'op-shuffle-out', 'op-stall-rsv',
  'op-req-exit', 'op-req-entry', 'op-req-rollback', 'op-req-queue', 'op-req-pp',
  'op-req-swap', 'op-req-repark', 'op-card-issued'
]

test('every APS exports the same common catalog with IDs 0–17', async () => {
  const expected = keys.map((key, id) => ({ id, key }))
  assert.deepEqual(Object.values(OPERATION), expected)
  const files = (await readdir(new URL('../aps/', import.meta.url), { recursive: true }))
    .filter(file => file.endsWith('/str.js'))
  assert.ok(files.length > 0)
  for (const file of files) {
    const { OPERATIONS } = await import(new URL(`../aps/${file}`, import.meta.url))
    assert.deepEqual(OPERATIONS.filter(operation => operation.id <= 17), expected, file)
    assert.equal(new Set(OPERATIONS.map(operation => operation.id)).size, OPERATIONS.length, file)
    assert.equal(OPERATIONS.some(operation => operation.id >= 100), false, file)
  }
})

test('KN retains codes 95–99 without conversion', async () => {
  const { OPERATIONS } = await import('../aps/in/kn/str.js')
  assert.deepEqual(OPERATIONS.filter(item => item.id >= 95), [
    { id: 95, key: 'op-stall-in' }, { id: 96, key: 'op-stall-out' },
    { id: 97, key: 'op-stall-lck' }, { id: 98, key: 'op-shuffle-in' },
    { id: 99, key: 'op-shuffle-out' }
  ])
})

test('APS additions cannot redefine common IDs and definition objects are independent', () => {
  for (let id = 0; id <= 17; id++) {
    assert.throws(() => createOperationDefinitions([{ id, key: 'op-other' }]), /already defined/)
  }
  const first = createOperationDefinitions()
  first[0].key = 'changed'
  assert.equal(createOperationDefinitions()[0].key, 'op-no')
})
