import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ValuesBuilderComponent } from './values-builder.component'

describe('ValuesBuilderComponent', () => {
  let component: ValuesBuilderComponent
  let fixture: ComponentFixture<ValuesBuilderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValuesBuilderComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesBuilderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
