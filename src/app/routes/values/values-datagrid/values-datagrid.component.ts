import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core'
import { DxDataGridComponent } from 'devextreme-angular'
import { range, sum } from 'lodash'
import { appString } from '../../../utils/app-string'
import * as memoizee from 'memoizee'
import * as gotv from 'gematria-ot-values'
import * as chapterAndVerse from 'chapter-and-verse/js/cv'
import { Item } from '../item'
import { NumberService } from '../../../reusable/number/number/number.service'
import { ValuesMessage, ValuesService } from '../values.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-values-datagrid',
  templateUrl: './values-datagrid.component.html',
  styleUrls: ['./values-datagrid.component.scss']
})

export class ValuesDatagridComponent extends DestroyerComponent implements OnInit, AfterViewInit {

  @ViewChild(DxDataGridComponent, {static: false}) dxDataGrid: DxDataGridComponent
  @Input() breakdown: boolean
  @Output() activeRowChange = new EventEmitter<any>()
  @Output() langToggle = new EventEmitter<boolean>()
  @Output() modeChange = new EventEmitter<string>()

  private SELECTED = 's̲e̲l̲e̲c̲t̲e̲d̲'

  private books = ['Genesis', 'Exodus']
  private visibleColumnCount: number

  items: Array<Item> // chapters or verses
  mode: string
  selectedRows = []
  totalRowCount = 0

  @HostListener('window:scroll')
  onWindowScroll() {
    this.dxDataGrid.instance.hideColumnChooser()
  }

  get isShowingSelected() {
    const searchText = this.dxDataGrid ? this.dxDataGrid.instance.option('searchPanel.text') : null
    return searchText === this.SELECTED
  }

  constructor(private numberService: NumberService, private valuesService: ValuesService) {
    super()
    this.calculateSelected = this.calculateSelected.bind(this)
    this.calculateLetterCount = this.calculateLetterCount.bind(this)
    this.calculateWordCount = this.calculateWordCount.bind(this)
    this.calculateStandard = this.calculateStandard.bind(this)
    this.calculateOrdinal = this.calculateOrdinal.bind(this)
    this.sortReference = memoizee(this.sortReference)
    this.sortBreakdown = memoizee(this.sortBreakdown)
    this.sortNumbers = memoizee(this.sortNumbers)
  }

  ngOnInit() {
    this.setMode('Chapter')
    this.showChapters()
    this.valuesService.valuesMessage$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((message) => {
      switch (message.name) {
        case ValuesMessage.ShowChapters:
          this.showChapters()
          break
        case ValuesMessage.ShowVerses:
          this.showVerses()
          break
      }
    })
  }

  ngAfterViewInit() {
    // When a column is hidden, disallow search for that column
    this.dxDataGrid.onContentReady.subscribe((evt) => {
      let visibleColumnCount = 0
      const grid = evt.component
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

  private showChapters() {
    if (this.dxDataGrid) this.dxDataGrid.instance.clearSelection()

    this.activeRowChange.emit(null)
    this.setMode('Chapter')
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
            ordinal: sum(ow).toString(),
            text: null
          })
        }
      })
    })
  }

  private showChapterVerses(evt) {
    this.dxDataGrid.instance.clearSelection()
    this.dxDataGrid.instance.clearFilter()
    this.setMode('ChapterVerse')
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
      const he = gotv(`${ref}:${verseNum}`, 'he')

      if (wc) {
        this.items.push({
          number: this.getVerseNumber(book, chapterNum, verseNum),
          item: `${ref}:${verseNum}`,
          letterCount: sum(lc).toString(),
          wordCount: sum(wc).toString(),
          standard: sum(sw).toString(),
          ordinal: sum(ow).toString(),
          text: he
        })
      }
    })
  }

  private showVerses() {
    this.dxDataGrid.instance.clearSelection()

    this.activeRowChange.emit(null)
    this.setMode('Verse')
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
            const he = gotv(`${book} ${chapterNum}:${verseNum}`, 'he')

            if (wc) {
              this.items.push({
                number: this.getVerseNumber(book, chapterNum, verseNum),
                item: `${book} ${chapterNum}:${verseNum}`,
                letterCount: sum(lc).toString(),
                wordCount: sum(wc).toString(),
                standard: sum(sw).toString(),
                ordinal: sum(ow).toString(),
                text: he
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

  calculateSelected(rowData) {
    const selectedRows = this.dxDataGrid.instance.getSelectedRowsData()
    const selected = selectedRows.some(selectedRow => selectedRow.number === rowData.number)
    return selected ? this.SELECTED : null
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
    return this.numberService.getActivePropsString(val)
  }

  // change column order
  // noinspection JSUnusedLocalSymbols
  onDataGridInitialized(evt) {
    // const grid = evt.component
    // grid.columnOption('command:select', 'visibleIndex', 0)
  }

  onRowClick(evt) {
    this.dxDataGrid.instance.hideColumnChooser()
    if (this.mode === 'Chapter') {
      this.showChapterVerses(evt)
    } else {
      this.activeRowChange.emit(evt.data)
    }
  }

  filterCalculatedCell(selector) {
    const column = this as any
    return [[column.calculateCellValue, 'contains', selector]]
  }

  onToolbarPreparing(evt) {
    // noinspection JSUnusedGlobalSymbols
    evt.toolbarOptions.items.unshift({
        location: 'after',
        template: 'dxTemplateTotalRowCount'
      },
      {
        widget: 'dxButton',
        options: {
          icon: 'check', onClick: () => {
            const instance = this.dxDataGrid.instance
            const searchText = instance.option('searchPanel.text')
            if (searchText === this.SELECTED) {
              instance.clearFilter()
            } else {
              instance.searchByText(this.SELECTED)
            }
          },
          elementAttr: {
            title: 'Selected Toggle'
          }
        },
        location: 'after'
      },
      {
        widget: 'dxButton',
        options: {
          icon: 'globe', onClick: () => {
            this.langToggle.next(true)
          },
          elementAttr: {
            title: 'Bible Verse Language Toggle'
          }
        },
        location: 'after'
      })
  }

  onSelectionChanged() {
    this.valuesService.onDatagridSelectionChange(this.selectedRows)
  }

  // TODO: This should be which verse in the Bible it is - e.g. 999th verse = 999
  private getVerseNumber(book, chapterNum, verseNum) {
    const bookDigit2 = (this.books.indexOf(book) + 1).toString().padStart(2, '0')
    const chapterDigit3 = chapterNum.toString().padStart(3, '0')
    const verseDigit3 = verseNum.toString().padStart(3, '0')
    return `${bookDigit2}-${chapterDigit3}-${verseDigit3}`
  }

  private setMode(mode) {
    this.mode = mode
    this.modeChange.emit(mode)
  }
}
