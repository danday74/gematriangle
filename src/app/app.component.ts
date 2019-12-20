import { Component, OnInit } from '@angular/core'
import { GoogleAnalyticsService } from './services/google-analytics/google-analytics.service'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter, map, mergeMap } from 'rxjs/operators'
import * as $ from 'jquery'

const DEFAULTS = {
  THEME: 'light'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  theme = DEFAULTS.THEME
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number

  padding = {
    top: 20,
    right: 0,
    bottom: 10,
    left: 0
  }

  constructor(private router: Router, private route: ActivatedRoute, private googleAnalyticsService: GoogleAnalyticsService) {}

  ngOnInit() {
    this.googleAnalyticsService.loadGoogleAnalytics()

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) route = route.firstChild
        return route
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => this.setThemeAndPadding(data))
  }

  private setThemeAndPadding(data) {
    this.theme = data.theme != null ? data.theme : DEFAULTS.THEME

    this.padding.top = this.getPadding(data.paddingTop, data.topBottomPadding, data.padding, this.padding.top)
    this.padding.right = this.getPadding(data.paddingRight, data.leftRightPadding, data.padding, this.padding.right)
    this.padding.bottom = this.getPadding(data.paddingBottom, data.topBottomPadding, data.padding, this.padding.bottom)
    this.padding.left = this.getPadding(data.paddingLeft, data.leftRightPadding, data.padding, this.padding.left)

    const html = $('html')
    html.removeClass('theme-light').removeClass('theme-dark')
    html.addClass('theme-' + this.theme)
  }

  private getPadding(a, b, c, def) {
    return a != null ? a
      : b != null ? b
        : c != null ? c : def
  }
}
