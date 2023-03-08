/*
 * ET200MP
 */

// DI 32
class S7_521_1BL00_0AB0 {
  constructor (nr, bytes = []) {
    this.module = 'et200m32'
    this.nr = nr
    this.type = '6ES7 521-1BL00-0AB0'
    // this.bytes = bytes
    this.bytes = bytes.map(byte => ({
      bits: byte,
      label: byte[0].addr.slice(0, -2)
    }))
  }
}
// DI 16
class S7_521_1BH00_0AB0 {
  constructor (nr, bytes = []) {
    this.module = 'et200m16'
    this.nr = nr
    this.type = '6ES7 521-1BH00-0AB0'
    // this.bytes = bytes
    this.bytes = bytes.map(byte => ({
      bits: byte,
      label: byte[0].addr.slice(0, -2)
    }))
  }
}
// DO 32
class S7_522_1BL01_0AB0 {
  constructor (nr, bytes = []) {
    this.module = 'et200m32'
    this.nr = nr
    this.type = '6ES7 522-1BL01-0AB0'
    // this.bytes = bytes
    this.bytes = bytes.map(byte => ({
      bits: byte,
      label: byte[0].addr.slice(0, -2)
    }))
  }
}
// DO 16
class S7_522_1BH01_0AB0 {
  constructor (nr, bytes = []) {
    this.module = 'et200m16'
    this.nr = nr
    this.type = '6ES7 522-1BH01-0AB0'
    // this.bytes = bytes
    this.bytes = bytes.map(byte => ({
      bits: byte,
      label: byte[0].addr.slice(0, -2)
    }))
  }
}
// DI 16 / DO 16
class S7_523_1BL00_0AA0 {
  constructor (nr, bytes = []) {
    this.module = 'et200m32'
    this.nr = nr
    this.type = '6ES7 523-1BL00-0AA0'
    // this.bytes = bytes
    this.bytes = bytes.map(byte => ({
      bits: byte,
      label: byte[0].addr.slice(0, -2)
    }))
  }
}
// DI 16 Failsafe
class S7_526_1BH00_0AB0 {
  constructor (nr, bytes = []) {
    this.module = 'et200m16f'
    this.nr = nr
    this.type = '6ES7 526-1BH00-0AB0'
    // this.bytes = bytes
    this.bytes = bytes.map(byte => ({
      bits: byte,
      label: byte[0].addr.slice(0, -2)
    }))
  }
}
// DO 8 Failsafe
class S7_526_2BF00_0AB0 {
  constructor (nr, bytes = []) {
    this.module = 'et200m08f'
    this.nr = nr
    this.type = '6ES7 526-2BF00-0AB0'
    // this.bytes = bytes
    this.bytes = bytes.map(byte => ({
      bits: byte,
      label: byte[0].addr.slice(0, -2)
    }))
  }
}

/*
 * ET200SP
 */

// DI 8
class S7_131_6BF00_0BA0 {
  constructor (nr, bytes = []) {
    this.module = 'et200s8'
    this.nr = nr
    this.type = '131-6BF00-0BA0'
    // this.bytes = bytes
    this.bytes = [{ bits: bytes, label: bytes[0].addr.slice(0, -2) }]
  }
}
// DO 8
class S7_132_6BF00_0BA0 {
  constructor (nr, bytes = []) {
    this.module = 'et200s8'
    this.nr = nr
    this.type = '132-6BF00-0BA0'
    // this.bytes = bytes
    this.bytes = [{ bits: bytes, label: bytes[0].addr.slice(0, -2) }]
  }
}
// DI 16
class S7_131_6BH01_0BA0 {
  constructor (nr, bytes = []) {
    this.module = 'et200s16'
    this.nr = nr
    this.type = '131-6BH01-0BA0'
    // this.bytes = bytes
    this.bytes = bytes.map(byte => ({
      bits: byte,
      label: byte[0].addr.slice(0, -2)
    }))
  }
}
// DO 16
class S7_132_6BH01_0BA0 {
  constructor (nr, bytes = []) {
    this.module = 'et200s16'
    this.nr = nr
    this.type = '132-6BH01-0BA0'
    // this.bytes = bytes
    this.bytes = bytes.map(byte => ({
      bits: byte,
      label: byte[0].addr.slice(0, -2)
    }))
  }
}
// DI 8 Failsafe
class S7_136_6BA00_0CA0 {
  constructor (nr, bytes = []) {
    this.module = 'et200s8f'
    this.nr = nr
    this.type = '136-6BA00-0CA0'
    // this.bytes = bytes
    this.bytes = [{ bits: bytes, label: bytes[0].addr.slice(0, -2) }]
  }
}
// DO 8 Failsafe
class S7_136_6BD00_0CA0 {
  constructor (nr, bytes = []) {
    this.module = 'et200s8f'
    this.nr = nr
    this.type = '136-6BD00-0CA0'
    // this.bytes = bytes
    this.bytes = [{ bits: bytes, label: bytes[0].addr.slice(0, -2) }]
  }
}

module.exports = {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BL01_0AB0,
  S7_522_1BH01_0AB0,
  S7_523_1BL00_0AA0,
  S7_526_1BH00_0AB0,
  S7_526_2BF00_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0,
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0,
  S7_136_6BA00_0CA0,
  S7_136_6BD00_0CA0
}
