import { Component, EventEmitter, Input, Output } from '@angular/core'
import { debounce } from 'lodash'
import * as $ from 'jquery'

@Component({
  selector: 'app-reusable-modal',
  templateUrl: './reusable-modal.component.html',
  styleUrls: ['./reusable-modal.component.scss']
})

export class ReusableModalComponent {

  @Input() width = 500
  @Input() display = false
  @Input() imgSrc: string
  @Input() modalTitle = 'Untitled'
  @Output() hide = new EventEmitter<boolean>()
  @Output() shower = new EventEmitter<boolean>()

  constructor() {
    this.onHide = debounce(this.onHide, 300, {leading: true, trailing: false})
  }

  onShow() {
    this.shower.next(true)
    this.center()
  }

  onHide() {
    this.hide.next(true)
  }

  private center() {
    setTimeout(() => {
      const el = $('.reusable-modal')[0]
      const pos = $(el).position()
      $(el).css({top: pos.top + 'px', left: (pos.left - 8) + 'px'})
    }, 300)
  }
}
