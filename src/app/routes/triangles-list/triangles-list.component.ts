import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { triangle } from '../../utils/triangle'
import { star } from '../../utils/star'

@Component({
  selector: 'app-triangles-list',
  templateUrl: './triangles-list.component.html',
  styleUrls: ['./triangles-list.component.scss']
})

export class TrianglesListComponent implements OnInit {

  numTrianglesListed = 201
  triangles = []

  constructor(private router: Router) {}

  ngOnInit() {
    for (let i = 1; i <= this.numTrianglesListed; i++) {
      const starOfDavid = triangle.housesStarOfDavid(i)
      this.triangles.push({
        T: i,
        perimeter: triangle.perimeter(i),
        counters: triangle.term(i),
        starOfDavid,
        starCounters: star.term(starOfDavid)
      })
    }
  }

  rowClick(n) {
    this.router.navigateByUrl('triangles/' + n).then()
  }
}
