import { Component, OnInit } from '@angular/core'
import { ColorService } from '../color.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { takeUntil } from 'rxjs/operators'
import { filter, forOwn } from 'lodash'
import { Counter } from '../../../routes/triangles/triangle/counter'
import { bignumber } from 'mathjs'

@Component({
  selector: 'app-color-count',
  templateUrl: './color-count.component.html',
  styleUrls: ['./color-count.component.scss']
})

export class ColorCountComponent extends DestroyerComponent implements OnInit {

  colors: any
  activeColors = []

  constructor(private colorService: ColorService) {
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
      acc[color].value = this.getValueSum(counters)
      return acc
    }, {})
  }

  private getValueSum(counters: Array<Counter>) {
    let sum = bignumber(0)
    let allNull = true
    counters.forEach(counter => {
      if (counter.value != null) allNull = false
      sum = sum.plus(counter.value || bignumber(0))
    })
    return allNull ? null : sum
  }
}
