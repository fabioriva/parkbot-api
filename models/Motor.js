class Motor {
  // #id
  #inputs
  #outputs
  constructor (id, inputs = [], outputs = []) {
    this.id = id
    this.#inputs = inputs
    this.#outputs = outputs
    this.io = inputs.concat(outputs)
    this.run = { status: false }
  }

  update_ (messages) {
    const [P1, P2] = this.#inputs
    const [RA, RB, KC] = this.#outputs
    // console.log(this.name.key, RA, RB, KC)
    if (RA.status) {
      this.message = messages[0]
    } else if (RB.status) {
      this.message = messages[1]
    } else if (P1.status) {
      this.message = messages[2]
    } else if (P2.status) {
      this.message = messages[3]
    } else {
      this.message = 'mov-idle'
    }
    if ((RA.status || RB.status) && (KC !== undefined ? KC.status : true)) {
      this.run.status = 1
    } else {
      this.run.status = 0
    }
    // const { name, inputs, outputs, message } = this
    // return { name, io: inputs.concat(outputs), message }
  }
}

class Barrier extends Motor {
  static messages = ['mov-close', 'mov-open', 'pos-closed', 'pos-opened']
  constructor (id, inputs, outputs, run) {
    super(id, inputs, outputs, run)
    this.name = { key: 'mot-barrier', query: { id } }
  }

  update () {
    this.update_(Barrier.messages)
  }
}

class Door extends Motor {
  static messages = ['mov-close', 'mov-open', 'pos-closed', 'pos-opened']
  constructor (id, inputs, outputs, run) {
    super(id, inputs, outputs, run)
    this.name = { key: 'mot-door', query: { id } }
  }

  update () {
    this.update_(Door.messages)
  }
}

class Flap extends Motor {
  static messages = ['mov-up', 'mov-down', 'pos-high', 'pos-low']
  constructor (id, inputs, outputs, run) {
    super(id, inputs, outputs, run)
    this.name = { key: 'mot-flap', query: { id } }
  }

  update () {
    this.update_(Flap.messages)
  }
}

class Lock extends Motor {
  static messages = ['mov-lock', 'mov-unlock', 'pos-locked', 'pos-unlocked']
  constructor (id, inputs, outputs, run) {
    super(id, inputs, outputs, run)
    this.name = { key: 'mot-lock', query: { id } }
  }

  update () {
    this.update_(Lock.messages)
  }
}

class MotorVFD {
  #drive
  #inputs
  #outputs
  #positions
  constructor (id, drive, encoders = [], inputs = [], outputs = [], positions = [], run) {
    if (run === undefined) {
      throw new Error('run is undefined')
    }
    this.id = id
    this.#drive = drive
    this.encoders = encoders
    this.#inputs = inputs
    this.#outputs = outputs
    this.#positions = positions
    this.io = inputs.concat(outputs)
    this.run = run
  }

  update_ (messages) {
    // console.log(this.name, this.run)
    const [P1, P2] = this.#positions
    const RA = this.run.status && this.#drive.speed > 0
    const RB = this.run.status && this.#drive.speed < 0
    if (RA) {
      this.message = messages[0]
    } else if (RB) {
      this.message = messages[1]
    } else if (P1 !== undefined && P1.status) {
      this.message = messages[2]
    } else if (P2 !== undefined && P2.status) {
      this.message = messages[3]
    } else {
      this.message = 'mov-idle'
    }
    if (RA || RB) {
      this.run.status = 1
    } else {
      this.run.status = 0
    }
    // const { name, encoders, inputs, outputs, message } = this
    // return { name, encoders, io: inputs.concat(outputs), message }
  }
}

class DoorVFD extends MotorVFD {
  static messages = ['mov-open', 'mov-close', 'pos-closed', 'pos-opened']
  constructor (id, drive, encoders = [], inputs = [], outputs = [], positions, run) {
    super(id, drive, encoders, inputs, outputs, positions, run)
    this.name = { key: 'mot-door', query: { id } }
  }

  update () {
    this.update_(Door.messages)
  }
}

class Hoisting extends MotorVFD {
  static messages = ['mov-up', 'mov-down']
  constructor (id, drive, encoders = [], inputs = [], outputs = [], positions = [], run) {
    super(id, drive, encoders, inputs, outputs, positions, run)
    this.name = { key: 'mot-hoisting', query: { id } }
  }

  update () {
    this.update_(Hoisting.messages)
  }
}

class Rotation extends MotorVFD {
  static messages = ['mov-clockwise', 'mov-anticlock']
  constructor (id, drive, encoders = [], inputs = [], outputs = [], positions = [], run) {
    super(id, drive, encoders, inputs, outputs, positions, run)
    this.name = { key: 'mot-rotation', query: { id } }
  }

  update () {
    this.update_(Rotation.messages)
  }
}

class Traveling extends MotorVFD {
  static messages = ['mov-right', 'mov-left']
  constructor (id, drive, encoders = [], inputs = [], outputs = [], positions = [], run) {
    super(id, drive, encoders, inputs, outputs, positions, run)
    this.name = { key: 'mot-traveling', query: { id } }
  }

  update () {
    this.update_(Traveling.messages)
  }
}

// class Silomat {
//   constructor (drive, encoders = [], sensors = [], thermics = []) {
//     const [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH] = sensors
//     const [AF8, MTC] = thermics
//     this.drives = [drive]
//     // this.encoders = encoders
//     this.motors = [
//       new SilomatTraveling(
//         0,
//         drive,
//         encoders,
//         [RMV, RMH, AF8],
//         [T2, KCS, KCH],
//         [],
//         T2
//       ),
//       new SilomatHoisting(
//         0,
//         [RES, REH, MTC],
//         [TRA, TRB, KCS]
//       ),
//       new SilomatCentering(
//         'v',
//         [RCV, REAV, MTC],
//         [TRA, TRB, KCV]
//       ),
//       new SilomatCentering(
//         'h',
//         [RCH, REAH, MTC],
//         [TRA, TRB, KCH]
//       )]
//     this.name = 'view-sil'
//     this.sensors = sensors
//   }
// }

class SilomatTraveling extends MotorVFD {
  // static messages = ['sil-mov-stall', 'sil-mov-home']
  static messages = ['sil-mov-fwd', 'sil-mov-bwd']
  constructor (id, drive, encoders = [], inputs = [], outputs = [], positions = [], run) {
    super(id, drive, encoders, inputs, outputs, positions, run)
    this.name = { key: 'mot-traveling', query: { id } }
  }

  update () {
    this.update_(SilomatTraveling.messages)
  }
}

class SilomatHoisting extends Motor {
  static messages = ['sil-mov-up', 'sil-mov-down', 'sil-pos-low', 'sil-pos-high']
  constructor (id, inputs, outputs, run) {
    super(id, inputs, outputs, run)
    this.name = { key: 'mot-hoisting', query: { id } }
  }

  update () {
    this.update_(SilomatHoisting.messages)
  }
}

class SilomatCentering extends Motor {
  static messages = ['sil-mov-open', 'sil-mov-close', 'sil-pos-closed', 'sil-pos-opened']
  constructor (id, inputs, outputs, run) {
    super(id, inputs, outputs, run)
    this.name = id === 'h' ? { key: 'mot-center-h' } : { key: 'mot-center-v' }
  }

  update () {
    this.update_(SilomatCentering.messages)
  }
}

// class Garage {
//   static messages = ['vg-vacant', 'vg-busy', 'vg-car']
//   constructor (data = []) {
//     this.data = data
//     this.name = 'view-garage'
//   }

//   update () {
//     const [FPE, FRE, FLA, FLP, FDL, FDR] = this.data
//     const vacant = FPE.status && !FRE.status && FLA.status && FLP.status && FDL.status && FDR.status
//     const car = !FPE.status && FRE.status && FLA.status && FLP.status && FDL.status && FDR.status
//     if (vacant) {
//       this.message = Garage.messages[0]
//     } else if (car) {
//       this.message = Garage.messages[2]
//     } else {
//       this.message = Garage.messages[1]
//     }
//     // console.log(this.name, this.message)
//   }
// }

// class Panel {
//   static messages = ['lp-1', 'lp-2', 'lp-3', 'lp-4', 'lp-5']
//   constructor (data = []) {
//     this.data = data
//     this.name = 'view-panel'
//   }

//   update () {
//     const [L1, L2, L3, L4, L5] = this.data
//     if (L1.status) {
//       this.message = Panel.messages[0]
//     } else if (L2.status) {
//       this.message = Panel.messages[1]
//     } else if (L3.status) {
//       this.message = Panel.messages[2]
//     } else if (L4.status) {
//       this.message = Panel.messages[3]
//     } else if (L5.status) {
//       this.message = Panel.messages[4]
//     } else {
//       this.message = 'lp-off'
//     }
//     console.log(this.name, this.message)
//   }
// }

export {
  Barrier,
  Door,
  DoorVFD,
  Flap,
  Hoisting,
  Lock,
  Rotation,
  SilomatCentering,
  SilomatHoisting,
  SilomatTraveling,
  Traveling
  // Garage,
  // Panel
}
