import { Component, HostListener, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NavbarService } from './navbar.service'
import { StorageService } from '../../services/storage/storage.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  breakdown: boolean
  isFullscreen: boolean

  constructor(public router: Router, private navbarService: NavbarService, private storageService: StorageService) {}

  ngOnInit() {
    const storageBreakdown = this.storageService.getItem('breakdown')
    this.breakdown = storageBreakdown != null ? storageBreakdown : true
  }

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

  onBreakdownChange() {
    this.navbarService.onToggleBreakdown(this.breakdown)
    this.storageService.setItem('breakdown', this.breakdown)
  }

  toggleBreakdown() {
    this.breakdown = !this.breakdown
    this.onBreakdownChange()
  }
}
