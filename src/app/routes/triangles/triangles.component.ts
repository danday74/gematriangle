import { Component, OnInit } from '@angular/core'
import { DestroyerComponent } from '../../utils/destroyer.component'
import { TrianglesService } from './triangles.service'
import { filter, takeUntil } from 'rxjs/operators'
import { StorageService } from '../../services/storage/storage.service'
import { TriangleToolboxMessage } from './triangle-toolbox/triangle-toolbox-message.enum'
import { ActivatedRoute } from '@angular/router'
import { AppConfigService } from '../../services/app-config/app-config.service'

@Component({
  selector: 'app-triangles',
  templateUrl: './triangles.component.html',
  styleUrls: ['./triangles.component.scss']
})

export class TrianglesComponent extends DestroyerComponent implements OnInit {

  rowCount: number

  constructor(private route: ActivatedRoute, private trianglesService: TrianglesService, private storageService: StorageService,
              private appConfigService: AppConfigService) {
    super()
  }

  ngOnInit() {

    let routeRowCount = this.route.snapshot.params.id

    if (routeRowCount) {
      routeRowCount = parseInt(routeRowCount, 10)
      this.saveRowCount(routeRowCount)
      this.rowCount = routeRowCount
    } else {
      this.rowCount = this.storageService.getItem('row-count') || this.appConfigService.defaults.rowCount
    }

    this.trianglesService.triangleToolboxMessage$.pipe(
      takeUntil(this.unsubscribe$),
      filter(message => message.name === TriangleToolboxMessage.ChangeRowCount)
    ).subscribe((message) => {
      this.rowCount = message.value
      this.saveRowCount(this.rowCount)
    })
  }

  saveRowCount(rowCount) {
    this.storageService.setItem('row-count', rowCount > 120 ? 120 : rowCount)
  }
}
