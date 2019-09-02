import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TrianglesListRoutingModule } from './triangles-list-routing.module'
import { TrianglesListComponent } from './triangles-list.component'

@NgModule({
  declarations: [TrianglesListComponent],
  imports: [
    CommonModule,
    TrianglesListRoutingModule
  ]
})

export class TrianglesListModule {}
