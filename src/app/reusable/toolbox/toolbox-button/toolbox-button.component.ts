import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-toolbox-button',
  templateUrl: './toolbox-button.component.html',
  styleUrls: ['./toolbox-button.component.scss']
})

export class ToolboxButtonComponent {

  @Input() faIcon: string
  @Input() text: string
  @Input() help: string

  @Output() clicked = new EventEmitter<boolean>()

  onClick() {
    this.clicked.emit(true)
  }
}
