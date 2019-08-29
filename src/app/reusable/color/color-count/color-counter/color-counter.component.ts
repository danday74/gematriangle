import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-color-counter',
  templateUrl: './color-counter.component.html',
  styleUrls: ['./color-counter.component.scss']
})

export class ColorCounterComponent {
  @Input() color: string
  @Input() count: number
  @Input() value: number

  numberClick(num: number) {
    console.log('numberClick', num)
  }
}
