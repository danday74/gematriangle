import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { numberData } from '../../../../data/number.data'
import { ToastrService } from 'ngx-toastr'
import { Decimal } from 'decimal.js'
import { bignumber } from 'mathjs'
import { triangle } from '../../../utils/triangle'

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})

export class NumberComponent implements OnInit, OnChanges {

  @Input() num: number | Decimal
  @Input() source: string

  props: {
    37: Decimal,
    73: Decimal,
    T: Decimal
    flipped: Decimal
    special: any,
  }

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.num = bignumber(this.num)
    this.checkNumber(this.num)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.num && !changes.num.firstChange) {
      this.checkNumber(bignumber(changes.num.currentValue))
    }
  }

  checkNumber(num: Decimal) {
    this.props = {
      37: num.mod(37).eq(0) ? num.dividedBy(37) : null,
      73: num.mod(73).eq(0) ? num.dividedBy(73) : null,
      T: triangle.isTerm(num),
      flipped: num.plus(this.reverseNumber(num)),
      special: numberData[num.toString()] || null
    }
    if (this.props.special) {
      const title = `${this.props.special.number} for ${this.source}`
      const msg = this.props.special.reason
      this.toastr.info(msg, title)
    }
  }

  private reverseNumber(num: Decimal) {
    return num.toFixed().split('').reverse().join('')
  }

  onClick(num: Decimal) {
    if (num) {
      console.log('onClick', num.toFixed())
    }
  }
}
