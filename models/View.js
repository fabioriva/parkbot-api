import { SilomatTraveling, SilomatHoisting, SilomatCentering } from './Motor.js'

export class Main {
  constructor (drives, motors) {
    this.drives = drives
    this.motors = motors
    this.name = 'view-main'
  }
}

export class Garage {
  constructor (drives, motors, panel, sensors) {
    this.drives = drives
    this.motors = motors
    this.name = 'view-garage'
    this.panel = panel
    this.sensors = sensors
  }
}

export class Silomat {
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
