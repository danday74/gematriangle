import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-reusable-modal',
  templateUrl: './reusable-modal.component.html',
  styleUrls: ['./reusable-modal.component.scss']
})

export class ReusableModalComponent implements OnInit {
  @Input() modalTitle = 'Untitled'
  @Input() imgSrc: string
  @Output() cancel = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit() {}

  onCancelClick() {
    this.cancel.emit(true)
  }
}
modal.module.ts
