import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ValuesDatagridComponent } from './values-datagrid.component'

describe('ValuesDatagridComponent', () => {
  let component: ValuesDatagridComponent
  let fixture: ComponentFixture<ValuesDatagridComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValuesDatagridComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesDatagridComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
