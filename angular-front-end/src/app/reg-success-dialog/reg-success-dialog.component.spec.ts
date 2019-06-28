import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSuccessDialogComponent } from './reg-success-dialog.component';

describe('RegSuccessDialogComponent', () => {
  let component: RegSuccessDialogComponent;
  let fixture: ComponentFixture<RegSuccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegSuccessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
