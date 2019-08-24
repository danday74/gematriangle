import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TrianglesRoutingModule } from './triangles-routing.module'
import { TrianglesComponent } from './triangles.component'
import { TriangleComponent } from './triangle/triangle.component'
import { TriangleToolboxComponent } from './triangle-toolbox/triangle-toolbox.component'
import { ToolboxModule } from '../../reusable/toolbox/toolbox.module'
import { TriangleStatsComponent } from './triangle-stats/triangle-stats.component'

@NgModule({
  declarations: [
    TrianglesComponent,
    TriangleComponent,
    TriangleToolboxComponent,
    TriangleStatsComponent
  ],
  imports: [
    CommonModule,
    TrianglesRoutingModule,
    ToolboxModule
  ]
})

export class TrianglesModule {}
