import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { triangle } from '../../../utils/triangle'

@Component({
  selector: 'app-triangle-stats',
  templateUrl: './triangle-stats.component.html',
  styleUrls: ['./triangle-stats.component.scss']
})

export class TriangleStatsComponent implements OnInit, OnChanges {

  @Input() rowCount: number
  perimeter: number
  counters: number

  constructor() {}

  ngOnInit() {
    this.setPerimeter(this.rowCount)
    this.setCounters(this.rowCount)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rowCount && !changes.rowCount.firstChange) {
      this.setPerimeter(changes.rowCount.currentValue)
      this.setCounters(changes.rowCount.currentValue)
    }
  }

  private setPerimeter(rowCount) {
    this.perimeter = triangle.perimeter(rowCount)
  }

  private setCounters(rowCount) {
    this.counters = triangle.term(rowCount)
  }
}
