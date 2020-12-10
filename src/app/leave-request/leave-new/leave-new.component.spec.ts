import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveNewComponent } from './leave-new.component';

describe('LeaveNewComponent', () => {
  let component: LeaveNewComponent;
  let fixture: ComponentFixture<LeaveNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
