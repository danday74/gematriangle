export interface Counter {
  active: boolean
  selected: boolean
  count: number
  value: number
  pos: { row: number, col: number }
}
