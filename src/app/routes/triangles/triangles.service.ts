import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { TriangleToolboxMessage } from './triangle-toolbox/triangle-toolbox-message.enum'
import { TriangleCounterValues } from './triangle/triangle-counter-values.enum'

@Injectable({providedIn: 'root'})
export class TrianglesService {

  private triangleToolboxMessageSource = new Subject<{ name: TriangleToolboxMessage, value: any }>()
  triangleToolboxMessage$ = this.triangleToolboxMessageSource.asObservable()

  private onTriangleToolboxMessage(name: TriangleToolboxMessage, value: any) {
    this.triangleToolboxMessageSource.next({name, value})
  }

  onChangeColor(color: string) {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ChangeColor, color)
  }

  onChangeCounterValues(counterValues: TriangleCounterValues) {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ChangeCounterValues, counterValues)
  }

  onChangeMode(mode: string) {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ChangeMode, mode)
  }

  onChangeRowCount(rowCount: number) {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ChangeRowCount, rowCount)
  }

  onClearActive() {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ClearActive, null)
  }

  onClearAll() {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ClearAll, null)
  }

  onClearColor() {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ClearColor, null)
  }

  onDrawLines() {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.DrawLines, null)
  }

  onEraseLines() {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.EraseLines, null)
  }

  onToggleAlign(alignCenter: boolean) {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ToggleAlign, alignCenter)
  }

  onToggleLineLength(shortLines) {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ToggleLineLength, shortLines)
  }

  onToggleShowValues(showValues: boolean) {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.ToggleShowValues, showValues)
  }

  onSelectEven() {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.SelectEven, null)
  }

  onSelectOdd() {
    this.onTriangleToolboxMessage(TriangleToolboxMessage.SelectOdd, null)
  }
}
