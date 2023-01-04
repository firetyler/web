import { TestBed } from '@angular/core/testing';

import { SeviceService } from './sevice.service';

describe('SeviceService', () => {
  let service: SeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
