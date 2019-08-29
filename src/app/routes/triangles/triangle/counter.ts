import Decimal from 'decimal.js'

export interface Counter {
  active: boolean
  color: string
  count: number
  value: Decimal
  pos: { row: number, col: number }
  spin: false
}
