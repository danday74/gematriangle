import { Injectable } from '@angular/core'
import { ScriptService } from '../script/script.service'
import { environment } from 'src/environments/environment'
import { NavigationEnd, Router } from '@angular/router'
import * as Debug from 'debug'

const debug = Debug('gema:google-analytics')

@Injectable({providedIn: 'root'})
export class GoogleAnalyticsService {

  private lastUrl: string = null
  private tracker: any

  constructor(private router: Router, private scriptService: ScriptService) {}

  loadGoogleAnalytics() {
    const googleAnalyticsId = environment.googleAnalyticsId
    this.scriptService.loadScript('https://www.googletagmanager.com/gtag/js?id=' + googleAnalyticsId).then(
      () => {
        let dataLayer = (window as any).dataLayer
        dataLayer = dataLayer || []
        const gtag = function(x, y) {dataLayer.push(arguments)} // tslint:disable-line:only-arrow-functions
        gtag('js', new Date())
        gtag('config', googleAnalyticsId)
        debug('load Google Analytics success')
        this.initTracker()
      }
    ).catch(() => {
      debug('load Google Analytics failure')
    })
  }

  sendEvent(category: string, action: string, label: any = null) {
    debug(`sendEvent ${category} ${action} ${label}`)
    const interval = setInterval(() => {
      if (this.tracker) {
        // noinspection JSIgnoredPromiseFromCall,JSUnusedGlobalSymbols
        this.tracker.send('event', category, action, label, {
          hitCallback: () => {
            debug(`success ${category} ${action} ${label}`)
          }
        })
        clearInterval(interval)
      }
    }, 1000)
  }

  sendPageView(url: string) {
    this.tracker.set('page', url)
    this.tracker.send('pageview')
  }

  private initTracker() {
    const interval = setInterval(() => {
      const ga = (window as any).ga
      if (ga && ga.getAll) {
        this.tracker = ga.getAll()[0]
        this.initGoogleAnalyticsPageView()
        clearInterval(interval)
      }
    }, 50)
  }

  private initGoogleAnalyticsPageView() {
    this.lastUrl = this.router.url
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        const url = evt.urlAfterRedirects
        if (url !== this.lastUrl) {
          this.lastUrl = url
          this.sendPageView(url)
        }
      }
    })
  }
}
