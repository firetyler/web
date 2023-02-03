import { TestBed } from '@angular/core/testing';

import { QuanDataUpdateService } from './quan-data-update.service';

describe('QuanDataUpdateService', () => {
  let service: QuanDataUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanDataUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
