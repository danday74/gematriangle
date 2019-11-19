import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SelectedSummaryComponent } from './selected-summary.component'

describe('SelectedSummaryComponent', () => {
  let component: SelectedSummaryComponent
  let fixture: ComponentFixture<SelectedSummaryComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedSummaryComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSummaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
