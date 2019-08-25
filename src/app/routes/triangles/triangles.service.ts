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

  private toolboxEraseLinesSource = new Subject<boolean>()
  toolboxEraseLines$ = this.toolboxEraseLinesSource.asObservable()

  private toolboxClearActiveSource = new Subject<boolean>()
  toolboxClearActive$ = this.toolboxClearActiveSource.asObservable()

  private toolboxClearSelectedSource = new Subject<boolean>()
  toolboxClearSelected$ = this.toolboxClearSelectedSource.asObservable()

  private toolboxToggleAlignSource = new Subject<boolean>()
  toolboxToggleAlign$ = this.toolboxToggleAlignSource.asObservable()

  private toolboxActivateCornersSource = new Subject<boolean>()
  toolboxActivateCorners$ = this.toolboxActivateCornersSource.asObservable()

  private toolboxActivateMidpointsSource = new Subject<boolean>()
  toolboxActivateMidpoints$ = this.toolboxActivateMidpointsSource.asObservable()

  private toolboxActivateMidpointsPlusSource = new Subject<boolean>()
  toolboxActivateMidpointsPlus$ = this.toolboxActivateMidpointsPlusSource.asObservable()

  private toolboxActivateCenterSource = new Subject<boolean>()
  toolboxActivateCenter$ = this.toolboxActivateCenterSource.asObservable()

  private toolboxActivateStarSource = new Subject<boolean>()
  toolboxActivateStar$ = this.toolboxActivateStarSource.asObservable()

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

  onToolboxEraseLines() {
    this.toolboxEraseLinesSource.next(true)
  }

  onToolboxClearActive() {
    this.toolboxClearActiveSource.next(true)
  }

  onToolboxClearSelected() {
    this.toolboxClearSelectedSource.next(true)
  }

  onToolboxToggleAlign() {
    this.toolboxToggleAlignSource.next(true)
  }

  onToolboxActivateCorners() {
    this.toolboxActivateCornersSource.next(true)
  }

  onToolboxActivateMidpoints() {
    this.toolboxActivateMidpointsSource.next(true)
  }

  onToolboxActivateMidpointsPlus() {
    this.toolboxActivateMidpointsPlusSource.next(true)
  }

  onToolboxActivateCenter() {
    this.toolboxActivateCenterSource.next(true)
  }

  onToolboxActivateStar() {
    this.toolboxActivateStarSource.next(true)
  }
}
