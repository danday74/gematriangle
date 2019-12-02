import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BibleApiDotComComponent } from './bible-api-dot-com/bible-api-dot-com.component'
import { HebrewTextComponent } from './hebrew-text/hebrew-text.component'

@NgModule({
  declarations: [
    BibleApiDotComComponent,
    HebrewTextComponent
  ],
  exports: [
    BibleApiDotComComponent,
    HebrewTextComponent
  ],
  imports: [
    CommonModule
  ]
})

export class BibleModule {}
