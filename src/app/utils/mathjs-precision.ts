import { all, create } from 'mathjs'
import { appDefaults } from '../app-defaults'

// @ts-ignore
export const precision = create(all)
precision.config({
  number: 'BigNumber',
  precision: appDefaults.precision
})
