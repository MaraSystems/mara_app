import { TestBed } from '@angular/core/testing';

import { ClientAccessService } from './client-access.service';

describe('ClientAccessService', () => {
  let service: ClientAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
