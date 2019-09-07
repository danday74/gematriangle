import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TrianglesListRoutingModule } from './triangles-list-routing.module'
import { TrianglesListComponent } from './triangles-list.component'
import { NumberModule } from '../../reusable/number/number.module'

@NgModule({
  declarations: [TrianglesListComponent],
  imports: [
    CommonModule,
    TrianglesListRoutingModule,
    NumberModule
  ]
})

export class TrianglesListModule {}
