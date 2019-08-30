import { Component, Input, OnInit } from '@angular/core'
import Decimal from 'decimal.js'

@Component({
  selector: 'app-color-counter',
  templateUrl: './color-counter.component.html',
  styleUrls: ['./color-counter.component.scss']
})

export class ColorCounterComponent implements OnInit {

  @Input() color: string
  @Input() count: any
  @Input() value: Decimal

  colorText: string

  ngOnInit() {
    this.colorText = this.color.replace('app', '').toLowerCase()
  }
}
