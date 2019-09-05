import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GaClickEventTrackerDirective } from './ga-click-event-tracker/ga-click-event-tracker.directive'

@NgModule({
  declarations: [
    GaClickEventTrackerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GaClickEventTrackerDirective
  ]
})

export class DirectivesModule {}
