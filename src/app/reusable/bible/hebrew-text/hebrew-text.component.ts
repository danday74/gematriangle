import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-hebrew-text',
  templateUrl: './hebrew-text.component.html',
  styleUrls: ['./hebrew-text.component.scss']
})

export class HebrewTextComponent implements OnInit {

  @Input() ref: string
  @Input() text: string

  constructor() {}

  ngOnInit() {}
}
