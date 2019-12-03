import { Component, OnInit } from '@angular/core'
import { filter, takeUntil } from 'rxjs/operators'
import { ValuesMessage, ValuesService } from '../values.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { cloneDeep } from 'lodash'

@Component({
  selector: 'app-selected-summary',
  templateUrl: './selected-summary.component.html',
  styleUrls: ['./selected-summary.component.scss']
})

export class SelectedSummaryComponent extends DestroyerComponent implements OnInit {

  DEFAULT_SUMMARY = {
    items: [],
    letterCount: 0,
    wordCount: 0,
    standard: 0,
    ordinal: 0
  }
  summary = cloneDeep(this.DEFAULT_SUMMARY)

  constructor(private valuesService: ValuesService) {
    super()
  }

  ngOnInit() {
    this.valuesService.valuesMessage$.pipe(
      takeUntil(this.unsubscribe$),
      filter(message => message.name === ValuesMessage.DatagridSelectionChange)
    ).subscribe((message) => {
      const rows = message.value
      this.summary = rows.reduce((acc, row) => {
        acc.items.push(row.item)
        acc.letterCount += parseInt(row.letterCount, 10)
        acc.wordCount += parseInt(row.wordCount, 10)
        acc.standard += parseInt(row.standard, 10)
        acc.ordinal += parseInt(row.ordinal, 10)
        return acc
      }, cloneDeep(this.DEFAULT_SUMMARY))
    })
  }

  onItemClicked(item) {
    console.log('search for item in dt', item)
  }
}
