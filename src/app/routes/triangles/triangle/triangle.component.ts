import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { compact, debounce, filter, find, flatten, range } from 'lodash'
import { takeUntil } from 'rxjs/operators'
import { TrianglesService } from '../triangles.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { Counter } from './counter'
import { triangle } from '../../../utils/triangle'
import { TriangleCounterValueService } from './triangle-counter-value.service'
import { TriangleCounterValues } from './triangle-counter-values.enum'
import { TriangleToolboxMessage } from '../triangle-toolbox/triangle-toolbox-message.enum'
import { ColorService } from '../../../reusable/color/color.service'
import { bignumber } from 'mathjs'
import { StorageService } from '../../../services/storage.service'

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})

export class TriangleComponent extends DestroyerComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rowCount = 1

  posAdjusts: any

  lineDirection: string
  alignCenter: boolean
  shortLines: boolean
  showValues: boolean
  color: string
  mode: string
  counterValues: TriangleCounterValues
  countersWaitingToSpin = []
  spinInterval

  rows: Array<Array<Counter>> = []

  constructor(private trianglesService: TrianglesService, private triangleCounterValueService: TriangleCounterValueService,
              private colorService: ColorService, private storageService: StorageService) {
    super()
    this.colorsChange = debounce(this.colorsChange, 300, {leading: false, trailing: true})
  }

  ngOnInit() {

    this.posAdjusts = {
      reach1: [{row: 1, col: 1}, {row: 0, col: 1}, {row: 1, col: 0}],
      reach2: [{row: 1, col: -1}, {row: 2, col: 1}, {row: 1, col: 2}]
    }

    const storageAlignCenter = this.storageService.getItem('triangle-align-center')
    const storageShortLines = this.storageService.getItem('triangle-short-lines')
    const storageShowValues = this.storageService.getItem('triangle-show-values')
    this.alignCenter = storageAlignCenter != null ? storageAlignCenter : true
    this.showValues = storageShowValues != null ? storageShowValues : false
    this.shortLines = storageShortLines != null ? storageShortLines : true

    this.lineDirection = this.storageService.getItem('triangle-line-direction') || 'left-right'

    this.spinInterval = setInterval(() => {
      this.countersWaitingToSpin.forEach(counter => {
        if (counter.active) counter.spin = true
      })
      this.countersWaitingToSpin = []
    }, 2000) // interval must be same as .spin duration

    this.trianglesService.triangleToolboxMessage$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((message) => {
      switch (message.name) {
        case TriangleToolboxMessage.StarOfDavid:
          this.starOfDavid()
          break
        case TriangleToolboxMessage.TriangleCorners:
          this.corners()
          break
        case TriangleToolboxMessage.TriangleMidpoints:
          this.midpoints()
          break
        case TriangleToolboxMessage.TriangleMidpointsPlus:
          this.midpoints(true)
          break
        case TriangleToolboxMessage.TriangleCenter:
          this.center()
          break
        case TriangleToolboxMessage.TriangleSide:
          this.side(message.value)
          break
        case TriangleToolboxMessage.ChangeColor:
          this.color = message.value
          break
        case TriangleToolboxMessage.ChangeCounterValues:
          this.counterValues = message.value
          this.updateCounterValues()
          break
        case TriangleToolboxMessage.ChangeMode:
          this.clearActive()
          this.mode = message.value
          break
        case TriangleToolboxMessage.ClearActive:
          this.clearActive()
          break
        case TriangleToolboxMessage.ClearAll:
          this.clearAll()
          break
        case TriangleToolboxMessage.ClearColor:
          this.clearColor()
          break
        case TriangleToolboxMessage.CycleLineDirections:
          this.lineDirection = message.value
          break
        case TriangleToolboxMessage.DrawLines:
          this.drawLines(this.color)
          break
        case TriangleToolboxMessage.EraseLines:
          this.drawLines('appGrey')
          break
        case TriangleToolboxMessage.SelectEven:
          this.selectMultiples(2, 0)
          break
        case TriangleToolboxMessage.SelectOdd:
          this.selectMultiples(2, 1)
          break
        case TriangleToolboxMessage.SelectOther:
          console.log('SelectOther', message.value)
          // this.selectMultiples(2, 1)
          break
        case TriangleToolboxMessage.ToggleAlign:
          this.alignCenter = message.value
          break
        case TriangleToolboxMessage.ToggleLineLength:
          this.shortLines = message.value
          break
        case TriangleToolboxMessage.ToggleShowValues:
          this.showValues = message.value
          break
      }
    })

    const rng = range(1, this.rowCount + 1)
    rng.forEach((row) => {
      this.addRow(row)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rowCount && !changes.rowCount.firstChange) {
      if (changes.rowCount.currentValue > changes.rowCount.previousValue) {
        for (let i = changes.rowCount.previousValue + 1; i <= changes.rowCount.currentValue; i++) this.addRow(i)
        this.colorsChange()
      }
      if (changes.rowCount.currentValue < changes.rowCount.previousValue) {
        for (let i = changes.rowCount.previousValue - 1; i >= changes.rowCount.currentValue; i--) this.removeRow()
        this.colorsChange()
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.spinInterval)
    super.ngOnDestroy()
  }

  private drawLines(color) {
    const allCounters = flatten(this.rows)
    const counters = filter(allCounters, {active: true})
    let posAdjusts

    if (this.lineDirection === 'left-right') posAdjusts = this.posAdjusts.reach1
    else if (this.lineDirection === 'up-down') posAdjusts = this.posAdjusts.reach2
    else posAdjusts = [...this.posAdjusts.reach1, ...this.posAdjusts.reach2]

    counters.forEach(counter => {
      posAdjusts.forEach(posAdjust => {
        const countersInLine = [counter]
        let found = false
        let finished = false
        let row = counter.pos.row
        let col = counter.pos.col
        let multiplier = 1
        while (!finished) {
          row += posAdjust.row * multiplier
          col += posAdjust.col * multiplier
          const nextCounter: Counter = this.getCounter(row, col)
          if (nextCounter) {
            countersInLine.push(nextCounter)
            if (nextCounter.active) {
              found = true
              if (this.shortLines) finished = true
            }
          } else {
            if (this.shortLines) finished = true
            if (!this.shortLines && multiplier === -1) finished = true
            if (!this.shortLines && multiplier === 1) {
              row = counter.pos.row
              col = counter.pos.col
              multiplier = -1
            }
          }
        }
        if (found) countersInLine.forEach((counterInLine: Counter) => counterInLine.color = color)
      })
    })
    this.colorsChange()
  }

  private corners() {
    const positions = [{row: 1, col: 1}, {row: this.rowCount, col: 1}, {row: this.rowCount, col: this.rowCount}]
    const counters = this.getCounters(positions)
    this.complete(counters)
  }

  private midpoints(plus = false) {
    let positions = []
    const isOdd = this.rowCount % 2 === 1
    if (isOdd) {
      const middle = (this.rowCount + 1) / 2
      positions = [{row: middle, col: 1}, {row: middle, col: middle}, {row: this.rowCount, col: middle}]
    } else {
      const middle1 = this.rowCount / 2
      const middle2 = middle1 + 1
      positions = [
        {row: middle1, col: 1}, {row: middle1, col: middle1}, {row: this.rowCount, col: middle1},
        {row: middle2, col: 1}, {row: middle2, col: middle2}, {row: this.rowCount, col: middle2}
      ]
      if (plus) positions = [{row: middle2, col: 2}, {row: middle2, col: middle2 - 1}, {row: this.rowCount - 1, col: middle2 - 1}]
    }
    const counters = this.getCounters(positions)
    this.complete(counters)
  }

  private center() {
    const row = Math.floor(((this.rowCount + 2) / 3) - 1) * 2 + 1
    const topCenter = {row, col: (this.rows[row - 1].length + 1) / 2}
    let positions = [topCenter]
    const step = ((this.rowCount + 2) % 3) + 1
    if (step > 1) positions = [...positions, {row: topCenter.row + 1, col: topCenter.col}, {row: topCenter.row + 1, col: topCenter.col + 1}]
    if (step > 2) {
      positions = [
        ...positions,
        {row: topCenter.row + 2, col: topCenter.col},
        {row: topCenter.row + 2, col: topCenter.col + 1},
        {row: topCenter.row + 2, col: topCenter.col + 2}]
    }
    const counters = this.getCounters(positions)
    this.complete(counters)
  }

  private side(side) {
    const allCounters = flatten(this.rows)
    const counters = filter(allCounters, (counter: Counter) => {
      switch (side) {
        case 'left':
          return counter.pos.col === 1
        case 'right':
          return counter.pos.row === counter.pos.col
        case 'base':
          return counter.pos.row === this.rowCount
        case 'all':
          return counter.pos.col === 1 || counter.pos.row === counter.pos.col || counter.pos.row === this.rowCount
      }
    })
    this.complete(counters)
  }

  private starOfDavid() {
    const middle = (this.rowCount + 1) / 2
    const gap = (this.rowCount - 1) / 6
    const bottomCenter = {row: this.rowCount, col: middle}
    const topCenter = {row: bottomCenter.row - gap * 4, col: bottomCenter.col - gap * 2}
    const positions = [bottomCenter, topCenter]

    if (this.mode === 'line') {
      for (let i = 1; i <= 3; i++) {
        positions.push({row: bottomCenter.row - i * gap, col: bottomCenter.col})
        positions.push({row: bottomCenter.row - i * gap, col: bottomCenter.col - i * gap})
        positions.push({row: topCenter.row + i * gap, col: topCenter.col})
        positions.push({row: topCenter.row + i * gap, col: topCenter.col + i * gap})
      }
    } else {
      for (let i = 1; i <= 3 * gap - 1; i++) {
        if (i < gap || i >= gap * 2) {
          positions.push({row: bottomCenter.row - i, col: bottomCenter.col})
          positions.push({row: bottomCenter.row - i, col: bottomCenter.col - i})
          positions.push({row: topCenter.row + i, col: topCenter.col})
          positions.push({row: topCenter.row + i, col: topCenter.col + i})
        }
      }
      const horizontalTop = {row: middle, col: 1}
      const horizontalBottom = {row: middle + gap * 2, col: gap + 1}
      positions.push(horizontalTop)
      positions.push(horizontalBottom)
      for (let i = 1; i <= 3 * gap; i++) {
        if (i <= gap || i >= gap * 2) {
          positions.push({row: horizontalTop.row, col: horizontalTop.col + i})
          positions.push({row: horizontalBottom.row, col: horizontalBottom.col + i})
        }
      }
    }
    const counters = this.getCounters(positions)
    this.complete(counters)
  }

  private complete(counters) {
    if (this.mode === 'line') this.completeActivation(counters)
    else this.completePainting(counters)
  }

  private completeActivation(counters) {
    const notActivated = find(counters, (counter: Counter) => counter.active !== true)
    counters.forEach((counter: Counter) => {
      this.setCounterActivation(counter, notActivated)
    })
  }

  private completePainting(counters) {
    const notPainted = find(counters, (counter: Counter) => counter.color !== this.color)
    counters.forEach((counter: Counter) => counter.color = notPainted ? this.color : 'appGrey')
    this.colorsChange()
  }

  private selectMultiples(multiple: number, offset: number) {
    const allCounters = flatten(this.rows)
    const counters = filter(allCounters, (counter: Counter) => {
      if (counter.value == null) return false
      return counter.value.minus(offset).mod(multiple).equals(0)
    })
    this.completePainting(counters)
  }

  private clearActive() {
    const allCounters = flatten(this.rows)
    const counters = filter(allCounters, {active: true})
    counters.forEach((counter: Counter) => {
      this.setCounterActivation(counter, false)
    })
  }

  private clearAll() {
    const allCounters = flatten(this.rows)
    const counters = filter(allCounters, counter => counter.color !== 'appGrey')
    counters.forEach(counter => counter.color = 'appGrey')
    this.colorsChange()
  }

  private clearColor() {
    const allCounters = flatten(this.rows)
    const counters = filter(allCounters, counter => counter.color === this.color)
    counters.forEach(counter => counter.color = 'appGrey')
    this.colorsChange()
  }

  private updateCounterValues() {
    const allCounters = flatten(this.rows)
    allCounters.forEach(counter => {
      counter.value = this.triangleCounterValueService.getCounterValue(counter, this.counterValues)
    })
    this.colorsChange()
  }

  onCounterClick(counter) {
    counter.spin = false
    switch (this.mode) {
      case 'paint':
        counter.color = counter.color === this.color ? 'appGrey' : this.color
        this.colorsChange()
        break
      case 'line':
        this.setCounterActivation(counter, !counter.active)
        break
      case 'fill':
        this.fill(counter)
        break
    }
  }

  private fill(counter) {
    const replaceColor = counter.color
    const replaceWithColor = this.color

    if (replaceColor !== replaceWithColor) {
      let finished = false
      let aliveCountersNow = []
      let aliveCountersNext = [counter]
      const deadCounters = [counter]

      counter.color = replaceWithColor
      while (!finished) {
        aliveCountersNow = aliveCountersNext
        aliveCountersNext = []
        aliveCountersNow.forEach(aliveCounter => {
          const adjacentPositions = [
            {row: aliveCounter.pos.row - 1, col: aliveCounter.pos.col - 1}, {row: aliveCounter.pos.row - 1, col: aliveCounter.pos.col},
            {row: aliveCounter.pos.row, col: aliveCounter.pos.col - 1}, {row: aliveCounter.pos.row, col: aliveCounter.pos.col + 1},
            {row: aliveCounter.pos.row + 1, col: aliveCounter.pos.col}, {row: aliveCounter.pos.row + 1, col: aliveCounter.pos.col + 1}
          ]
          const adjacentCounters = this.getCountersSafe(adjacentPositions)
          adjacentCounters.forEach((adjacentCounter: Counter) => {
            if (!deadCounters.includes(adjacentCounter)) {
              deadCounters.push(adjacentCounter)
              if (adjacentCounter.color === replaceColor) {
                aliveCountersNext.push(adjacentCounter)
                adjacentCounter.color = replaceWithColor
              }
            }
          })
        })
        if (!aliveCountersNext.length) finished = true
      }
      this.colorsChange()
    }
  }

  private getCounters(positions) {
    return positions.map(pos => this.getCounter(pos.row, pos.col))
  }

  private getCountersSafe(positions) {
    const counters = this.getCounters(positions)
    return compact(counters)
  }

  private getCounter(row, col) {
    try {
      return this.rows[row - 1][col - 1]
    } catch (err) {
      return null
    }
  }

  private colorsChange() {
    const allCounters = flatten(this.rows)
    this.colorService.onColorsChange(allCounters)
  }

  private setCounterActivation(counter: Counter, activate: boolean) {
    if (activate) {
      counter.active = true
      this.countersWaitingToSpin.push(counter)
    } else {
      counter.active = false
      counter.spin = false
    }
  }

  private addRow(row) {
    const counters: Array<Counter> = []
    const term = triangle.term(row - 1)
    for (let i = 1; i <= row; i++) {
      const counter: Counter = {active: false, color: 'appGrey', count: term + i, value: bignumber(0), pos: {row, col: i}, spin: false}
      counter.value = this.triangleCounterValueService.getCounterValue(counter, this.counterValues)
      counters.push(counter)
    }
    this.rows.push(counters)
  }

  private removeRow() {
    this.rows.pop()
  }
}
