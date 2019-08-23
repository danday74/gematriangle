import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrianglesComponent } from './triangles.component';

describe('TrianglesComponent', () => {
  let component: TrianglesComponent;
  let fixture: ComponentFixture<TrianglesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrianglesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrianglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
