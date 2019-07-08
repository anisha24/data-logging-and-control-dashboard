import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfgaccountComponent } from './confgaccount.component';

describe('ConfgaccountComponent', () => {
  let component: ConfgaccountComponent;
  let fixture: ComponentFixture<ConfgaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfgaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfgaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
