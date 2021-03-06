import { Pipe, PipeTransform } from '@angular/core'
import { range } from 'lodash'

@Pipe({name: 'range'})

export class RangePipe implements PipeTransform {
  // noinspection JSUnusedLocalSymbols
  transform(value: any, ...args: any[]) {
    return range(value)
  }
}
