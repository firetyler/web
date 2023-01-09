import { TestBed } from '@angular/core/testing';

import { MapRoomsService } from './map-rooms.service';

describe('MapRoomsService', () => {
  let service: MapRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
