import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StickyButtonsBarComponent } from './sticky-buttons-bar/sticky-buttons-bar.component'
import { BackButtonComponent } from './back-button/back-button.component'

@NgModule({
  declarations: [
    BackButtonComponent,
    StickyButtonsBarComponent
  ],
  imports: [CommonModule],
  exports: [
    BackButtonComponent,
    StickyButtonsBarComponent
  ]
})

export class ButtonModule {}
