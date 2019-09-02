import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { OtherValuesModalComponent } from './other-values-modal.component'

describe('OtherValuesModalComponent', () => {
  let component: OtherValuesModalComponent
  let fixture: ComponentFixture<OtherValuesModalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtherValuesModalComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherValuesModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
