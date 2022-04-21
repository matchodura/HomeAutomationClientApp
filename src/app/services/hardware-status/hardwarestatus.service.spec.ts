import { TestBed } from '@angular/core/testing';

import { HardwareStatusService } from './hardwarestatus.service';

describe('HardwarestatusService', () => {
  let service: HardwareStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
