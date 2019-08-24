import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TriangleStatsComponent } from './triangle-stats.component'

describe('TriangleStatsComponent', () => {
  let component: TriangleStatsComponent
  let fixture: ComponentFixture<TriangleStatsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TriangleStatsComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TriangleStatsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
