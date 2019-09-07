import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { NavbarMessage } from './navbar-message.enum'

@Injectable({providedIn: 'root'})
export class NavbarService {

  private navbarMessageSource = new Subject<{ name: NavbarMessage, value: any }>()
  navbarMessage$ = this.navbarMessageSource.asObservable()

  constructor() {}

  private onNavbarMessage(name: NavbarMessage, value: any) {
    this.navbarMessageSource.next({name, value})
  }

  onToggleBreakdown(breakdown: boolean) {
    this.onNavbarMessage(NavbarMessage.ToggleBreakdown, breakdown)
  }
}
