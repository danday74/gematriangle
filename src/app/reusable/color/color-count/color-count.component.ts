import { Component, OnInit } from '@angular/core'
import { ColorService } from '../color.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { takeUntil } from 'rxjs/operators'
import { filter, forOwn } from 'lodash'
import { TriangleCounterValueService } from '../../../routes/triangles/triangle/triangle-counter-value.service'

@Component({
  selector: 'app-color-count',
  templateUrl: './color-count.component.html',
  styleUrls: ['./color-count.component.scss']
})

export class ColorCountComponent extends DestroyerComponent implements OnInit {

  colors: any
  activeColors = []

  constructor(private colorService: ColorService, private triangleCounterValueService: TriangleCounterValueService) {
    super()
  }

  ngOnInit() {
    this.colorService.colorsChange$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(allCounters => {
      this.colors = this.getColors(allCounters)
      this.activeColors = []
      forOwn(this.colors, (v, k) => {
        if (v.count) this.activeColors.push(k)
      })
    })
  }

  private getColors(allCounters) {
    const colors = ['appGrey', 'appRed', 'appPink', 'appGreen', 'appOrange', 'appBlue']
    return colors.reduce((acc, color) => {
      acc[color] = {}
      const counters = filter(allCounters, {color})
      acc[color].count = counters.length
      acc[color].value = this.triangleCounterValueService.getTotalValue(counters)
      return acc
    }, {})
  }
}
