import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ColorCountComponent } from './color-count/color-count.component'
import { ColorCounterComponent } from './color-count/color-counter/color-counter.component'

@NgModule({
  declarations: [
    ColorCountComponent,
    ColorCounterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColorCountComponent
  ]
})

export class ColorModule {}
