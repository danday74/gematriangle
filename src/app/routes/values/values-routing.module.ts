import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ValuesComponent } from './values.component'

const routes: Routes = [
  {
    path: '',
    component: ValuesComponent,
    data: {
      theme: 'dark',
      paddingLeft: 5,
      paddingRight: 8
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ValuesRoutingModule {}
