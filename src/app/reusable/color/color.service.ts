import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'})
export class ColorService {

  private colorsChangeSource = new Subject<any>()
  colorsChange$ = this.colorsChangeSource.asObservable()

  onColorsChange(colors) {
    this.colorsChangeSource.next(colors)
  }
}
