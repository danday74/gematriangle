import { Component, Input, OnInit } from '@angular/core'
import { TrianglesService } from '../triangles.service'
import { triangle } from '../../../utils/triangle'
import { star } from 'src/app/utils/star'

@Component({
  selector: 'app-triangle-toolbox',
  templateUrl: './triangle-toolbox.component.html',
  styleUrls: ['./triangle-toolbox.component.scss']
})

export class TriangleToolboxComponent implements OnInit {

  @Input() rowCount: number
  alignCenter = true
  star = star

  get starOfDavid() {
    const n = triangle.housesStarOfDavid(this.rowCount)
    return n ? {n, term: star.term(n)} : null
  }

  constructor(private trianglesService: TrianglesService) {}

  activateCountersOptions = [
    {label: 'Select to activate', value: null},
    {label: 'Activate corners', value: 'corners'},
    {label: 'Activate midpoints', value: 'midpoints'},
    {label: 'Activate midpoints +', value: 'midpoints-plus'},
    {label: 'Activate center', value: 'center'},
    {label: 'Activate star of David', value: 'star'}
  ]
  activateCountersOption: any

  ngOnInit() {}

  onIncreaseSizeClick() {
    this.trianglesService.onToolboxIncreaseSize()
  }

  onDecreaseSizeClick() {
    this.trianglesService.onToolboxDecreaseSize()
  }

  onDrawLinesClick() {
    this.trianglesService.onToolboxDrawLines()
  }

  onEraseLinesClick() {
    this.trianglesService.onToolboxEraseLines()
  }

  onClearActiveClick() {
    this.trianglesService.onToolboxClearActive()
  }

  onClearSelectedClick() {
    this.trianglesService.onToolboxClearSelected()
  }

  onToggleAlign() {
    this.trianglesService.onToolboxToggleAlign()
    this.alignCenter = !this.alignCenter
  }

  activateCounters(option) {
    if (option.value) {
      switch (option.value) {
        case 'corners':
          this.trianglesService.onToolboxActivateCorners()
          break
        case 'midpoints':
          this.trianglesService.onToolboxActivateMidpoints()
          break
        case 'midpoints-plus':
          this.trianglesService.onToolboxActivateMidpointsPlus()
          break
        case 'center':
          this.trianglesService.onToolboxActivateCenter()
          break
        case 'star':
          this.trianglesService.onToolboxActivateStar()
          break
      }
    }
    setTimeout(() => {
      this.activateCountersOption = null
    })
  }
}
