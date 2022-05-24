import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMqttComponent } from './dialog-add-mqtt.component';

describe('DialogAddMqttComponent', () => {
  let component: DialogAddMqttComponent;
  let fixture: ComponentFixture<DialogAddMqttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddMqttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
