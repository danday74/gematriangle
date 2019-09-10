import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-other-values-modal',
  templateUrl: './other-values-modal.component.html',
  styleUrls: ['./other-values-modal.component.scss']
})

export class OtherValuesModalComponent {
  @Input() action: string
  @Input() display = false
  @Output() hide = new EventEmitter<any>()

  multiple: number
  offset: number

  onApply() {
    this.hide.next({multiple: this.multiple, offset: this.offset})
  }

  onCancel() {
    this.hide.next(null)
  }

  onHide() {
    this.hide.next(null)
  }

  onShow() {
    this.multiple = 3
    this.offset = 0
  }
}
