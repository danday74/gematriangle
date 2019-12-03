import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ValuesRoutingModule } from './values-routing.module'
import { ValuesComponent } from './values.component'
import { NumberModule } from '../../reusable/number/number.module'
import { DxDataGridModule } from 'devextreme-angular'
import { ButtonModule } from '../../reusable/button/button.module'
import { BibleModule } from '../../reusable/bible/bible.module'
import { ValuesBuilderComponent } from './values-builder/values-builder.component'
import { SelectionSummaryComponent } from './selection-summary/selection-summary.component'
import { ValuesDatagridComponent } from './values-datagrid/values-datagrid.component'

@NgModule({
  declarations: [
    ValuesComponent,
    ValuesBuilderComponent,
    SelectionSummaryComponent,
    ValuesDatagridComponent
  ],
  imports: [
    CommonModule,
    ValuesRoutingModule,
    NumberModule,
    DxDataGridModule,
    ButtonModule,
    BibleModule
  ]
})

export class ValuesModule {}
