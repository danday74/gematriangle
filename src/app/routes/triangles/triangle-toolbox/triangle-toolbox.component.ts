import { Component, Input, OnInit } from '@angular/core'
import { TrianglesService } from '../triangles.service'
import { triangle } from '../../../utils/triangle'
import { star } from 'src/app/utils/star'
import { debounce } from 'lodash'
import { StorageService } from '../../../services/storage.service'
import { TriangleCounterValues } from '../triangle/triangle-counter-values.enum'
import * as $ from 'jquery'

@Component({
  selector: 'app-triangle-toolbox',
  templateUrl: './triangle-toolbox.component.html',
  styleUrls: ['./triangle-toolbox.component.scss', './triangle-toolbox-buttons.component.scss']
})

export class TriangleToolboxComponent implements OnInit {

  @Input() rowCount: number
  alignCenter: boolean
  showValues: boolean
  color: string
  mode: string
  star = star

  get starOfDavid() {
    const n = triangle.housesStarOfDavid(this.rowCount)
    return n ? {n, term: star.term(n)} : null
  }

  counterValuesOptions = [
    {label: 'No values selected', value: TriangleCounterValues.None},
    {label: 'Count', value: TriangleCounterValues.Count},
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
    const storageAlignCenter = this.storageService.getItem('triangle-align-center')
    const storageShowValues = this.storageService.getItem('triangle-show-values')
    this.alignCenter = storageAlignCenter != null ? storageAlignCenter : true
    this.showValues = storageShowValues != null ? storageShowValues : false
    this.setCssClassForAlignCenter()
    this.setCssClassForShowValues()
    this.color = this.storageService.getItem('triangle-counter-color') || 'appRed'
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
    this.trianglesService.onClearActive()
  }

  onClearSelectedClick() {
    this.trianglesService.onClearSelected()
  }

  onToggleAlign() {
    this.alignCenter = !this.alignCenter
    this.trianglesService.onToggleAlign(this.alignCenter)
    this.storageService.setItem('triangle-align-center', this.alignCenter)
    this.setCssClassForAlignCenter()
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
    if (counterValues === TriangleCounterValues.None && this.showValues) this.onToggleShowValues()
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

  onSelectEven() {
    console.log('even')
  }

  onSelectOdd() {
    console.log('odd')
  }

  onToggleShowValues() {
    this.showValues = !this.showValues
    this.trianglesService.onToggleShowValues(this.showValues)
    this.storageService.setItem('triangle-show-values', this.showValues)
    this.setCssClassForShowValues()
  }

  private setCssClassForShowValues() {
    const html = $('html')
    html.removeClass('triangle-big').removeClass('triangle-small')
    if (this.showValues) html.addClass('triangle-big')
    if (!this.showValues) html.addClass('triangle-small')
  }

  private setCssClassForAlignCenter() {
    const html = $('html')
    html.removeClass('triangle-align-center').removeClass('triangle-align-left')
    if (this.alignCenter) html.addClass('triangle-align-center')
    if (!this.alignCenter) html.addClass('triangle-align-left')
  }
}
