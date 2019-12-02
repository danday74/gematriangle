import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HebrewTextComponent } from './hebrew-text.component'

describe('HebrewTextComponent', () => {
  let component: HebrewTextComponent
  let fixture: ComponentFixture<HebrewTextComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HebrewTextComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
