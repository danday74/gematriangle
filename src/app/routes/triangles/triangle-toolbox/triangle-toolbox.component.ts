import { Component, OnInit } from '@angular/core'
import { TrianglesService } from '../triangles.service'

@Component({
  selector: 'app-triangle-toolbox',
  templateUrl: './triangle-toolbox.component.html',
  styleUrls: ['./triangle-toolbox.component.scss']
})

export class TriangleToolboxComponent implements OnInit {

  alignCenter = true

  constructor(private trianglesService: TrianglesService) {}

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

  onToggleAlign() {
    this.trianglesService.onToolboxToggleAlign()
    this.alignCenter = !this.alignCenter
  }
}
