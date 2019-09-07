import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { numberData } from '../../../../data/number.data'
import { ToastrService } from 'ngx-toastr'
import { Decimal } from 'decimal.js'
import { triangle } from '../../../utils/triangle'
import { precision } from 'src/app/utils/mathjs-precision'
import { filter } from 'lodash'

interface Prop {
  name: string
  value: Decimal
  multiple: boolean
  flipped: Decimal
}

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})

export class NumberComponent implements OnInit, OnChanges {

  @Input() n: number | Decimal
  @Input() source: string
  @Input() excluded = []

  num: Decimal
  flipped: Decimal

  activeProps: Array<Prop>
  props: Array<Prop>

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.num = precision.bignumber(this.n)
    this.checkNumber(this.num)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.n && !changes.n.firstChange) {
      this.num = precision.bignumber(changes.n.currentValue)
      this.checkNumber(this.num)
    }
  }

  checkNumber(num: Decimal) {
    this.props = [
      {name: '37', value: num.mod(37).eq(0) ? num.dividedBy(37) : null, multiple: true, flipped: null},
      {name: '73', value: num.mod(73).eq(0) ? num.dividedBy(73) : null, multiple: true, flipped: null},
      {name: 'T', value: triangle.isTerm(num), multiple: false, flipped: null}
    ]
    this.activeProps = this.props.filter(prop => prop.value != null && !this.excluded.includes(prop.name)).map(prop => {
      prop.flipped = prop.value.plus(this.reverseNumber(prop.value))
      return prop
    })

    this.flipped = num.plus(this.reverseNumber(num))

    const special = numberData[this.num.toFixed()]
    this.alert(special, this.source)
    const flippedSpecial = numberData[this.flipped.toFixed()]
    this.alert(flippedSpecial, this.source + ' flipped')
  }

  private alert(special, source) {
    // if (special) {
    //   const title = `<strong>${special.number}</strong> for <strong>${source}</strong>`
    //   const msg = special.reason
    //   this.toastr.info(title + '<br>' + msg)
    // }
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
