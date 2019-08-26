import { forOwn } from 'lodash'
import { numberData } from '../../data/number.data'

export const dataInitialiser = (/* services AKA deps */) => {
  return () => new Promise<any>((resolve: any, reject: any) => {
    forOwn(numberData, (v, k) => {
      k = parseInt(k, 10)
      if (k !== v.number) reject('Inaccurate number data for ' + k)
    })
    resolve()
  })
}
