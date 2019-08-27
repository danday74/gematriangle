import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { range } from 'lodash'
import { takeUntil } from 'rxjs/operators'
import { TrianglesService } from '../triangles.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { Counter } from './counter'
import { triangle } from '../../../utils/triangle'
import { TriangleCounterValueService } from './triangle-counter-value.service'
import { TriangleCounterValues } from './triangle-counter-values.enum'
import { TriangleToolboxMessage } from '../triangle-toolbox/triangle-toolbox-message.enum'

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})

export class TriangleComponent extends DestroyerComponent implements OnInit, OnChanges {

  @Input() rowCount = 1

  alignCenter = true
  color: string
  mode: string
  counterValues: TriangleCounterValues

  rows: Array<Array<Counter>> = []

  constructor(private trianglesService: TrianglesService, private triangleCounterValueService: TriangleCounterValueService) {
    super()
  }

  ngOnInit() {
    this.trianglesService.triangleToolboxMessage$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((message) => {
      switch (message.name) {
        case TriangleToolboxMessage.ChangeColor:
          this.color = message.value
          break
        case TriangleToolboxMessage.ChangeCounterValues:
          this.counterValues = message.value
          break
        case TriangleToolboxMessage.ChangeMode:
          this.mode = message.value
          break
        case TriangleToolboxMessage.ToggleAlign:
          this.alignCenter = message.value
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
      }
      if (changes.rowCount.currentValue < changes.rowCount.previousValue) {
        for (let i = changes.rowCount.previousValue - 1; i >= changes.rowCount.currentValue; i--) this.removeRow()
      }
    }
  }

  onCounterClick(counter) {
    switch (this.mode) {
      case 'paint':
        counter.selected = this.color
        break
      case 'line':
        counter.active = !counter.active
        break
      case 'fill':
        console.log('TODO fill')
        break
    }
  }

  private addRow(row) {
    const counters: Array<Counter> = []
    const term = triangle.term(row - 1)
    for (let i = 1; i <= row; i++) {
      const counter = {active: false, selected: false, count: term + i, value: 0, pos: {row, col: i}}
      counter.value = this.triangleCounterValueService.getCounterValue(counter, this.counterValues)
      counters.push(counter)
    }
    this.rows.push(counters)
  }

  private removeRow() {
    this.rows.pop()
  }
}
