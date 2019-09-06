import Decimal from 'decimal.js'
import { appDefaults } from '../app-defaults'

export const miscInitialiser = (/* services AKA deps */) => {
  return () => new Promise<any>((resolve: any) => {
    Decimal.set({precision: appDefaults.precision})
    resolve()
  })
}
