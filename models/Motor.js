class Motor {
  constructor (id, name, encoders = [], inputs = [], outputs = [], str = [], status = '') {
    this.id = id
    this.name = name
    this.encoders = encoders
    this.inputs = inputs
    this.outputs = outputs
    this.io = inputs.concat(outputs)
    this.str = str
    this.status = status
  }

  update () {
    const [P1, P2] = this.inputs
    const [RA, RB] = this.outputs
    // console.log(P1, P2, RA, RB)
    if (RA.status) {
      this.status = this.str[0]
    } else if (RB.status) {
      this.status = this.str[1]
    } else if (P1.status) {
      this.status = this.str[2]
    } else if (P2.status) {
      this.status = this.str[3]
    } else {
      this.status = 'mov-idle' // this.str[5]
    }
    const { id, name, encoders, inputs, outputs, status } = this
    return { id, name, encoders, io: inputs.concat(outputs), status }
  }
}

class MotorVFD {
  constructor (id, name, drive, encoders = [], inputs = [], outputs = [], str = [], status = '') {
    this.id = id
    this.name = name
    this.drive = drive
    this.encoders = encoders
    this.inputs = inputs
    this.outputs = outputs
    this.io = inputs.concat(outputs)
    this.str = str
    this.status = status
  }

  update () {
    // console.log(this.drive)
    if (this.drive.speed > 0) {
      this.status = this.str[0]
    } else if (this.drive.speed < 0) {
      this.status = this.str[1]
    } else {
      this.status = 'mov-idle'
    }
    const { id, name, drive, encoders, inputs, outputs, status } = this
    return { id, name, drive, encoders, io: inputs.concat(outputs), status }
  }
}

module.exports = { Motor, MotorVFD }
