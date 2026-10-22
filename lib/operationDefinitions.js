// One catalog for PLC events, app actions and MongoDB reference definitions.
export const OPERATION_VERSION = 1

export const OPERATION = {
  NONE: { id: 0, key: 'op-no' },
  ALARM_ON: { id: 1, key: 'op-alarm-on' },
  ALARM_OFF: { id: 2, key: 'op-alarm-off' },
  SWITCH_MODE: { id: 3, key: 'op-switch-mode' },
  CHANGE_PIN: { id: 4, key: 'op-change-pin' },
  STALL_IN: { id: 5, key: 'op-stall-in' },
  STALL_OUT: { id: 6, key: 'op-stall-out' },
  SHUFFLE_IN: { id: 7, key: 'op-shuffle-in' },
  SHUFFLE_OUT: { id: 8, key: 'op-shuffle-out' },
  STALL_RESERVED: { id: 9, key: 'op-stall-rsv' },
  EXIT: { id: 10, key: 'op-req-exit' },
  ENTRY: { id: 11, key: 'op-req-entry' },
  ROLLBACK: { id: 12, key: 'op-req-rollback' },
  QUEUE_DELETE: { id: 13, key: 'op-req-queue' },
  PP: { id: 14, key: 'op-req-pp' },
  SWAP: { id: 15, key: 'op-req-swap' },
  REPARK: { id: 16, key: 'op-req-repark' },
  CARD_ISSUED: { id: 17, key: 'op-card-issued' }
}

// Additional codes such as KN's 95–99 remain explicit in its str.js.
// An APS cannot redefine the meaning of an ID in the common catalog.
export function createOperationDefinitions (extra = []) {
  const definitions = new Map(Object.values(OPERATION).map(operation => [operation.id, operation]))
  for (const operation of extra) {
    if (definitions.has(operation.id)) {
      throw new RangeError(`Operation ID ${operation.id} is already defined`)
    }
    definitions.set(operation.id, operation)
  }
  return Array.from(definitions.values(), operation => ({ ...operation }))
}
