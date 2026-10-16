export class QueueRequestError extends Error {}

export default class QueueOperations {
  constructor ({ obj, plc, history }) {
    this.obj = obj
    this.plc = plc
    this.history = history
  }

  async deleteRequest ({ index, card, user }) {
    if (!Number.isInteger(index) || !Number.isInteger(card) || card <= 0 || card > 0xFFFF) {
      throw new QueueRequestError('Parameters not valid')
    }
    const queue = this.obj.queue
    // Match the PLC's strict bounds; IDs are one-based and must not be reindexed.
    if (index <= 1 || index >= queue.length) {
      throw new QueueRequestError('Queue index not valid')
    }
    const item = queue.find(item => item.id === index)
    if (!item || item.card !== card) {
      throw new QueueRequestError('Queue changed, refresh and try again')
    }

    // No await between checking the current snapshot and submitting the write.
    // The PLC may still change its queue before processing this command.
    const written = await this.plc.deleteRequest({ index, card })
    await this.history.saveAction({
      card,
      date: this.obj.plcDTL,
      operation: 13, // 'op-req-queue'
      stall: 0,
      user
    })
    return { card, written }
  }
}
