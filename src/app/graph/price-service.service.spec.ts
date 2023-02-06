import { TestBed } from '@angular/core/testing';

import { PriceServiceService } from './price-service.service';

describe('PriceServiceService', () => {
  let service: PriceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
