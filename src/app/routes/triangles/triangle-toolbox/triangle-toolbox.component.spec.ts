import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TriangleToolboxComponent } from './triangle-toolbox.component'

describe('TriangleToolboxComponent', () => {
  let component: TriangleToolboxComponent
  let fixture: ComponentFixture<TriangleToolboxComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TriangleToolboxComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TriangleToolboxComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
