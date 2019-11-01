import { Injectable } from '@angular/core'
import { appNumber } from '../../../utils/app-number'
import { shapeTriangle } from '../../../utils/shape-triangle'
import { precision } from '../../../utils/mathjs-precision'
import { keys } from 'lodash'

@Injectable({providedIn: 'root'})
export class NumberService {

  constructor() {}

  getActiveProps(num, excluded = []) {
    num = precision.bignumber(num)
    const props = [
      {name: '37', value: appNumber.isMultiple(num, 37), multiple: true, flipped: null},
      {name: '73', value: appNumber.isMultiple(num, 73), multiple: true, flipped: null},
      {name: 'T', value: shapeTriangle.isTerm(num), multiple: false, flipped: null}
    ]
    const activeProps = props.filter(prop => prop.value != null && !excluded.includes(prop.name)).map(prop => {
      prop.flipped = prop.value.plus(appNumber.reverseNumber(prop.value))
      return prop
    })
    return activeProps
  }

  getActivePropsString(num, excluded = []) {
    const activeProps = this.getActiveProps(num, excluded)
    if (!keys(activeProps).length) return null
    const activePropsString = activeProps.reduce((acc, prop) => {
      acc += prop.name
      if (prop.multiple) acc += 'x'
      acc += prop.value.toFixed()
      acc += ' '
      return acc
    }, '')
    return activePropsString.trim()
  }
}
