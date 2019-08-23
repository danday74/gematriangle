import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ConstantsComponent } from './constants.component'

const routes: Routes = [
  {
    path: '',
    component: ConstantsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConstantsRoutingModule {}
