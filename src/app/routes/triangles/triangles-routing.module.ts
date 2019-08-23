import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TrianglesComponent } from './triangles.component'

const routes: Routes = [
  {
    path: '',
    component: TrianglesComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrianglesRoutingModule {}
