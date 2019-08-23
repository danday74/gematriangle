import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TrianglesRoutingModule } from './triangles-routing.module'
import { TrianglesComponent } from './triangles.component'
import { TriangleComponent } from './triangle/triangle.component'

@NgModule({
  declarations: [
    TrianglesComponent,
    TriangleComponent
  ],
  imports: [
    CommonModule,
    TrianglesRoutingModule
  ]
})

export class TrianglesModule {}
