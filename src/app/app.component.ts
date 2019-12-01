import { Component, OnInit } from '@angular/core'
import { GoogleAnalyticsService } from './services/google-analytics/google-analytics.service'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter, map, mergeMap } from 'rxjs/operators'
import * as $ from 'jquery'

const DEFAULTS = {
  THEME: 'light',
  PADDING: true
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  theme = DEFAULTS.THEME
  padding = DEFAULTS.PADDING

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
    this.padding = data.padding != null ? data.padding : DEFAULTS.PADDING
    const html = $('html')
    html.removeClass('theme-light').removeClass('theme-dark')
    html.addClass('theme-' + this.theme)
  }
}
