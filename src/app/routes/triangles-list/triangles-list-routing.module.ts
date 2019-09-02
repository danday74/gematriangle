import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TrianglesListComponent } from './triangles-list.component'

const routes: Routes = [
  {
    path: '',
    component: TrianglesListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrianglesListRoutingModule {}
