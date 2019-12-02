import { Component, HostListener, OnInit } from '@angular/core'
import { StorageService } from '../../services/storage/storage.service'
import { filter, takeUntil } from 'rxjs/operators'
import { NavbarMessage } from '../../base/navbar/navbar-message.enum'
import { DestroyerComponent } from '../../utils/destroyer.component'
import { NavbarService } from '../../base/navbar/navbar.service'
import * as $ from 'jquery'
import { ValuesService } from './values.service'

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})

export class ValuesComponent extends DestroyerComponent implements OnInit {

  bible = {ref: null, text: null}
  breakdown: boolean
  lang = 'en'
  mode: string

  @HostListener('window:resize')
  onWindowResize() {
    const valuesBuilderWrapper = $('.values-builder-wrapper')
    const valuesSummaryWrapper = $('.values-summary-wrapper')
    const vbParentWidth = valuesBuilderWrapper.parent().width()
    valuesBuilderWrapper.width(vbParentWidth)
    const vsParentWidth = valuesSummaryWrapper.parent().width()
    valuesSummaryWrapper.width(vsParentWidth)
  }

  constructor(private storageService: StorageService, private navbarService: NavbarService, private valuesService: ValuesService) {
    super()
  }

  ngOnInit() {

    this.onWindowResize()

    const storageBreakdown = this.storageService.getItem('breakdown')
    this.breakdown = storageBreakdown != null ? storageBreakdown : true

    this.navbarService.navbarMessage$.pipe(
      takeUntil(this.unsubscribe$),
      filter(message => message.name === NavbarMessage.ToggleBreakdown)
    ).subscribe((message) => {
      this.breakdown = message.value
    })
  }

  bibleRefChange(data) {
    setTimeout(() => {
      if (data) {
        this.bible.ref = data.item
        this.bible.text = data.text
      } else {
        this.bible.ref = null
        this.bible.text = null
      }
    })
  }

  showChapters() {
    this.valuesService.onShowChapters()
  }

  showVerses() {
    this.valuesService.onShowVerses()
  }

  modeChange(mode: string) {
    this.mode = mode
  }

  langToggle() {
    if (this.lang === 'en') {
      this.lang = 'he'
    } else if (this.lang === 'he') this.lang = 'en'
  }
}
