import { Component, OnInit } from '@angular/core'
import { DestroyerComponent } from '../../utils/destroyer.component'
import { TrianglesService } from './triangles.service'
import { filter, takeUntil } from 'rxjs/operators'
import { StorageService } from '../../services/storage.service'
import { TriangleToolboxMessage } from './triangle-toolbox/triangle-toolbox-message.enum'

@Component({
  selector: 'app-triangles',
  templateUrl: './triangles.component.html',
  styleUrls: ['./triangles.component.scss']
})

export class TrianglesComponent extends DestroyerComponent implements OnInit {

  rowCount: number

  constructor(private trianglesService: TrianglesService, private storageService: StorageService) {
    super()
  }

  ngOnInit() {
    this.rowCount = this.storageService.getItem('row-count') || 37

    this.trianglesService.triangleToolboxMessage$.pipe(
      takeUntil(this.unsubscribe$),
      filter(message => message.name === TriangleToolboxMessage.ChangeRowCount)
    ).subscribe((message) => {
      this.rowCount = message.value
      this.storageService.setItem('row-count', this.rowCount)
    })
  }
}
