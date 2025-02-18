import util from 'util'

class Exit {
  constructor (id, name, card = 0, status = 0) {
    this.id = id
    this.name = name
    this.card = card
    this.status = status
  }

  update (buffer) {
    this.card = buffer.readInt16BE(0)
    this.status = buffer.readInt16BE(2)
  }
}

const updateExits = util.promisify(
  (start, buffer, offset, exits, callback) => {
    let byte = start
    for (let i = 0; i < exits.length; i++) {
      exits[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, exits)
  }
)

class ExitScreen {
  constructor (id, name, running = [], waiting = []) {
    this.id = id
    this.name = name
    this.running = running
    this.waiting = waiting
  }

  update (exits, queue) {
    this.running = []
    exits.forEach(item => {
      if (item.status === 1) this.running.push({ card: item.card, mesg: 'exit-mesg-1', name: item.name })
      if (item.status === 2) this.running.push({ card: item.card, mesg: 'exit-mesg-2', name: item.name })
    })
    this.waiting = []
    queue.forEach(item => {
      if (item.card !== 0) this.waiting.push({ id: item.id, card: item.card })
    })
  }
}

class GarageScreen {
  constructor (id, name, L1 = false, L2 = false, L3 = false, L4 = false, L5 = false, occupancy = []) {
    this.id = id
    this.name = name
    this.L1 = L1
    this.L2 = L2
    this.L3 = L3
    this.L4 = L4
    this.L5 = L5
    this.occupancy = occupancy
  }

  update (buffer) {
    this.L1 = buffer.readInt16BE(0) !== 0
    this.L2 = buffer.readInt16BE(2) !== 0
    this.L3 = buffer.readInt16BE(4)
    this.L4 = buffer.readInt16BE(6) !== 0
    this.L5 = buffer.readInt16BE(8) !== 0
  }
}

const updateGarageScreens = util.promisify(
  (start, buffer, offset, screens, occupancy, callback) => {
    let byte = start
    for (let i = 0; i < screens.length; i++) {
      screens[i].update(buffer.slice(byte, byte + offset))
      screens[i].occupancy = occupancy
      byte += offset
    }
    callback(null, screens)
  }
)

class Occupancy {
  constructor (id, label, busy = 0, free = 0, total = 0) {
    this.id = id
    this.label = label
    this.busy = busy
    this.free = free
    this.total = total
  }

  update (buffer) {
    this.busy = buffer.readInt16BE(0)
    this.free = buffer.readInt16BE(2)
    this.total = buffer.readInt16BE(4)
  }
}

const updateOccupancy = util.promisify(
  (start, buffer, offset, occupancy, callback) => {
    let byte = start
    for (let i = 0; i < occupancy.length; i++) {
      occupancy[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, occupancy)
  }
)

export { Exit, updateExits, ExitScreen, GarageScreen, updateGarageScreens, Occupancy, updateOccupancy }
