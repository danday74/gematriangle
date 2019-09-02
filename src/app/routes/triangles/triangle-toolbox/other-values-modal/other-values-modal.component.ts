import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-other-values-modal',
  templateUrl: './other-values-modal.component.html',
  styleUrls: ['./other-values-modal.component.scss']
})

export class OtherValuesModalComponent implements OnInit {
  @Output() done = new EventEmitter<{ done: boolean, multiple: number, offset: number }>()
  action: string
  multiple = 3
  offset = 0

  constructor() {}

  ngOnInit() {}

  onCancel() {
    this.done.emit({done: false, multiple: null, offset: null})
  }

  onApply() {
    this.done.emit({done: true, multiple: this.multiple, offset: this.offset})
  }
}
