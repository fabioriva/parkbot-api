class Motor {
  constructor (id, inputs = [], outputs = [], message = '') {
    this.id = id
    // this.name = name
    this.inputs = inputs
    this.outputs = outputs
    this.io = inputs.concat(outputs)
    // this.messages = messages
    this.message = message
  }

  json () {
    const { name, inputs, outputs, message } = this
    return { ...{ name, io: inputs.concat(outputs), message } }
  }

  update () {
    // console.log(this.name, this.json())
    const [P1, P2] = this.inputs
    const [RA, RB] = this.outputs
    console.log(P1, P2, RA, RB)
    if (RA.status) {
      this.message = this.messages[0]
    } else if (RB.status) {
      this.message = this.messages[1]
    } else if (P1.status) {
      this.message = this.messages[2]
    } else if (P2.status) {
      this.message = this.messages[3]
    } else {
      this.message = 'mov-idle' // this.messages[5]
    }
    // const { id, name, inputs, outputs, message } = this
    // return { id, name, io: inputs.concat(outputs), message }
  }
}

class Barrier extends Motor {
  constructor (id, inputs = [], outputs = []) {
    super(id, inputs, outputs)
    this.messages = ['mov-close', 'mov-open', 'pos-closed', 'pos-opened']
    this.name = { key: 'mot-barrier', query: { id } }
  }
}

class Door extends Motor {
  constructor (id, inputs = [], outputs = []) {
    super(id, inputs, outputs)
    this.messages = ['mov-close', 'mov-open', 'pos-closed', 'pos-opened']
    this.name = { key: 'mot-door', query: { id } }
  }
}

class Flap extends Motor {
  constructor (id, inputs = [], outputs = []) {
    super(id, inputs, outputs)
    this.messages = ['mov-up', 'mov-down', 'pos-high', 'pos-low']
    this.name = { key: 'mot-flap', query: { id } }
  }
}

class Lock extends Motor {
  constructor (id, inputs = [], outputs = []) {
    super(id, inputs, outputs)
    this.messages = ['mov-lock', 'mov-unlock', 'pos-locked', 'pos-unlocked']
    this.name = { key: 'mot-lock', query: { id } }
  }
}

class MotorVFD {
  constructor (id, drive, encoders = [], inputs = [], outputs = [], message = '') {
    this.id = id
    // this.name = name
    this.drive = drive
    this.encoders = encoders
    this.inputs = inputs
    this.outputs = outputs
    this.io = inputs.concat(outputs)
    // this.messages = messages
    this.message = message
  }

  json () {
    // this.update()
    const { name, encoders, inputs, outputs, message } = this
    return { ...{ name, encoders, io: inputs.concat(outputs), message } }
  }

  update () {
    // console.log(this.name, this.messages, this.drive)
    if (this.drive.speed > 0) {
      this.message = this.messages[0]
    } else if (this.drive.speed < 0) {
      this.message = this.messages[1]
    } else {
      this.message = 'mov-idle'
    }
    // const { id, name, encoders, inputs, outputs, message } = this
    // return { id, name, encoders, io: inputs.concat(outputs), message }
  }
}

class Hoisting extends MotorVFD {
  constructor (id, name, drive, encoders = [], inputs = [], outputs = []) {
    super(id, name, drive, encoders, inputs, outputs)
    this.messages = ['mov-up', 'mov-down']
    this.name = { key: 'mot-hoisting', query: { id } }
  }
}

class Rotation extends MotorVFD {
  constructor (id, name, drive, encoders = [], inputs = [], outputs = []) {
    super(id, name, drive, encoders, inputs, outputs)
    this.messages = ['mov-clockwise', 'mov-anticlock']
    this.name = { key: 'mot-rotation', query: { id } }
  }
}

class Traveling extends MotorVFD {
  constructor (id, name, drive, encoders = [], inputs = [], outputs = []) {
    super(id, name, drive, encoders, inputs, outputs)
    this.messages = ['mov-right', 'mov-left']
    this.name = { key: 'mot-traveling', query: { id } }
  }
}

class Silomat {
  constructor (drive, encoders = [], sensors = [], thermics = []) {
    const [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH] = sensors
    const [AF8, MTC] = thermics
    // this.id = id
    // this.name = name
    this.drive = drive
    this.encoders = encoders
    this.inputs = [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH]
    this.outputs = [T2, TRA, TRB, KCS, KCV, KCH]
    // this.sensors = sensors
    // this.thermics = thermics
    this.motors = [
      new SilomatTraveling(
        0,
        drive,
        [],
        [RMV, RMH, AF8],
        [T2, KCS, KCH]
      ),
      new SilomatHoisting(
        0,
        [RES, REH, MTC],
        [TRA, TRB, KCS]
      ),
      new SilomatCentering(
        'v',
        [RCV, REAV, MTC],
        [TRA, TRB, KCV]
      ),
      new SilomatCentering(
        'h',
        [RCH, REAH, MTC],
        [TRA, TRB, KCH]
      )]
  }
}

class SilomatTraveling extends MotorVFD {
  constructor (id, name, drive, encoders = [], inputs = [], outputs = []) {
    super(id, name, drive, encoders, inputs, outputs)
    this.messages = ['sil-mov-stall', 'sil-mov-home']
    this.name = { key: 'mot-traveling', query: { id } }
  }
}

class SilomatHoisting extends Motor {
  constructor (id, inputs = [], outputs = []) {
    super(id, inputs, outputs)
    this.messages = ['sil-mov-up', 'sil-mov-down', 'sil-pos-low', 'sil-pos-high']
    this.name = { key: 'mot-hoisting', query: { id } }
  }
}

class SilomatCentering extends Motor {
  constructor (id, inputs = [], outputs = []) {
    super(id, inputs, outputs)
    this.messages = ['sil-mov-close', 'sil-mov-open', 'sil-pos-closed', 'sil-pos-opened']
    this.name = id === 'h' ? { key: 'mot-center-h' } : { key: 'mot-center-v' }
  }
}

module.exports = {
  // Motor,
  Barrier,
  Door,
  Flap,
  Lock,
  // MotorVFD,
  Hoisting,
  Rotation,
  Traveling,
  Silomat
  // SilomatTraveling,
  // SilomatCentering,
  // SilomatHoisting
}
