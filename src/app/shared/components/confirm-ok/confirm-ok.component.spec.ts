import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOkComponent } from './confirm-ok.component';

describe('ConfirmOkComponent', () => {
  let component: ConfirmOkComponent;
  let fixture: ComponentFixture<ConfirmOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
