import { TestBed } from '@angular/core/testing';

import { BehaviorOldService } from './behaviorOld.service';

describe('BehaviorService', () => {
  let service: BehaviorOldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaviorOldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
