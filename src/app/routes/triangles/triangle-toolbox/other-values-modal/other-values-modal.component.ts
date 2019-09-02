import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-other-values-modal',
  templateUrl: './other-values-modal.component.html',
  styleUrls: ['./other-values-modal.component.scss']
})

export class OtherValuesModalComponent implements OnInit {

  @Output() done = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit() {}

  onCancel() {
    this.done.emit(false)
  }

  onApply() {
    this.done.emit(true)
  }
}
