import { TestBed } from '@angular/core/testing';

import { RoomFilterService } from './room-filter.service';

describe('PriceServiceService', () => {
  let service: RoomFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
