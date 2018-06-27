import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotAdminComponent } from './forgot-admin.component';

describe('ForgotAdminComponent', () => {
  let component: ForgotAdminComponent;
  let fixture: ComponentFixture<ForgotAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
