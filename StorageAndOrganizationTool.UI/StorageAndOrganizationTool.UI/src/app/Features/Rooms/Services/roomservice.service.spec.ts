import { TestBed } from '@angular/core/testing';

import { RoomService } from './roomservice.service';

describe('RoomserviceService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
