import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core'
import * as gotv from 'gematria-ot-values'
import * as chapterAndVerse from 'chapter-and-verse/js/cv'
import { range, sum } from 'lodash'
import { NumberService } from '../../reusable/number/number/number.service'
import { StorageService } from '../../services/storage/storage.service'
import { filter, takeUntil } from 'rxjs/operators'
import { NavbarMessage } from '../../base/navbar/navbar-message.enum'
import { DestroyerComponent } from '../../utils/destroyer.component'
import { NavbarService } from '../../base/navbar/navbar.service'
import * as memoizee from 'memoizee'
import { Item } from './item'
import { appString } from 'src/app/utils/app-string'
import { DxDataGridComponent } from 'devextreme-angular'

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})

export class ValuesComponent extends DestroyerComponent implements OnInit, AfterViewInit {

  @ViewChild(DxDataGridComponent, {static: false}) dxDataGrid: DxDataGridComponent

  private books = ['Genesis', 'Exodus']

  visibleColumnCount: number
  totalRowCount = 0
  bibleRef: string
  breakdown: boolean
  mode = 'Chapter'
  items: Array<Item> // chapters or verses

  @HostListener('window:scroll')
  onWindowScroll() {
    this.dxDataGrid.instance.hideColumnChooser()
  }

  constructor(private numberService: NumberService, private storageService: StorageService, private navbarService: NavbarService) {
    super()
    this.calculateLetterCount = this.calculateLetterCount.bind(this)
    this.calculateWordCount = this.calculateWordCount.bind(this)
    this.calculateStandard = this.calculateStandard.bind(this)
    this.calculateOrdinal = this.calculateOrdinal.bind(this)
    this.sortReference = memoizee(this.sortReference)
    this.sortBreakdown = memoizee(this.sortBreakdown)
    this.sortNumbers = memoizee(this.sortNumbers)
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

  ngAfterViewInit() {
    // When a column is hidden, disallow search for that column
    this.dxDataGrid.onContentReady.subscribe((args) => {
      let visibleColumnCount = 0
      const grid = args.component
      setTimeout(() => {
        this.totalRowCount = grid.totalCount()
      })
      for (let i = 0; i < grid.columnCount(); i++) {
        const visible = grid.columnOption(i, 'visible')
        if (visible) visibleColumnCount++
        grid.columnOption(i, 'allowSearch', visible)
      }
      if (visibleColumnCount !== this.visibleColumnCount && this.visibleColumnCount != null) this.dxDataGrid.instance.refresh()
      this.visibleColumnCount = visibleColumnCount
    })
  }

  onRowClick(evt) {
    this.dxDataGrid.instance.hideColumnChooser()
    if (this.mode === 'Chapter') {
      this.showChapterVerses(evt)
    } else {
      this.bibleRef = evt.data.item
    }
  }

  showChapters() {
    this.bibleRef = null
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
            number: count.toString(),
            item: `${book} ${num}`,
            letterCount: sum(lc).toString(),
            wordCount: sum(wc).toString(),
            standard: sum(sw).toString(),
            ordinal: sum(ow).toString()
          })
        }
      })
    })
  }

  showChapterVerses(evt) {
    this.mode = 'ChapterVerse'
    this.items = []

    const ref = evt.data.item
    const cv = chapterAndVerse(ref)
    const verseNums = range(1, cv.book.versesPerChapter[cv.chapter - 1] + 1)

    const book = cv.book.name
    const chapterNum = cv.chapter

    verseNums.forEach(verseNum => {
      const lc = gotv(`${ref}:${verseNum}`, 'lc')
      const wc = gotv(`${ref}:${verseNum}`, 'wc')
      const sw = gotv(`${ref}:${verseNum}`, 'sw')
      const ow = gotv(`${ref}:${verseNum}`, 'ow')

      if (wc) {
        this.items.push({
          number: this.getVerseNumber(book, chapterNum, verseNum),
          item: `${ref}:${verseNum}`,
          letterCount: sum(lc).toString(),
          wordCount: sum(wc).toString(),
          standard: sum(sw).toString(),
          ordinal: sum(ow).toString()
        })
      }
    })
  }

  showVerses() {
    this.bibleRef = null
    this.mode = 'Verse'
    this.items = []

    this.books.forEach(book => {
      const cv = chapterAndVerse(book)
      const chapterNums = range(1, cv.book.chapters + 1)

      chapterNums.forEach((chapterNum) => {
        const chapterWc = gotv(`${book} ${chapterNum}`, 'wc')
        if (chapterWc) {
          const verseNums = range(1, cv.book.versesPerChapter[chapterNum - 1] + 1)
          verseNums.forEach((verseNum) => {
            const lc = gotv(`${book} ${chapterNum}:${verseNum}`, 'lc')
            const wc = gotv(`${book} ${chapterNum}:${verseNum}`, 'wc')
            const sw = gotv(`${book} ${chapterNum}:${verseNum}`, 'sw')
            const ow = gotv(`${book} ${chapterNum}:${verseNum}`, 'ow')

            if (wc) {
              this.items.push({
                number: this.getVerseNumber(book, chapterNum, verseNum),
                item: `${book} ${chapterNum}:${verseNum}`,
                letterCount: sum(lc).toString(),
                wordCount: sum(wc).toString(),
                standard: sum(sw).toString(),
                ordinal: sum(ow).toString()
              })
            }
          })
        }
      })
    })
  }

  sortReference(item1, item2) {
    if (!item1.includes(':')) {
      const parts1 = item1.split(' ')
      const parts2 = item2.split(' ')
      item1 = `${parts1[0]} ${parts1[1].padStart(3, '0')}`
      item2 = `${parts2[0]} ${parts2[1].padStart(3, '0')}`
      return item1.localeCompare(item2)
    } else {
      const parts1 = item1.split(' ')
      const chaver1 = parts1[1].split(':')
      const parts2 = item2.split(' ')
      const chaver2 = parts2[1].split(':')
      item1 = `${parts1[0]} ${chaver1[0].padStart(3, '0')} ${chaver1[1].padStart(3, '0')}`
      item2 = `${parts2[0]} ${chaver2[0].padStart(3, '0')} ${chaver2[1].padStart(3, '0')}`
      return item1.localeCompare(item2)
    }
  }

  sortBreakdown(bd1, bd2) {
    if (bd1 == null && bd2 == null) return 0
    if (bd1 == null) return 1
    if (bd2 == null) return -1
    const bd1Len = bd1.split(' ').length
    const bd2Len = bd2.split(' ').length
    if (bd1Len < bd2Len) return 1
    if (bd1Len > bd2Len) return -1
    if (bd1Len > 1 && bd1Len === bd2Len) {
      const compare = bd1.localeCompare(bd2)
      // if (compare === 1) return -1
      // if (compare === -1) return 1
      // return 0
      return compare
    }

    let bd1Num = null
    let bd2Num = null
    const prepends = ['37x', '73x', 'T']
    prepends.forEach(prepend => {
      if (bd1.startsWith(prepend) && bd2.startsWith(prepend)) {
        bd1Num = parseInt(bd1.replace(prepend, ''), 10)
        bd2Num = parseInt(bd2.replace(prepend, ''), 10)
      }
    })
    if (bd1Num != null) {
      if (bd1Num < bd2Num) return 1
      if (bd1Num > bd2Num) return -1
      return 0
    }

    let bd1PrependIndex = -1
    let bd2PrependIndex = -1
    prepends.forEach((prepend, i) => {
      if (bd1.startsWith(prepend)) bd1PrependIndex = i
      if (bd2.startsWith(prepend)) bd2PrependIndex = i
    })

    if (bd1PrependIndex === -1 || bd2PrependIndex === -1) console.warn('Invalid sorting breakdown', bd1, bd2)

    if (bd1PrependIndex > bd2PrependIndex) return 1
    if (bd1PrependIndex < bd2PrependIndex) return -1
    return bd1.localeCompare(bd2)
  }

  sortNumbers(item1, item2) {
    if (appString.isInteger(item1)) {
      const num1 = parseInt(item1, 10)
      const num2 = parseInt(item2, 10)
      if (num1 > num2) return 1
      if (num1 < num2) return -1
      return 0
    } else {
      return item1.localeCompare(item2)
    }
  }

  calculateLetterCount(rowData) {
    return this.calculate(rowData.letterCount)
  }

  filterCalculatedCell(selector) {
    const column = this as any
    return [[column.calculateCellValue, 'contains', selector]]
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
    return this.numberService.getActivePropsString(val)
  }

  // TODO: This should be which verse in the Bible it is - e.g. 999th verse = 999
  private getVerseNumber(book, chapterNum, verseNum) {
    const bookDigit2 = (this.books.indexOf(book) + 1).toString().padStart(2, '0')
    const chapterDigit3 = chapterNum.toString().padStart(3, '0')
    const verseDigit3 = verseNum.toString().padStart(3, '0')
    return `${bookDigit2}-${chapterDigit3}-${verseDigit3}`
  }

  onToolbarPreparing(evt) {
    evt.toolbarOptions.items.unshift({
      location: 'after',
      template: 'dxTemplateTotalRowCount'
    })
  }
}
