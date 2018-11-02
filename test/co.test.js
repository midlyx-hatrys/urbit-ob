const BN = require('bn.js')
const { expect } = require('chai');
const jsc = require('jsverify')
const {
  patp,
  patp2hex,
  patp2dec,
  hex2patp,
  patq,
  patq2hex,
  patq2dec,
  hex2patq,
  clan,
  sein
  } = require('../src/internal/co')

const patps = jsc.uint32.smap(
  num => patp(num),
  pp => parseInt(patp2dec(pp))
)

const patqs = jsc.uint32.smap(
  num => patq(num),
  pq => parseInt(patq2dec(pq))
)

describe('patp, etc.', () => {
  it('patp2dec matches expected reference values', () => {
    expect(patp2dec('~zod')).to.equal('0')
    expect(patp2dec('~lex')).to.equal('200')
    expect(patp2dec('~binzod')).to.equal('512')
    expect(patp2dec('~samzod')).to.equal('1024')
    expect(patp2dec('~poldec-tonteg')).to.equal('9896704')
    expect(patp2dec('~nidsut-tomdun')).to.equal('15663360')
  })

  it('patp matches expected reference values', () => {
    expect(patp('0')).to.equal('~zod')
    expect(patp('200')).to.equal('~lex')
    expect(patp('512')).to.equal('~binzod')
    expect(patp('1024')).to.equal('~samzod')
    expect(patp('9896704')).to.equal('~poldec-tonteg')
    expect(patp('15663360')).to.equal('~nidsut-tomdun')
  })

  it('large patp values match expected reference values', () => {
    expect(hex2patp('7468697320697320736f6d6520766572792068696768207175616c69747920656e74726f7079'))
    .to.equal('~divmes-davset-holdet--sallun-salpel-taswet-holtex--watmeb-tarlun-picdet-magmes--holter-dacruc-timdet-divtud--holwet-maldut-padpel-sivtud')
  })

  it('patp and patp2dec are inverses', () => {
    let iso0 = jsc.forall(jsc.uint32, num =>
      parseInt(patp2dec(patp(num))) === num
    )

    let iso1 = jsc.forall(patps, pp =>
      patp(patp2dec(pp)) === pp
    )

    jsc.assert(iso0)
    jsc.assert(iso1)
  })

  it('patp2hex and hex2patp are inverses', () => {
    let iso0 = jsc.forall(jsc.uint32, num =>
      parseInt(patp2hex(hex2patp(num.toString(16))), 16) === num
    )

    let iso1 = jsc.forall(patps, pp =>
      hex2patp(patp2hex(pp)) === pp
    )

    jsc.assert(iso0)
    jsc.assert(iso1)
  })
})

describe('patq, etc.', () => {
  it('patq2dec matches expected reference values', () => {
    expect(patq2dec('~zod')).to.equal('0')
    expect(patq2dec('~binzod')).to.equal('512')
    expect(patq2dec('~samzod')).to.equal('1024')
    expect(patq2dec('~poldec-tonteg')).to.equal('4016240379')
    expect(patq2dec('~nidsut-tomdun')).to.equal('1208402137')
  })

  it('patq matches expected reference values', () => {
    expect(patq('0')).to.equal('~zod')
    expect(patq('512')).to.equal('~binzod')
    expect(patq('1024')).to.equal('~samzod')
    expect(patq('4016240379')).to.equal('~poldec-tonteg')
    expect(patq('1208402137')).to.equal('~nidsut-tomdun')
  })

  it('large patq values match expected reference values', () => {
    expect(hex2patq('01010101010101010102')).to.equal('~marnec-marnec-marnec-marnec-marbud')
    expect(hex2patq('6d7920617765736f6d65207572626974207469636b65742c206920616d20736f206c75636b79'))
    .to.equal('~tastud-holruc-sidwet-salpel-taswet-holdeg-paddec-davdut-holdut-davwex-balwet-divwen-holdet-holruc-taslun-salpel-holtux-dacwex-baltud')
  })

  it('patq and patq2dec are inverses', () => {
    let iso0 = jsc.forall(jsc.uint32, num =>
      parseInt(patq2dec(patq(num))) === num
    )

    let iso1 = jsc.forall(patqs, pp =>
      patq(patq2dec(pp)) === pp
    )

    jsc.assert(iso0)
    jsc.assert(iso1)
  })

  it('patq2hex and hex2patq are inverses', () => {
    let iso0 = jsc.forall(jsc.uint32, num =>
      parseInt(patq2hex(hex2patq(num.toString(16))), 16) === num
    )

    let iso1 = jsc.forall(patqs, pp =>
      hex2patq(patq2hex(pp)) === pp
    )

    jsc.assert(iso0)
    jsc.assert(iso1)
  })
})

describe('clan/sein', () => {
  it('clan works as expected', () => {
    expect(clan('~zod')).to.equal('galaxy')
    expect(clan('~fes')).to.equal('galaxy')
    expect(clan('~marzod')).to.equal('star')
    expect(clan('~fassec')).to.equal('star')
    expect(clan('~dacsem-fipwex')).to.equal('planet')
    expect(clan('~fidnum-rosbyt')).to.equal('planet')
    expect(clan('~doznec-bannux-nopfen')).to.equal('moon')
    expect(clan('~dozryt--wolmep-racmyl-padpeg-mocryp')).to.equal('comet')
  })

  it('sein works as expected', () => {
    expect(sein('~zod')).to.equal('~zod')
    expect(sein('~nec')).to.equal('~nec')
    expect(sein('~rep')).to.equal('~rep')
    expect(sein('~marzod')).to.equal('~zod')
    expect(sein('~marnec')).to.equal('~nec')
    expect(sein('~fassec')).to.equal('~sec')
    expect(sein('~nidsut-tomdun')).to.equal('~marzod')
    expect(sein('~sansym-ribnux')).to.equal('~marnec')
  })
})

