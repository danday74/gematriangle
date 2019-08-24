import { Component, OnInit } from '@angular/core'
import { DestroyerComponent } from '../../utils/destroyer.component'
import { TrianglesService } from './triangles.service'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-triangles',
  templateUrl: './triangles.component.html',
  styleUrls: ['./triangles.component.scss']
})

export class TrianglesComponent extends DestroyerComponent implements OnInit {

  rowCount = 42

  constructor(private trianglesService: TrianglesService) {
    super()
  }

  ngOnInit() {
    this.trianglesService.toolboxIncreaseSize$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.rowCount++
    })

    this.trianglesService.toolboxDecreaseSize$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      if (this.rowCount > 1) this.rowCount--
    })
  }
}
