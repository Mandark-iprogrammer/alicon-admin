import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Timepicker1Component } from './timepicker1.component';

describe('Timepicker1Component', () => {
  let component: Timepicker1Component;
  let fixture: ComponentFixture<Timepicker1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Timepicker1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Timepicker1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
