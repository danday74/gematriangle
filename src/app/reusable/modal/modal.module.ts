import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableModalComponent } from './reusable-modal/reusable-modal.component';



@NgModule({
  declarations: [ReusableModalComponent],
  exports: [
    ReusableModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
