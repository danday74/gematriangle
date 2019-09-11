import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ValuesRoutingModule } from './values-routing.module'
import { ValuesComponent } from './values.component'

@NgModule({
  declarations: [
    ValuesComponent
  ],
  imports: [
    CommonModule,
    ValuesRoutingModule
  ]
})
export class ValuesModule {}
