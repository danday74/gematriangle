import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'})
export class TrianglesService {

  private toolboxChangeRowCountSource = new Subject<number>()
  toolboxChangeRowCount$ = this.toolboxChangeRowCountSource.asObservable()

  private toolboxToggleAlignSource = new Subject<boolean>()
  toolboxToggleAlign$ = this.toolboxToggleAlignSource.asObservable()

  constructor() {}

  onToolboxChangeRowCount(rowCount: number) {
    this.toolboxChangeRowCountSource.next(rowCount)
  }

  onToolboxToggleAlign() {
    this.toolboxToggleAlignSource.next(true)
  }
}
