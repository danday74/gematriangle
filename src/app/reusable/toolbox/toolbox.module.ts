import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToolboxButtonComponent } from './toolbox-button/toolbox-button.component'

@NgModule({
  declarations: [ToolboxButtonComponent],
  exports: [
    ToolboxButtonComponent
  ],
  imports: [
    CommonModule
  ]
})

export class ToolboxModule {}
