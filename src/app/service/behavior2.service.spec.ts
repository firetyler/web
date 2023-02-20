import { TestBed } from '@angular/core/testing';

import { Behavior2Service } from './behavior.service';

describe('Behavior2Service', () => {
  let service: Behavior2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Behavior2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
