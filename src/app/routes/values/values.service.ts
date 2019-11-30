import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

export enum ValuesMessage {
  ShowChapters = 'show-chapters',
  ShowVerses = 'show-verses',
}

@Injectable({providedIn: 'root'})
export class ValuesService {

  private valuesMessageSource = new Subject<{ name: ValuesMessage, value: any }>()
  valuesMessage$ = this.valuesMessageSource.asObservable()

  private onValuesMessage(name: ValuesMessage, value: any) {
    this.valuesMessageSource.next({name, value})
  }

  onShowChapters() {
    this.onValuesMessage(ValuesMessage.ShowChapters, null)
  }

  onShowVerses() {
    this.onValuesMessage(ValuesMessage.ShowVerses, null)
  }
}
