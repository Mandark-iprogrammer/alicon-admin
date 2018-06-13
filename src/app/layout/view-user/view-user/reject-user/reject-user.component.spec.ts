import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectUserComponent } from './reject-user.component';

describe('RejectUserComponent', () => {
  let component: RejectUserComponent;
  let fixture: ComponentFixture<RejectUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
