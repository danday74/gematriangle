import { Component, Input, OnInit } from '@angular/core'
import { last, range } from 'lodash'

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})

export class TriangleComponent implements OnInit {
  @Input() rowCount = 1
  rows: Array<number[]> = []
  counters = 0
  perimeter = 0

  ngOnInit() {
    this.updateRows(this.rowCount)
  }

  updateRows(rowCount) {
    this.counters = 0
    this.perimeter = 0
    const rng = range(1, rowCount + 1)
    rng.forEach((row) => {
      if (row === 1) {
        this.perimeter += 1
      } else if (row === last(rng)) {
        this.perimeter += row
      } else {
        this.perimeter += 2
      }
      const r = range(1, row + 1)
      this.rows.push(r)
      this.counters += row
    })
  }
}
