import { precision } from './mathjs-precision'

export const appNumber = {
  isMultiple: (n, multiple) => {
    n = precision.bignumber(n)
    multiple = precision.bignumber(multiple)
    return n.mod(multiple).eq('0') ? n.dividedBy(multiple) : null
  }
}
