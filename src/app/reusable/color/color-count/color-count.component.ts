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
    const appGrey = filter(allCounters, {color: 'appGrey'})
    const appRed = filter(allCounters, {color: 'appRed'})
    const appPink = filter(allCounters, {color: 'appPink'})
    const appGreen = filter(allCounters, {color: 'appGreen'})
    const appOrange = filter(allCounters, {color: 'appOrange'})
    const appBlue = filter(allCounters, {color: 'appBlue'})
    const appGreyValue = this.getValueSum(appGrey)
    const appRedValue = this.getValueSum(appRed)
    const appPinkValue = this.getValueSum(appPink)
    const appGreenValue = this.getValueSum(appGreen)
    const appOrangeValue = this.getValueSum(appOrange)
    const appBlueValue = this.getValueSum(appBlue)

    return {
      appGrey: {
        count: appGrey.length,
        value: appGreyValue
      },
      appRed: {
        count: appRed.length,
        value: appRedValue
      },
      appPink: {
        count: appPink.length,
        value: appPinkValue
      },
      appGreen: {
        count: appGreen.length,
        value: appGreenValue
      },
      appOrange: {
        count: appOrange.length,
        value: appOrangeValue
      },
      appBlue: {
        count: appBlue.length,
        value: appBlueValue
      }
    }
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
