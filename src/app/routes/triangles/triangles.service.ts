import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'})
export class TrianglesService {

  private toolboxIncreaseSizeSource = new Subject<boolean>()
  toolboxIncreaseSize$ = this.toolboxIncreaseSizeSource.asObservable()

  private toolboxDecreaseSizeSource = new Subject<boolean>()
  toolboxDecreaseSize$ = this.toolboxDecreaseSizeSource.asObservable()

  private toolboxDrawLinesSource = new Subject<boolean>()
  toolboxDrawLines$ = this.toolboxDrawLinesSource.asObservable()

  private toolboxToggleAlignSource = new Subject<boolean>()
  toolboxToggleAlign$ = this.toolboxToggleAlignSource.asObservable()

  constructor() {}

  onToolboxIncreaseSize() {
    this.toolboxIncreaseSizeSource.next(true)
  }

  onToolboxDecreaseSize() {
    this.toolboxDecreaseSizeSource.next(true)
  }

  onToolboxDrawLines() {
    this.toolboxDrawLinesSource.next(true)
  }

  onToolboxToggleAlign() {
    this.toolboxToggleAlignSource.next(true)
  }
}
