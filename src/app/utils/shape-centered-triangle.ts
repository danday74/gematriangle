import { precision } from './mathjs-precision'

export const shapeCenteredTriangle = {
  term: n => {
    n = precision.bignumber(n).minus('1')
    const part1 = n.pow('2').times('3')
    const part2 = n.times('3')
    return part1.plus(part2).plus('2').dividedBy('2')
  }
}
