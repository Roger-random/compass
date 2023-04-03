import { TestBed } from '@angular/core/testing';

import { MagnetometerService } from './magnetometer.service';

describe('MagnetometerService', () => {
  let service: MagnetometerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagnetometerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
