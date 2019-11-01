import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { Decimal } from 'decimal.js'
import { precision } from 'src/app/utils/mathjs-precision'
import { NavbarService } from 'src/app/base/navbar/navbar.service'
import { StorageService } from '../../../services/storage/storage.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { filter, takeUntil } from 'rxjs/operators'
import { NavbarMessage } from '../../../base/navbar/navbar-message.enum'
import { NumberService } from './number.service'
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

  constructor(private navbarService: NavbarService, private storageService: StorageService,
              private numberService: NumberService /*, private toastr: ToastrService */) {
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

  onClick(num: Decimal) {
    if (num) {
      console.log('onClick', num.toFixed())
    }
  }

  private checkNumber(num: Decimal) {
    if (this.breakdown) {
      this.activeProps = this.numberService.getActiveProps(num)
    }
    this.flipped = num.plus(appNumber.reverseNumber(num))
  }
}
