import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { shapeTriangle } from '../../../utils/shape-triangle'
import { TrianglesService } from '../triangles.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { takeUntil } from 'rxjs/operators'
import Decimal from 'decimal.js'

@Component({
  selector: 'app-triangle-stats',
  templateUrl: './triangle-stats.component.html',
  styleUrls: ['./triangle-stats.component.scss']
})

export class TriangleStatsComponent extends DestroyerComponent implements OnInit, OnChanges {

  @Input() rowCount: number
  perimeter: number
  counters: number
  value: Decimal

  constructor(private trianglesService: TrianglesService) {
    super()
  }

  ngOnInit() {
    this.setPerimeter(this.rowCount)
    this.setCounters(this.rowCount)
    this.value = null

    this.trianglesService.totalValueUpdated$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.value = value
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rowCount && !changes.rowCount.firstChange) {
      this.setPerimeter(changes.rowCount.currentValue)
      this.setCounters(changes.rowCount.currentValue)
    }
  }

  onClick(rowCount) {
    console.log('rowCount', rowCount)
  }

  private setPerimeter(rowCount) {
    this.perimeter = shapeTriangle.perimeter(rowCount)
  }

  private setCounters(rowCount) {
    this.counters = shapeTriangle.term(rowCount)
  }
}
