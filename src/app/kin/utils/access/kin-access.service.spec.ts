import { TestBed } from '@angular/core/testing';

import { KinAccessService } from './kin-access.service';

describe('KinAccessService', () => {
  let service: KinAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KinAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
