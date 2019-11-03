import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { BibleService } from '../bible/bible.service'

@Component({
  selector: 'app-bible-api-dot-com',
  templateUrl: './bible-api-dot-com.component.html',
  styleUrls: ['./bible-api-dot-com.component.scss']
})

export class BibleApiDotComComponent implements OnChanges {

  @Input() ref: string

  bibleVerse

  constructor(private bibleService: BibleService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ref && !changes.ref.firstChange) {
      this.getVerse(changes.ref.currentValue)
    }
  }

  private getVerse(ref) {
    this.bibleService.getVerse(ref).subscribe((bibleVerse: string) => {
      this.bibleVerse = bibleVerse
    })
  }
}
