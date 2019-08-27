import { Component, Input, OnInit } from '@angular/core'
import { TrianglesService } from '../triangles.service'
import { triangle } from '../../../utils/triangle'
import { star } from 'src/app/utils/star'
import { debounce } from 'lodash'
import { StorageService } from '../../../services/storage.service'

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

  activateCountersOptions = [
    {label: 'Select to activate', value: null},
    {label: 'Activate corners', value: 'corners'},
    {label: 'Activate midpoints', value: 'midpoints'},
    {label: 'Activate midpoints +', value: 'midpoints-plus'},
    {label: 'Activate center', value: 'center'},
    {label: 'Activate star of David', value: 'star'}
  ]
  activateCountersOption: any

  constructor(private trianglesService: TrianglesService, private storageService: StorageService) {
    this.onRowCountChange = debounce(this.onRowCountChange, 500, {leading: false, trailing: true})
  }

  ngOnInit() {
    this.color = this.storageService.getItem('triangle-counter-color') || 'app-red'
    this.mode = this.storageService.getItem('triangle-mode') || 'paint'
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
    this.trianglesService.onToolboxToggleAlign()
    this.alignCenter = !this.alignCenter
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

  onRowCountChange(rowCount) {
    rowCount = rowCount || 1
    if (rowCount !== this.rowCount) this.trianglesService.onToolboxChangeRowCount(rowCount)
  }

  onChangeColorClick(color) {
    this.color = color
    this.storageService.setItem('triangle-counter-color', color)
  }

  onChangeModeClick(mode) {
    this.mode = mode
    this.storageService.setItem('triangle-mode', mode)
  }
}
