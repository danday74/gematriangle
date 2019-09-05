import { Injectable } from '@angular/core'
import { TriangleCounterValues } from './triangle-counter-values.enum'
import { bignumber, factorial } from 'mathjs'
import { Counter } from './counter'
import { cloneDeep, memoize } from 'lodash'
import { pi } from '../../../../data/pi-1m'
import Decimal from 'decimal.js'

@Injectable({providedIn: 'root'})
export class TriangleCounterValueService {

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
        return bignumber(counter.count)
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
    let sum = bignumber(0)
    let allNull = true
    counters.forEach(counter => {
      if (counter.value != null) allNull = false
      sum = sum.plus(counter.value || bignumber(0))
    })
    return allNull ? null : sum
  }

  private getGenesis1v1StandardValue(count) {
    count--
    const values = [2, 200, 1, 300, 10, 400, 2, 200, 1, 1, 30, 5, 10, 40, 1, 400, 5, 300, 40, 10, 40, 6, 1, 400, 5, 1, 200, 90]
    return count < values.length ? bignumber(values[count]) : null
  }

  private getGenesis1v1OrdinalValue(count) {
    count--
    const values = [2, 20, 1, 21, 10, 22, 2, 20, 1, 1, 12, 5, 10, 13, 1, 22, 5, 21, 13, 10, 13, 6, 1, 22, 5, 1, 20, 18]
    return count < values.length ? bignumber(values[count]) : null
  }

  private getPascalValue(pos) {
    pos = cloneDeep(pos)
    pos.row -= 1
    pos.col -= 1
    const facRow: any = factorial(bignumber(pos.row))
    const facCol: any = factorial(bignumber(pos.col))
    const facRowCol: any = factorial(bignumber(pos.row - pos.col))
    const bottom = facCol.times(facRowCol)
    return facRow.dividedBy(bottom).round()
  }

  private getPiValue(count) {
    return this.getPiDecimalsValue(count - 1)
  }

  private getPiDecimalsValue(count) {
    const pie = parseInt(pi[count], 10)
    if (pie == null) throw Error('Cannot get PI position ' + count)
    return bignumber(pie)
  }
}
