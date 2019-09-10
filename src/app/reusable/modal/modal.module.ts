import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReusableModalComponent } from './reusable-modal/reusable-modal.component'
import { DialogModule } from 'primeng/dialog'

@NgModule({
  declarations: [
    ReusableModalComponent
  ],
  exports: [
    ReusableModalComponent
  ],
  imports: [
    CommonModule,
    DialogModule
  ]
})

export class ModalModule {}
