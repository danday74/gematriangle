import { Component, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

@Component({template: ''})

export class DestroyerComponent implements OnDestroy {

  protected unsubscribe$ = new Subject()

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
