import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TrianglesRoutingModule } from './triangles-routing.module'
import { TrianglesComponent } from './triangles.component'
import { TriangleComponent } from './triangle/triangle.component'
import { TriangleToolboxComponent } from './triangle-toolbox/triangle-toolbox.component'
import { TriangleStatsComponent } from './triangle-stats/triangle-stats.component'
import { NumberModule } from '../../reusable/number/number.module'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { SpinnerModule } from 'primeng/primeng'
import { BaseModule } from '../../base/base.module'
import { ColorModule } from '../../reusable/color/color.module'
import { OtherValuesModalComponent } from './triangle-toolbox/other-values-modal/other-values-modal.component'
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import { ModalModule } from '../../reusable/modal/modal.module'
import { DirectivesModule } from '../../directives/directives.module'
import { CounterValueComponent } from './triangle/counter-value/counter-value.component'

@NgModule({
  declarations: [
    TrianglesComponent,
    TriangleComponent,
    TriangleToolboxComponent,
    TriangleStatsComponent,
    OtherValuesModalComponent,
    CounterValueComponent
  ],
  imports: [
    CommonModule,
    TrianglesRoutingModule,
    NgbModalModule,
    NumberModule,
    DropdownModule,
    FormsModule,
    SpinnerModule,
    BaseModule,
    ColorModule,
    ModalModule,
    DirectivesModule
  ]
})

export class TrianglesModule {}
