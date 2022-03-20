import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoggingComponent } from './dialog-logging.component';

describe('DialogLoggingComponent', () => {
  let component: DialogLoggingComponent;
  let fixture: ComponentFixture<DialogLoggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoggingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
