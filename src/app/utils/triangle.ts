import Decimal from 'decimal.js'

export const triangle = {
  perimeter: n => n > 1 ? n * 3 - 3 : 1,
  isTerm: (n: Decimal) => {
    const x = n.times(8).plus(1).sqrt().minus(1).div(2)
    const intX = x.round()
    return x.eq(intX) ? intX : null
  },
  term: n => n * (n + 1) / 2,
  housesStarOfDavid: n => n % 6 === 1 ? (n + 5) / 6 : null
}
