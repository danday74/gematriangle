import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { Decimal } from 'decimal.js'
import { shapeTriangle } from '../../../utils/shape-triangle'
import { precision } from 'src/app/utils/mathjs-precision'
import { NavbarService } from 'src/app/base/navbar/navbar.service'
import { StorageService } from '../../../services/storage/storage.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { filter, takeUntil } from 'rxjs/operators'
import { NavbarMessage } from '../../../base/navbar/navbar-message.enum'
import { appNumber } from 'src/app/utils/app-number'

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

export class NumberComponent extends DestroyerComponent implements OnInit, OnChanges {

  @Input() n: number | Decimal
  @Input() source: string
  @Input() excluded = []
  @Input() prefix = ''

  breakdown: boolean
  num: Decimal
  flipped: Decimal

  activeProps: Array<Prop>
  props: Array<Prop>

  constructor(private navbarService: NavbarService, private storageService: StorageService /*, private toastr: ToastrService */) {
    super()
  }

  ngOnInit() {
    const storageBreakdown = this.storageService.getItem('breakdown')
    this.breakdown = storageBreakdown != null ? storageBreakdown : true
    this.num = precision.bignumber(this.n)
    this.checkNumber(this.num)

    this.navbarService.navbarMessage$.pipe(
      takeUntil(this.unsubscribe$),
      filter(message => message.name === NavbarMessage.ToggleBreakdown)
    ).subscribe((message) => {
      this.breakdown = message.value
      this.checkNumber(this.num)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.n && !changes.n.firstChange) {
      this.num = precision.bignumber(changes.n.currentValue)
      this.checkNumber(this.num)
    }
  }

  checkNumber(num: Decimal) {
    if (this.breakdown) {
      this.props = [
        {name: '37', value: appNumber.isMultiple(this.num, 37), multiple: true, flipped: null},
        {name: '73', value: appNumber.isMultiple(this.num, 73), multiple: true, flipped: null},
        {name: 'T', value: shapeTriangle.isTerm(num), multiple: false, flipped: null}
      ]
      this.activeProps = this.props.filter(prop => prop.value != null && !this.excluded.includes(prop.name)).map(prop => {
        prop.flipped = prop.value.plus(this.reverseNumber(prop.value))
        return prop
      })
    }

    this.flipped = num.plus(this.reverseNumber(num))

    // const special = numberData[this.num.toFixed()]
    // this.alert(special, this.source)
    // const flippedSpecial = numberData[this.flipped.toFixed()]
    // this.alert(flippedSpecial, this.source + ' flipped')
  }

  // private alert(special, source) {
  //   if (special) {
  //     const title = `<strong>${special.number}</strong> for <strong>${source}</strong>`
  //     const msg = special.reason
  //     this.toastr.info(title + '<br>' + msg)
  //   }
  // }

  private reverseNumber(num: Decimal) {
    return num.toFixed().split('').reverse().join('')
  }

  onClick(num: Decimal) {
    if (num) {
      console.log('onClick', num.toFixed())
    }
  }
}
