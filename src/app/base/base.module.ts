import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavbarComponent } from './navbar/navbar.component'
import { RouterModule } from '@angular/router'
import { FooterComponent } from './footer/footer.component'
import { FormsModule } from '@angular/forms'
import { CheckboxModule } from 'primeng/checkbox'

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CheckboxModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ]
})

export class BaseModule {}
