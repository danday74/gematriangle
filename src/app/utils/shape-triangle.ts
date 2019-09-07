import { precision } from './mathjs-precision'

export const shapeTriangle = {
  term: n => {
    n = precision.bignumber(n)
    const part = n.plus('1').dividedBy('2')
    return n.times(part)
  },
  isTerm: n => {
    n = precision.bignumber(n)
    const x = n.times('8').plus('1').sqrt().minus('1').div('2')
    const intX = x.round()
    return x.eq(intX) ? intX : null
  },
  perimeter: n => {
    n = precision.bignumber(n)
    return n.gt('1') ? n.times('3').minus('3') : precision.bignumber('1')
  },
  housesStarOfDavid: n => {
    n = precision.bignumber(n)
    return n.mod('6').eq('1') ? n.plus('5').dividedBy('6') : null
  },
  housesCenteredTriangle: n => {
    n = precision.bignumber(n)
    return n.mod('3').eq('1') ? n.plus('2').dividedBy('3') : null
  }
}
