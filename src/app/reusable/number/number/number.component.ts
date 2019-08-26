import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { numberData } from '../../../../data/number.data'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})

export class NumberComponent implements OnInit, OnChanges {

  @Input() num: number
  @Input() source: string
  @Input() rowCount: number

  props: {
    37: number,
    73: number,
    T: number,
    flipped: number,
    special: any,
    text: string,
    count: number
  }

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.checkNumber(this.num)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.num && !changes.num.firstChange) {
      this.checkNumber(changes.num.currentValue)
    }
  }

  checkNumber(num: number) {
    this.props = {
      37: num % 37 === 0 ? num / 37 : null,
      73: num % 73 === 0 ? num / 73 : null,
      T: this.getTriangleTerm(num),
      flipped: this.num + this.reverseNumber(num),
      special: numberData[num] || null,
      text: null,
      count: 0
    }
    const textAndCount = this.getTextAndCount()
    this.props.text = textAndCount.text
    this.props.count = textAndCount.count
    if (this.props.special) {
      const msg = `T${this.rowCount} special number found ${this.props.special.number} for ${this.source} ... ${this.props.special.reason}`
      this.toastr.info(msg)
    }
  }

  getTriangleTerm(num: number) {
    const x = num * Math.sqrt(num * 8 + 1) - 1 / 2
    const intX = Math.round(x)
    return x === intX ? intX : null
  }

  getTextAndCount() {
    let text = ''
    let count = 0
    if (this.props[37] != null) {
      text += `37 x ${this.props[37]}, `
      count++
    }
    if (this.props[73] != null) {
      text += `73 x ${this.props[73]}, `
      count++
    }
    if (this.props.T) {
      text += `T${this.props.T}, `
      count++
    }
    if (this.props.special) {
      text += `special = ${this.props.special.reason}, `
      count++
    }
    text += `flipped = ${this.props.flipped}, `
    text = text.substring(0, text.length - 2)
    return {text, count}
  }

  private reverseNumber(num) {
    return parseInt(num.toString().split('').reverse().join(''), 10)
  }
}
