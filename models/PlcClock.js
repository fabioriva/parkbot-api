import { ReadArea, WriteArea, PlcCommandError } from '../lib/utils7.js'

export default class PlcClockCommands {
  constructor ({ client }) {
    this.client = client
  }

  async setClock (date) {
    if (!(date instanceof Date) || !Number.isFinite(date.getTime())) {
      throw new TypeError('Data non valida')
    }
    // Check write status
    const pending = await ReadArea(this.client, 0x84, 6, 30, 1, 0x02)
    if (pending[0] !== 0) {
      throw new PlcCommandError('Richiesta di impostazione già presente nel PLC')
    }
    // Codifica DTL in UTC.
    const data = Buffer.alloc(12)
    data.writeUInt16BE(date.getUTCFullYear(), 0)
    data[2] = date.getUTCMonth() + 1
    data[3] = date.getUTCDate()
    data[4] = date.getUTCDay() + 1 // Siemens: domenica = 1
    data[5] = date.getUTCHours()
    data[6] = date.getUTCMinutes()
    data[7] = date.getUTCSeconds()
    data.writeUInt32BE(date.getUTCMilliseconds() * 1_000_000, 8)

    // Prima trasferisci la data completa, poi attiva la richiesta.
    await WriteArea(this.client, 0x84, 6, 16, 12, 0x02, data)
    await WriteArea(this.client, 0x84, 6, 30, 1, 0x02, Buffer.from([1]))

    const deadline = Date.now() + 5000

    while (Date.now() < deadline) {
      // Byte 28–29: WriteStatus; byte 30: SetRequest.
      const reply = await ReadArea(this.client, 0x84, 6, 28, 3, 0x02)
      console.log({
        writeStatus: `0x${reply.readUInt16BE(0).toString(16).padStart(4, '0')}`,
        setRequest: reply[2]
      })

      if (reply[2] === 0) {
        const status = reply.readUInt16BE(0)
        if (status !== 0) {
          throw new PlcCommandError(
            `WR_SYS_T: errore 0x${status.toString(16).padStart(4, '0')}`
          )
        }
        return
      }

      await new Promise(resolve => setTimeout(resolve, 100))
    }

    throw new PlcCommandError('Timeout: esito della richiesta non confermato')
  }
}
