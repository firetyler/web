import { TestBed } from '@angular/core/testing';

import { CsvFileReaderService } from './csv-file-reader.service';

describe('CsvFileReaderService', () => {
  let service: CsvFileReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvFileReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
