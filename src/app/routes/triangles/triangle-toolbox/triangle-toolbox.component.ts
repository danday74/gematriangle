import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-triangle-toolbox',
  templateUrl: './triangle-toolbox.component.html',
  styleUrls: ['./triangle-toolbox.component.scss']
})

export class TriangleToolboxComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onDrawClick() {
    console.log('onDrawClick')
  }
}
