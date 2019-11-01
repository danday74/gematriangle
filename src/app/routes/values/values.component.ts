import { Component, OnInit } from '@angular/core'
import * as gotv from 'gematria-ot-values'
import * as chapterAndVerse from 'chapter-and-verse/js/cv'
import { range, sum } from 'lodash'
import { NumberService } from '../../reusable/number/number/number.service'
import * as $ from 'jquery'
import { StorageService } from '../../services/storage/storage.service'
import { filter, takeUntil } from 'rxjs/operators'
import { NavbarMessage } from '../../base/navbar/navbar-message.enum'
import { DestroyerComponent } from '../../utils/destroyer.component'
import { NavbarService } from '../../base/navbar/navbar.service'

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})

export class ValuesComponent extends DestroyerComponent implements OnInit {

  private books = ['Genesis', 'Exodus']
  breakdown: boolean
  mode = 'Chapter'
  items = [] // chapters or verses

  constructor(private numberService: NumberService, private storageService: StorageService, private navbarService: NavbarService) {
    super()
    this.calculateLetterCount = this.calculateLetterCount.bind(this)
    this.calculateWordCount = this.calculateWordCount.bind(this)
    this.calculateStandard = this.calculateStandard.bind(this)
    this.calculateOrdinal = this.calculateOrdinal.bind(this)
  }

  ngOnInit() {

    const storageBreakdown = this.storageService.getItem('breakdown')
    this.breakdown = storageBreakdown != null ? storageBreakdown : true

    this.navbarService.navbarMessage$.pipe(
      takeUntil(this.unsubscribe$),
      filter(message => message.name === NavbarMessage.ToggleBreakdown)
    ).subscribe((message) => {
      this.breakdown = message.value
    })

    this.showChapters()
  }

  showChapters() {
    this.mode = 'Chapter'
    this.items = []

    let count = 0

    this.books.forEach(book => {
      const cv = chapterAndVerse(book)
      const chapterNums = range(1, cv.book.chapters + 1)

      chapterNums.forEach((num) => {
        count++
        const lc = gotv(`${book} ${num}`, 'lc')
        const wc = gotv(`${book} ${num}`, 'wc')
        const sw = gotv(`${book} ${num}`, 'sw')
        const ow = gotv(`${book} ${num}`, 'ow')

        if (wc) {
          this.items.push({
            number: count,
            item: `<span>${book} ${this.getNumSpan(num)}</span>`,
            letterCount: sum(lc),
            wordCount: sum(wc),
            standard: sum(sw),
            ordinal: sum(ow)
          })
        }
      })
    })
  }

  showChapterVerses(evt: any) {
    if (this.mode !== 'Verse') {

      this.mode = 'Verse'
      this.items = []

      const chapterNumSpan = evt.data.item
      const html = $.parseHTML(chapterNumSpan)
      const chapter = $(html).text()
      const cv = chapterAndVerse(chapter)
      const verseNums = range(1, cv.book.versesPerChapter[cv.chapter - 1] + 1)

      verseNums.forEach((num, i) => {
        const lc = gotv(`${chapter}:${num}`, 'lc')
        const wc = gotv(`${chapter}:${num}`, 'wc')
        const sw = gotv(`${chapter}:${num}`, 'sw')
        const ow = gotv(`${chapter}:${num}`, 'ow')

        if (wc) {
          this.items.push({
            number: i + 1, // TODO: This should be which verse in the Bible it is - e.g. 999th verse = 999
            item: `${chapterNumSpan}:${this.getNumSpan(num)}`,
            letterCount: sum(lc),
            wordCount: sum(wc),
            standard: sum(sw),
            ordinal: sum(ow)
          })
        }
      })
    }
  }

  calculateLetterCount(rowData) {
    return this.calculate(rowData.letterCount)
  }

  calculateWordCount(rowData) {
    return this.calculate(rowData.wordCount)
  }

  calculateStandard(rowData) {
    return this.calculate(rowData.standard)
  }

  calculateOrdinal(rowData) {
    return this.calculate(rowData.ordinal)
  }

  private calculate(val) {
    const value = this.numberService.getActivePropsString(val)
    return value ? value : '~'
  }

  private getNumSpan(num) {
    let leadingZeroes = true
    const parts = num.toString().padStart(3, '0').split('')
    const numSpan = parts.reduce((acc, part) => {
      if (leadingZeroes && part === '0') {
        acc += `<span class="leading-zero">0</span>`
      } else {
        leadingZeroes = false
        acc += `<span>${part}</span>`
      }
      return acc
    }, `<span class="number-${num}">`)
    return numSpan + '</span>'
  }
}
