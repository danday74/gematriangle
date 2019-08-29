import { Component, OnInit } from '@angular/core'
import { ColorService } from '../color.service'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-color-count',
  templateUrl: './color-count.component.html',
  styleUrls: ['./color-count.component.scss']
})

export class ColorCountComponent extends DestroyerComponent implements OnInit {

  colors = {
    appRed: {
      count: 0,
      value: 0
    },
    appYellow: {
      count: 0,
      value: 0
    },
    appPink: {
      count: 0,
      value: 0
    },
    appGreen: {
      count: 0,
      value: 0
    },
    appOrange: {
      count: 0,
      value: 0
    },
    appBlue: {
      count: 0,
      value: 0
    }
  }

  constructor(private colorService: ColorService) {
    super()
  }

  ngOnInit() {
    this.colorService.colorsChange$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(colors => {
      this.colors = colors
    })
  }
}
