import { Component, HostListener } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

  isFullscreen: boolean

  constructor(public router: Router) {}

  @HostListener('window:resize')
  onResize() {
    this.isFullscreen = window.innerHeight === screen.height
  }

  fullscreen() {
    const elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then()
      // @ts-ignore
    } else if (elem.mozRequestFullScreen) {
      // @ts-ignore
      elem.mozRequestFullScreen()
      // @ts-ignore
    } else if (elem.webkitRequestFullscreen) {
      // @ts-ignore
      elem.webkitRequestFullscreen()
      // @ts-ignore
    } else if (elem.msRequestFullscreen) {
      // @ts-ignore
      elem.msRequestFullscreen()
    }
  }
}
