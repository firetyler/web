import { TestBed } from '@angular/core/testing';

import { Schema2Service } from './schema2.service';

describe('Schema2Service', () => {
  let service: Schema2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Schema2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
