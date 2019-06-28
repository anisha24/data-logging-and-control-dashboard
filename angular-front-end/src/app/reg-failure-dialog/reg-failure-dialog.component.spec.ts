import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFailureDialogComponent } from './reg-failure-dialog.component';

describe('RegFailureDialogComponent', () => {
  let component: RegFailureDialogComponent;
  let fixture: ComponentFixture<RegFailureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegFailureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFailureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
