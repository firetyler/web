import { TestBed } from '@angular/core/testing';

import { QuanDataCalcService } from './quan-data-calc.service';

describe('QuanDataCalcService', () => {
  let service: QuanDataCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanDataCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
