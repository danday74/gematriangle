import { Component, Input, OnInit } from '@angular/core'
import { TrianglesService } from '../triangles.service'
import { triangle } from '../../../utils/triangle'
import { star } from 'src/app/utils/star'
import { debounce } from 'lodash'
import { StorageService } from '../../../services/storage.service'
import { TriangleCounterValues } from '../triangle/triangle-counter-values.enum'

@Component({
  selector: 'app-triangle-toolbox',
  templateUrl: './triangle-toolbox.component.html',
  styleUrls: ['./triangle-toolbox.component.scss']
})

export class TriangleToolboxComponent implements OnInit {

  @Input() rowCount: number
  alignCenter = true
  color: string
  mode: string
  star = star

  get starOfDavid() {
    const n = triangle.housesStarOfDavid(this.rowCount)
    return n ? {n, term: star.term(n)} : null
  }

  counterValuesOptions = [
    {label: 'No values selected', value: TriangleCounterValues.None},
    {label: 'Genesis 1:1 (std)', value: TriangleCounterValues.Genesis1v1Standard},
    {label: 'Genesis 1:1 (ord)', value: TriangleCounterValues.Genesis1v1Ordinal},
    {label: 'Pascal\'s triangle', value: TriangleCounterValues.Pascal},
    {label: 'PI', value: TriangleCounterValues.Pi},
    {label: 'PI decimals', value: TriangleCounterValues.PiDecimals}
  ]

  activateCountersOptions = [
    {label: 'Select to activate', value: null},
    {label: 'Activate corners', value: 'corners'},
    {label: 'Activate midpoints', value: 'midpoints'},
    {label: 'Activate midpoints +', value: 'midpoints-plus'},
    {label: 'Activate center', value: 'center'},
    {label: 'Activate star of David', value: 'star'}
  ]

  activateCountersOption: any
  counterValuesOption: any

  constructor(private trianglesService: TrianglesService, private storageService: StorageService) {
    this.onChangeRowCount = debounce(this.onChangeRowCount, 500, {leading: false, trailing: true})
  }

  ngOnInit() {
    this.color = this.storageService.getItem('triangle-counter-color') || 'app-red'
    this.counterValuesOption = this.storageService.getItem('triangle-counter-values') || TriangleCounterValues.None
    this.mode = this.storageService.getItem('triangle-mode') || 'paint'
    this.onChangeColorClick(this.color)
    this.changeCounterValues(this.counterValuesOption)
    this.onChangeModeClick(this.mode)
  }

  onDrawLinesClick() {
    // this.trianglesService.onToolboxDrawLines()
  }

  onEraseLinesClick() {
    // this.trianglesService.onToolboxEraseLines()
  }

  onClearActiveClick() {
    // this.trianglesService.onToolboxClearActive()
  }

  onClearSelectedClick() {
    // this.trianglesService.onToolboxClearSelected()
  }

  onToggleAlign() {
    this.alignCenter = !this.alignCenter
    this.trianglesService.onToggleAlign(this.alignCenter)
  }

  activateCounters(option) {
    if (option.value) {
      switch (option.value) {
        case 'corners':
          // this.trianglesService.onToolboxActivateCorners()
          break
        case 'midpoints':
          // this.trianglesService.onToolboxActivateMidpoints()
          break
        case 'midpoints-plus':
          // this.trianglesService.onToolboxActivateMidpointsPlus()
          break
        case 'center':
          // this.trianglesService.onToolboxActivateCenter()
          break
        case 'star':
          // this.trianglesService.onToolboxActivateStar()
          break
      }
    }
    setTimeout(() => {
      this.activateCountersOption = null
    })
  }

  onChangeRowCount(rowCount) {
    rowCount = rowCount || 1
    if (rowCount !== this.rowCount) this.trianglesService.onChangeRowCount(rowCount)
  }

  changeCounterValues(evt) {
    const counterValues = evt.value || evt
    this.trianglesService.onChangeCounterValues(counterValues)
    this.storageService.setItem('triangle-counter-values', counterValues)
  }

  onChangeColorClick(color) {
    this.color = color
    this.trianglesService.onChangeColor(color)
    this.storageService.setItem('triangle-counter-color', color)
  }

  onChangeModeClick(mode) {
    this.mode = mode
    this.trianglesService.onChangeMode(mode)
    this.storageService.setItem('triangle-mode', mode)
  }
}
