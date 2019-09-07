import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { Decimal } from 'decimal.js'
import { ordinals, standards } from './hebrew-letters'

@Component({
  selector: 'app-counter-value',
  templateUrl: './counter-value.component.html',
  styleUrls: ['./counter-value.component.scss']
})

export class CounterValueComponent implements OnChanges, OnInit {
  @Input() hebrewLetter: string
  @Input() value: Decimal

  hebrewChar: string

  constructor() {}

  ngOnInit() {
    this.hebrewChar = this.getHebrewChar()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hebrewLetter && !changes.hebrewLetter.firstChange || changes.value && !changes.value.firstChange) {
      this.hebrewChar = this.getHebrewChar()
    }
  }

  private getHebrewChar() {
    if (this.hebrewLetter === 'off' || this.value == null) {
      return null
    } else if (this.hebrewLetter === 'standard') return standards[this.value.toFixed()]
    return ordinals[this.value.toFixed()]
  }
}
