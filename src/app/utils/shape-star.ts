import { precision } from './mathjs-precision'

export const shapeStar = {
  term: n => {
    n = precision.bignumber(n)
    const part1 = n.times('6')
    const part2 = n.minus('1')
    return part1.times(part2).plus('1')
  }
}
