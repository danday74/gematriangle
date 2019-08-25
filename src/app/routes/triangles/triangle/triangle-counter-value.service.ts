import { Injectable } from '@angular/core'
import { TriangleCounterValueMode } from './triangle-counter-value-mode.enum'
import { factorial } from 'mathjs'
import { Counter } from './counter'
import { cloneDeep } from 'lodash'
import { pi } from '../../../../data/pi-1m'

@Injectable({providedIn: 'root'})
export class TriangleCounterValueService {

  getCounterValue(counter: Counter, mode: TriangleCounterValueMode) {
    switch (mode) {
      case TriangleCounterValueMode.Pascal:
        return this.getPascalValue(counter.pos)
      case TriangleCounterValueMode.Pi:
        return this.getPiValue(counter.count)
      case TriangleCounterValueMode.PiDecimals:
        return this.getPiDecimalsValue(counter.count)
    }
  }

  private getPascalValue(pos) {
    pos = cloneDeep(pos)
    pos.row -= 1
    pos.col -= 1
    const facRow: any = factorial(pos.row)
    const facCol: any = factorial(pos.col)
    const facRowCol: any = factorial(pos.row - pos.col)
    return facRow / (facCol * facRowCol)
  }

  private getPiValue(count) {
    return this.getPiDecimalsValue(count - 1)
  }

  private getPiDecimalsValue(count) {
    const pie = parseInt(pi[count], 10)
    if (pie == null) throw Error('Cannot get PI position ' + (count))
    return pie
  }
}
