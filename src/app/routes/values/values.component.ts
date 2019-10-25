import { Component, OnInit } from '@angular/core'
import * as gotv from 'gematria-ot-values'

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})

export class ValuesComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const gem = gotv('Genesis 1', 'sv')
    console.log('gem', gem)
  }
}
