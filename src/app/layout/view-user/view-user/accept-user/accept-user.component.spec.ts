import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptUserComponent } from './accept-user.component';

describe('AcceptUserComponent', () => {
  let component: AcceptUserComponent;
  let fixture: ComponentFixture<AcceptUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
