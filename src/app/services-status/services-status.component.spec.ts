import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesStatusComponent } from './services-status.component';

describe('ServicesStatusComponent', () => {
  let component: ServicesStatusComponent;
  let fixture: ComponentFixture<ServicesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
