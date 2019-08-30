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

  @Input() n: number | Decimal
  @Input() source: string

  num: Decimal

  props: {
    37: Decimal,
    73: Decimal,
    T: Decimal
    flipped: Decimal
  }

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.num = bignumber(this.n)
    this.checkNumber(this.num)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.n && !changes.n.firstChange) {
      this.num = bignumber(changes.n.currentValue)
      this.checkNumber(this.num)
    }
  }

  checkNumber(num: Decimal) {
    this.props = {
      37: num.mod(37).eq(0) ? num.dividedBy(37) : null,
      73: num.mod(73).eq(0) ? num.dividedBy(73) : null,
      T: triangle.isTerm(num),
      flipped: num.plus(this.reverseNumber(num))
    }
    const special = numberData[num.toFixed()]
    this.alert(special, this.source)
    const flippedSpecial = numberData[this.props.flipped.toFixed()]
    this.alert(flippedSpecial, this.source + ' flipped')
  }

  private alert(special, source) {
    if (special) {
      const title = `<strong>${special.number}</strong> for <strong>${source}</strong>`
      const msg = special.reason
      this.toastr.info(title + '<br>' + msg)
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
