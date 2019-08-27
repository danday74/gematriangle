import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { range } from 'lodash'
import { takeUntil } from 'rxjs/operators'
import { TrianglesService } from '../triangles.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { Counter } from './counter'
import { triangle } from '../../../utils/triangle'
import { TriangleCounterValueService } from './triangle-counter-value.service'
import { TriangleCounterValueMode } from './triangle-counter-value-mode.enum'

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})

export class TriangleComponent extends DestroyerComponent implements OnInit, OnChanges {

  @Input() rowCount = 1

  alignCenter = true
  mode: TriangleCounterValueMode
  rows: Array<Array<Counter>> = []

  constructor(private trianglesService: TrianglesService, private triangleCounterValueService: TriangleCounterValueService) {
    super()
  }

  ngOnInit() {

    this.mode = TriangleCounterValueMode.Genesis1v1Standard

    this.trianglesService.toolboxToggleAlign$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.alignCenter = !this.alignCenter
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
    counter.active = !counter.active
  }

  private addRow(row) {
    const counters: Array<Counter> = []
    const term = triangle.term(row - 1)
    for (let i = 1; i <= row; i++) {
      const counter = {active: false, selected: false, count: term + i, value: 0, pos: {row, col: i}}
      counter.value = this.triangleCounterValueService.getCounterValue(counter, this.mode)
      counters.push(counter)
    }
    this.rows.push(counters)
  }

  private removeRow() {
    this.rows.pop()
  }
}
