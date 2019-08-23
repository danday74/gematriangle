import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConstantsRoutingModule } from './constants-routing.module'
import { ConstantsComponent } from './constants.component'

@NgModule({
  declarations: [
    ConstantsComponent
  ],
  imports: [
    CommonModule,
    ConstantsRoutingModule
  ]
})

export class ConstantsModule {}
