import { TestBed } from '@angular/core/testing';

import { VolunteerDataService } from './volunteer-data.service';

describe('VolunteerDataService', () => {
  let service: VolunteerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
