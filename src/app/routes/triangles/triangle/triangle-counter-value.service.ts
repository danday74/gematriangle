import { Injectable } from '@angular/core'
import { TriangleCounterValues } from './triangle-counter-values.enum'
import { Counter } from './counter'
import { memoize } from 'lodash'
import { pi } from '../../../../data/pi-1m'
import Decimal from 'decimal.js'
import { precision } from '../../../utils/mathjs-precision'

@Injectable({providedIn: 'root'})
export class TriangleCounterValueService {

  private pascalPrecisionProblem = false

  constructor() {
    this.getPascalValue = memoize(this.getPascalValue, (pos) => `${pos.row}-${pos.col}`)
    this.getPiValue = memoize(this.getPiValue)
    this.getPiDecimalsValue = memoize(this.getPiDecimalsValue)
  }

  getCounterValue(counter: Counter, mode: TriangleCounterValues): Decimal {
    switch (mode) {
      case TriangleCounterValues.None:
        return null
      case TriangleCounterValues.Count:
        return precision.bignumber(counter.count)
      case TriangleCounterValues.Genesis1v1Standard:
        return this.getGenesis1v1StandardValue(counter.count)
      case TriangleCounterValues.Genesis1v1Ordinal:
        return this.getGenesis1v1OrdinalValue(counter.count)
      case TriangleCounterValues.Pascal:
        return this.getPascalValue(counter.pos)
      case TriangleCounterValues.Pi:
        return this.getPiValue(counter.count)
      case TriangleCounterValues.PiDecimals:
        return this.getPiDecimalsValue(counter.count)
    }
  }

  getTotalValue(counters: Array<Counter>) {
    let sum = precision.bignumber('0')
    let allNull = true
    counters.forEach(counter => {
      if (counter.value != null) allNull = false
      sum = sum.plus(counter.value || precision.bignumber('0'))
    })
    return allNull ? null : sum
  }

  private getGenesis1v1StandardValue(count) {
    count--
    const values = [2, 200, 1, 300, 10, 400, 2, 200, 1, 1, 30, 5, 10, 40, 1, 400, 5, 300, 40, 10, 40, 6, 1, 400, 5, 1, 200, 90]
    return count < values.length ? precision.bignumber(values[count]) : null
  }

  private getGenesis1v1OrdinalValue(count) {
    count--
    const values = [2, 20, 1, 21, 10, 22, 2, 20, 1, 1, 12, 5, 10, 13, 1, 22, 5, 21, 13, 10, 13, 6, 1, 22, 5, 1, 20, 18]
    return count < values.length ? precision.bignumber(values[count]) : null
  }

  private getPascalValue(pos) {
    if (pos.row === pos.col || pos.col === 1) {
      return precision.bignumber('1')
    } else {
      const left = this.getPascalValue({row: pos.row - 1, col: pos.col - 1})
      const right = this.getPascalValue({row: pos.row - 1, col: pos.col})
      const total = left.plus(right)
      if (!this.pascalPrecisionProblem) {
        const lastLeftDigit = left.toFixed()[left.toFixed().length - 1]
        const lastRightDigit = right.toFixed()[right.toFixed().length - 1]
        const temp = (parseInt(lastLeftDigit, 10) + parseInt(lastRightDigit, 10)).toString()
        const lastDigit = temp[temp.length - 1]
        if (!total.toFixed().endsWith(lastDigit)) {
          this.pascalPrecisionProblem = true
          const msg = `pascal precision problem\nleft=${left.toFixed()}\nright=${right.toFixed()}\ntotal=${total.toFixed()}\n`
            + `at ${JSON.stringify(pos)}`
          console.error(msg)
        }
      }
      return total
    }
  }

  private getPiValue(count) {
    return this.getPiDecimalsValue(count - 1)
  }

  private getPiDecimalsValue(count) {
    const pie = parseInt(pi[count], 10)
    if (pie == null) throw Error('Cannot get PI position ' + count)
    return precision.bignumber(pie)
  }
}
