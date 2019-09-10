import { Component, EventEmitter, Input, Output } from '@angular/core'
import { debounce } from 'lodash'

@Component({
  selector: 'app-reusable-modal',
  templateUrl: './reusable-modal.component.html',
  styleUrls: ['./reusable-modal.component.scss']
})

export class ReusableModalComponent {
  @Input() display = false
  @Input() imgSrc: string
  @Input() modalTitle = 'Untitled'
  @Output() hide = new EventEmitter<boolean>()
  @Output() show = new EventEmitter<boolean>()

  constructor() {
    this.onHide = debounce(this.onHide, 300, {leading: true, trailing: false})
  }

  onShow() {
    this.show.next(true)
  }

  onHide() {
    this.hide.next(true)
  }
}
