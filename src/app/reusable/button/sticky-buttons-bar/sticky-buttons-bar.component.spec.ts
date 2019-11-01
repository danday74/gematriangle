import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { StickyButtonsBarComponent } from './sticky-buttons-bar.component'

describe('StickyButtonsBarComponent', () => {
  let component: StickyButtonsBarComponent
  let fixture: ComponentFixture<StickyButtonsBarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StickyButtonsBarComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyButtonsBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
