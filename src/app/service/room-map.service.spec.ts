import { TestBed } from '@angular/core/testing';

import { RoomMapService } from './room-map.service';

describe('RoomMapService', () => {
  let service: RoomMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
