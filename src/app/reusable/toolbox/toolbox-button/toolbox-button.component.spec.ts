import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ToolboxButtonComponent } from './toolbox-button.component'

describe('ToolboxButtonComponent', () => {
  let component: ToolboxButtonComponent
  let fixture: ComponentFixture<ToolboxButtonComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolboxButtonComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
