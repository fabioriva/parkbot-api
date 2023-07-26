const { SilomatTraveling, SilomatHoisting, SilomatCentering } = require('./Motor')

class Main {
  constructor (drives, motors, panel, sensors) {
    this.drives = drives
    this.motors = motors
    this.name = 'view-main'
  }
}

class Garage {
  constructor (drives, motors, panel, sensors) {
    this.drives = drives
    this.motors = motors
    this.name = 'view-garage'
    this.panel = panel
    this.sensors = sensors
  }
}

class Silomat {
  constructor (drive, encoders = [], sensors = [], thermics = []) {
    const [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH] = sensors
    const [AF8, MTC] = thermics
    this.drives = [drive]
    // this.encoders = encoders
    this.motors = [
      new SilomatTraveling(
        0,
        drive,
        encoders,
        [RMV, RMH, AF8],
        [T2, KCS, KCH],
        [],
        T2
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
    this.name = 'view-sil'
    this.sensors = sensors
  }
}

// class DirectionalPanel {
//   static messages = ['lp-1', 'lp-2', 'lp-3', 'lp-4', 'lp-5']
//   constructor (L1, L2, L3, L4, L5) {
//     this.L1 = L1
//     this.L2 = L2
//     this.L3 = L3
//     this.L4 = L4
//     this.L5 = L5
//     this.name = 'directional-panel'
//   }

//   update () {
//     const [L1, L2, L3, L4, L5] = this.data
//     if (L1.status) {
//       this.message = DirectionalPanel.messages[0]
//     } else if (L2.status) {
//       this.message = DirectionalPanel.messages[1]
//     } else if (L3.status) {
//       this.message = DirectionalPanel.messages[2]
//     } else if (L4.status) {
//       this.message = DirectionalPanel.messages[3]
//     } else if (L5.status) {
//       this.message = DirectionalPanel.messages[4]
//     } else {
//       this.message = 'lp-off'
//     }
//   }
// }

module.exports = { Main, Garage, Silomat }
