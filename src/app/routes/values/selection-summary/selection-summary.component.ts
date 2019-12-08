import { Component, OnInit } from '@angular/core'
import { filter, takeUntil } from 'rxjs/operators'
import { ValuesMessage, ValuesService } from '../values.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { cloneDeep } from 'lodash'

@Component({
  selector: 'app-selection-summary',
  templateUrl: './selection-summary.component.html',
  styleUrls: ['./selection-summary.component.scss']
})

export class SelectionSummaryComponent extends DestroyerComponent implements OnInit {

  DEFAULT_SUMMARY = {
    rows: [],
    items: [],
    letterCount: 0,
    wordCount: 0,
    standard: 0,
    ordinal: 0
  }
  summary

  constructor(private valuesService: ValuesService) {
    super()
  }

  ngOnInit() {
    this.valuesService.valuesMessage$.pipe(
      takeUntil(this.unsubscribe$),
      filter(message => message.name === ValuesMessage.DatagridSelectionChange)
    ).subscribe((message) => {
      const rows = message.value
      if (rows.length === 0) {
        this.summary = null
      } else {
        this.summary = rows.reduce((acc, row) => {
          acc.rows.push(row)
          acc.items.push(row.item)
          acc.letterCount += parseInt(row.letterCount, 10)
          acc.wordCount += parseInt(row.wordCount, 10)
          acc.standard += parseInt(row.standard, 10)
          acc.ordinal += parseInt(row.ordinal, 10)
          return acc
        }, cloneDeep(this.DEFAULT_SUMMARY))
      }
    })
  }

  onRowClicked(row) {
    if (row.item.includes(':')) this.valuesService.onSelectionClicked(row)
  }
}
