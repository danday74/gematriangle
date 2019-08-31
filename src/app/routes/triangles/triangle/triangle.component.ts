import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { debounce, filter, flatten, range } from 'lodash'
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

    const storageAlignCenter = this.storageService.getItem('triangle-align-center')
    const storageShortLines = this.storageService.getItem('triangle-short-lines')
    const storageShowValues = this.storageService.getItem('triangle-show-values')
    this.alignCenter = storageAlignCenter != null ? storageAlignCenter : true
    this.showValues = storageShowValues != null ? storageShowValues : false
    this.shortLines = storageShortLines != null ? storageShortLines : true

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
        case TriangleToolboxMessage.ActivateStarOfDavid:
          console.log('ActivateStarOfDavid')
          break
        case TriangleToolboxMessage.ActivateTriangleCorners:
          console.log('ActivateTriangleCorners')
          break
        case TriangleToolboxMessage.ActivateTriangleMidpoints:
          console.log('ActivateTriangleMidpoints')
          break
        case TriangleToolboxMessage.ActivateTriangleMidpointsPlus:
          console.log('ActivateTriangleMidpointsPlus')
          break
        case TriangleToolboxMessage.ActivateTriangleCenter:
          console.log('ActivateTriangleCenter')
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
        case TriangleToolboxMessage.DrawLines:
          this.drawLines()
          break
        case TriangleToolboxMessage.EraseLines:
          console.log('eraseLines')
          break
        case TriangleToolboxMessage.SelectEven:
          this.selectMultiples(2, 0)
          break
        case TriangleToolboxMessage.SelectOdd:
          this.selectMultiples(2, 1)
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

  private drawLines() {
    const allCounters = flatten(this.rows)
    const counters = filter(allCounters, {active: true})
    const shortStandardPosAdjusts = [{row: 1, col: 1}, {row: 0, col: 1}, {row: 1, col: 0}]
    const longStandardPosAdjusts = [...shortStandardPosAdjusts, {row: -1, col: -1}, {row: 0, col: -1}, {row: -1, col: 0}]
    const posAdjusts = this.shortLines ? shortStandardPosAdjusts : longStandardPosAdjusts
    counters.forEach(counter => {
      posAdjusts.forEach(posAdjust => {
        const countersInLine = [counter]
        let found = false
        let finished = false
        let row = counter.pos.row
        let col = counter.pos.col
        while (!finished) {
          row += posAdjust.row
          col += posAdjust.col
          const nextCounter: Counter = this.getCounter(row, col)
          if (nextCounter) {
            countersInLine.push(nextCounter)
            if (nextCounter.active) {
              found = true
              if (this.shortLines) finished = true
            }
          } else {
            finished = true
          }
        }
        if (found) {
          countersInLine.forEach((counterInLine: Counter) => {
            counterInLine.color = this.color
          })
        }
      })
    })
    this.colorsChange()
  }

  private selectMultiples(multiple: number, offset: number) {
    const allCounters = flatten(this.rows)
    const counters = filter(allCounters, (counter: Counter) => {
      if (counter.value == null) return false
      return counter.value.minus(offset).mod(multiple).equals(0)
    })
    counters.forEach(counter => counter.color = this.color)
  }

  private clearActive() {
    const allCounters = flatten(this.rows)
    const counters = filter(allCounters, {active: true})
    counters.forEach(counter => {
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
        console.log('fill')
        break
    }
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
