import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { range } from 'lodash'
import { takeUntil } from 'rxjs/operators'
import { TrianglesService } from '../triangles.service'
import { DestroyerComponent } from '../../../../utils/destroyer.component'

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})

export class TriangleComponent extends DestroyerComponent implements OnInit, OnChanges {

  @Input() rowCount = 1

  rows: Array<Array<{ active: boolean, selected: boolean, value: number, pos: { row: number, col: number } }>> = []
  alignCenter = true

  constructor(private trianglesService: TrianglesService) {
    super()
  }

  ngOnInit() {

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
      if (changes.rowCount.currentValue > changes.rowCount.previousValue) this.addRow(changes.rowCount.currentValue)
      if (changes.rowCount.currentValue < changes.rowCount.previousValue) this.removeRow()
    }
  }

  onCounterClick(counter) {
    counter.active = !counter.active
  }

  private addRow(row) {
    const counters: Array<{ active: boolean, selected: boolean, value: number, pos: { row: number, col: number } }> = []
    for (let i = 1; i <= row; i++) {
      counters.push({active: false, selected: false, value: 1, pos: {row, col: i}})
    }
    this.rows.push(counters)
  }

  private removeRow() {
    this.rows.pop()
  }
}
