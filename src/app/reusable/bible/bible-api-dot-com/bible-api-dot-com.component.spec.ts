import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BibleApiDotComComponent } from './bible-api-dot-com.component'

describe('BibleApiDotComComponent', () => {
  let component: BibleApiDotComComponent
  let fixture: ComponentFixture<BibleApiDotComComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BibleApiDotComComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleApiDotComComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
