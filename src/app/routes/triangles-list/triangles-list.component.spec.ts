import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TrianglesListComponent } from './triangles-list.component'

describe('TrianglesListComponent', () => {
  let component: TrianglesListComponent
  let fixture: ComponentFixture<TrianglesListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrianglesListComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TrianglesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
