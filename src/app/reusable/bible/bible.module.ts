import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BibleApiDotComComponent } from './bible-api-dot-com/bible-api-dot-com.component'

@NgModule({
  declarations: [
    BibleApiDotComComponent
  ],
  exports: [
    BibleApiDotComComponent
  ],
  imports: [
    CommonModule
  ]
})

export class BibleModule {}
