import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CounterValueComponent } from './counter-value.component'

describe('CounterValueComponent', () => {
  let component: CounterValueComponent
  let fixture: ComponentFixture<CounterValueComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterValueComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterValueComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
