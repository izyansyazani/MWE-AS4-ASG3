import { TestBed } from '@angular/core/testing';

import { ParkingAlertService } from './parking-alert.service';

describe('ParkingAlertService', () => {
  let service: ParkingAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
