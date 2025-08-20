import { TestBed } from '@angular/core/testing';

import { FruitesServiceService } from './fruites-service.service';

describe('FruitesServiceService', () => {
  let service: FruitesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FruitesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
