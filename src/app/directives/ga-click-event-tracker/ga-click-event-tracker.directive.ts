import { Directive, HostListener, Input } from '@angular/core'
import * as $ from 'jquery'
import { GoogleAnalyticsService } from 'src/app/services/google-analytics/google-analytics.service'

@Directive({selector: '[appGaClickEventTracker]'})
export class GaClickEventTrackerDirective {

  @Input('appGaClickEventTracker') action: string
  @Input() gaLabel: any = null

  private static getNodeName(el) {
    return el.prop('nodeName').toLowerCase()
  }

  constructor(private googleAnalyticsService: GoogleAnalyticsService) {}

  @HostListener('click', ['$event'])
  onClick(evt) {
    const tempEl = $(evt.target)
    const elNodeName = GaClickEventTrackerDirective.getNodeName(tempEl)
    const parentNodeName = GaClickEventTrackerDirective.getNodeName(tempEl.parent())
    const el = elNodeName !== 'button' && parentNodeName === 'button' ? tempEl.parent() : tempEl

    const action = this.action || el.text() || 'none'
    this.googleAnalyticsService.sendEvent('click', action, this.gaLabel)
  }
}
