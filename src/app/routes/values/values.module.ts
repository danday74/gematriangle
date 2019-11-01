import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ValuesRoutingModule } from './values-routing.module'
import { ValuesComponent } from './values.component'
import { NumberModule } from '../../reusable/number/number.module'
import { DxDataGridModule } from 'devextreme-angular'
import { ButtonModule } from '../../reusable/button/button.module'

@NgModule({
  declarations: [
    ValuesComponent
  ],
  imports: [
    CommonModule,
    ValuesRoutingModule,
    NumberModule,
    DxDataGridModule,
    ButtonModule
  ]
})

export class ValuesModule {}
