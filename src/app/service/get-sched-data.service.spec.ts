import { TestBed } from '@angular/core/testing';

import { GetScheduleDataService } from './get-schedule-data.service';

describe('GetSchedDataService', () => {
  let service: GetScheduleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetScheduleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
