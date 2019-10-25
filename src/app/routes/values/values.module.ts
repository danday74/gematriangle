import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ValuesRoutingModule } from './values-routing.module'
import { ValuesComponent } from './values.component'
import { NumberModule } from '../../reusable/number/number.module'

@NgModule({
  declarations: [
    ValuesComponent
  ],
  imports: [
    CommonModule,
    ValuesRoutingModule,
    NumberModule
  ]
})
export class ValuesModule {}
