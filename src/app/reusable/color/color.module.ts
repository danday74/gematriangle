import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ColorCountComponent } from './color-count/color-count.component'
import { ColorCounterComponent } from './color-count/color-counter/color-counter.component'
import { NumberModule } from '../number/number.module'

@NgModule({
  declarations: [
    ColorCountComponent,
    ColorCounterComponent
  ],
  imports: [
    CommonModule,
    NumberModule
  ],
  exports: [
    ColorCountComponent
  ]
})

export class ColorModule {}
