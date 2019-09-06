import { Component, Input, OnInit } from '@angular/core'
import { TrianglesService } from '../triangles.service'
import { triangle } from '../../../utils/triangle'
import { star } from 'src/app/utils/star'
import { debounce } from 'lodash'
import { StorageService } from '../../../services/storage/storage.service'
import { TriangleCounterValues } from '../triangle/triangle-counter-values.enum'
import * as $ from 'jquery'
import { Location } from '@angular/common'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { OtherValuesModalComponent } from './other-values-modal/other-values-modal.component'
import { DestroyerComponent } from '../../../utils/destroyer.component'
import { takeUntil } from 'rxjs/operators'
import { GoogleAnalyticsService } from '../../../services/google-analytics/google-analytics.service'

@Component({
  selector: 'app-triangle-toolbox',
  templateUrl: './triangle-toolbox.component.html',
  styleUrls: ['./triangle-toolbox.component.scss', './triangle-toolbox-buttons.component.scss']
})

export class TriangleToolboxComponent extends DestroyerComponent implements OnInit {

  @Input() rowCount: number
  alignCenter: boolean
  lineDirection: string
  shortLines: boolean
  zoom: boolean
  color: string
  mode: string

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

  counterValuesOption: any

  constructor(private trianglesService: TrianglesService, private storageService: StorageService, private location: Location,
              private modalService: NgbModal, private googleAnalyticsService: GoogleAnalyticsService) {
    super()
    this.onChangeRowCount = debounce(this.onChangeRowCount, 500, {leading: false, trailing: true})
  }

  ngOnInit() {
    const storageAlignCenter = this.storageService.getItem('triangle-align-center')
    const storageZoom = this.storageService.getItem('triangle-zoom')
    this.alignCenter = storageAlignCenter != null ? storageAlignCenter : true
    this.zoom = storageZoom != null ? storageZoom : false
    this.setCssClassForAlignCenter()
    this.setCssClassForZoom()
    const storageShortLines = this.storageService.getItem('triangle-short-lines')
    this.shortLines = storageShortLines != null ? storageShortLines : true
    this.lineDirection = this.storageService.getItem('triangle-line-direction') || 'left-right'

    this.color = this.storageService.getItem('triangle-counter-color') || 'appRed'
    this.counterValuesOption = this.storageService.getItem('triangle-counter-values') || TriangleCounterValues.None
    this.mode = this.storageService.getItem('triangle-mode') || 'paint'
    this.onChangeColorClick(this.color)
    this.changeCounterValues(this.counterValuesOption)
    this.onChangeModeClick(this.mode)
  }

  onDrawLinesClick() {
    this.trianglesService.onDrawLines()
  }

  onEraseLinesClick() {
    this.trianglesService.onEraseLines()
  }

  onToggleLineLengthClick() {
    this.shortLines = !this.shortLines
    this.trianglesService.onToggleLineLength(this.shortLines)
    this.storageService.setItem('triangle-short-lines', this.shortLines)
  }

  onClearActiveClick() {
    this.trianglesService.onClearActive()
  }

  onClearAllClick() {
    this.trianglesService.onClearAll()
  }

  onClearColorClick() {
    this.trianglesService.onClearColor()
  }

  onToggleAlign() {
    this.alignCenter = !this.alignCenter
    this.trianglesService.onToggleAlign(this.alignCenter)
    this.storageService.setItem('triangle-align-center', this.alignCenter)
    this.setCssClassForAlignCenter()
  }

  onChangeRowCount(rowCount) {
    rowCount = rowCount || 1
    const url = '/triangles/' + rowCount
    this.location.replaceState(url)
    this.googleAnalyticsService.sendPageView(url)
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

  onEvenClick() {
    this.trianglesService.onMultiple(2, 0)
  }

  onOddClick() {
    this.trianglesService.onMultiple(2, 1)
  }

  onMultipleClick() {
    const otherValuesModal = this.modalService.open(OtherValuesModalComponent, {backdrop: 'static', keyboard: false, centered: true})

    otherValuesModal.componentInstance.action = this.mode === 'line' ? 'Activate' : 'Paint'
    otherValuesModal.componentInstance.done.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(({done, multiple, offset}) => {
      if (done) this.trianglesService.onMultiple(multiple, offset)
      otherValuesModal.close()
    })
  }

  onToggleZoom() {
    this.zoom = !this.zoom
    this.trianglesService.onToggleZoom(this.zoom)
    this.storageService.setItem('triangle-zoom', this.zoom)
    this.setCssClassForZoom()
  }

  private setCssClassForZoom() {
    const html = $('html')
    html.removeClass('triangle-big').removeClass('triangle-small')
    if (this.zoom) html.addClass('triangle-big')
    if (!this.zoom) html.addClass('triangle-small')
  }

  private setCssClassForAlignCenter() {
    const html = $('html')
    html.removeClass('triangle-align-center').removeClass('triangle-align-left')
    if (this.alignCenter) html.addClass('triangle-align-center')
    if (!this.alignCenter) html.addClass('triangle-align-left')
  }

  onStarOfDavidClick() {
    this.trianglesService.onStarOfDavid()
  }

  onTriangleCornersClick() {
    this.trianglesService.onTriangleCorners()
  }


  onTriangleMidpointsClick() {
    this.trianglesService.onTriangleMidpoints()
  }

  onTriangleMidpointsPlusClick() {
    this.trianglesService.onTriangleMidpointsPlus()
  }

  onTriangleCenterClick() {
    this.trianglesService.onTriangleCenter()
  }

  onCycleLineDirectionsClick() {
    const directions = ['left-right', 'up-down', 'all']
    let idx = directions.indexOf(this.lineDirection)
    idx++
    if (idx === directions.length) idx = 0
    const direction = directions[idx]
    this.lineDirection = direction
    this.storageService.setItem('triangle-line-direction', direction)
    this.trianglesService.onCycleLineDirections(direction)
  }

  onTrianglePerimeter() {
    this.trianglesService.onTriangleSide('all')
  }

  onTriangleSideLeft() {
    this.trianglesService.onTriangleSide('left')
  }

  onTriangleSideBase() {
    this.trianglesService.onTriangleSide('base')
  }

  onTriangleSideRight() {
    this.trianglesService.onTriangleSide('right')
  }

  onCenteredTriangleClick() {
    this.trianglesService.onCenteredTriangle()
  }
}
