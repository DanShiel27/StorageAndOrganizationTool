import { TestBed } from '@angular/core/testing';

import { PartDataAccessService } from './part-data-access.service';

describe('PartDataAccessService', () => {
  let service: PartDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
