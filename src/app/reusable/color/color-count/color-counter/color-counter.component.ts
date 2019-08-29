import { Component, Input } from '@angular/core'
import Decimal from 'decimal.js'

@Component({
  selector: 'app-color-counter',
  templateUrl: './color-counter.component.html',
  styleUrls: ['./color-counter.component.scss']
})

export class ColorCounterComponent {
  @Input() color: string
  @Input() count: any
  @Input() value: Decimal

  numberClick(num: number) {
    console.log('numberClick', num)
  }
}
