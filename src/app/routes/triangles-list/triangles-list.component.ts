import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { shapeTriangle } from '../../utils/shape-triangle'
import { shapeStar } from '../../utils/shape-star'
import { StorageService } from 'src/app/services/storage/storage.service'
import { AppConfigService } from '../../services/app-config/app-config.service'
import { shapeCenteredTriangle } from '../../utils/shape-centered-triangle'

@Component({
  selector: 'app-triangles-list',
  templateUrl: './triangles-list.component.html',
  styleUrls: ['./triangles-list.component.scss']
})

export class TrianglesListComponent implements OnInit {

  numTrianglesListed = 250
  rowCount: number
  triangles = []

  constructor(private router: Router, private storageService: StorageService, private appConfigService: AppConfigService) {}

  ngOnInit() {

    this.rowCount = this.storageService.getItem('row-count') || this.appConfigService.defaults.rowCount

    for (let i = 1; i <= this.numTrianglesListed; i++) {
      const starOfDavid = shapeTriangle.housesStarOfDavid(i)
      const centeredTriangle = shapeTriangle.housesCenteredTriangle(i)
      this.triangles.push({
        T: i,
        perimeter: shapeTriangle.perimeter(i),
        counters: shapeTriangle.term(i),
        starOfDavid,
        starOfDavidCounters: shapeStar.term(starOfDavid),
        centeredTriangle,
        centeredTriangleCounters: shapeCenteredTriangle.term(centeredTriangle)
      })
    }
  }

  rowClick(n) {
    this.router.navigateByUrl('triangles/' + n).then()
  }
}
