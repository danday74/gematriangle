import { Component, OnInit } from '@angular/core'
import * as gotv from 'gematria-ot-values'
import * as chapterAndVerse from 'chapter-and-verse/js/cv'
import { range, sum } from 'lodash'

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})

export class ValuesComponent implements OnInit {

  book: string
  chapters = []

  constructor() {}

  ngOnInit() {

    this.book = 'Genesis'

    const cv = chapterAndVerse(this.book)
    const chapterNums = range(1, cv.book.chapters + 1)

    chapterNums.forEach(num => {
      const lc = gotv(`${this.book} ${num}`, 'lc')
      const wc = gotv(`${this.book} ${num}`, 'wc')
      const sw = gotv(`${this.book} ${num}`, 'sw')
      const ow = gotv(`${this.book} ${num}`, 'ow')

      if (wc) {
        this.chapters.push({
          num,
          letterCount: sum(lc),
          wordCount: sum(wc),
          standard: sum(sw),
          ordinal: sum(ow)
        })
      }
    })
  }
}
