import { TestBed } from '@angular/core/testing';

import { FilterSwitchService } from './filter-switch.service';

describe('FilterSwitchService', () => {
  let service: FilterSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
