import { TestBed } from '@angular/core/testing';

import { ClientAccessService } from './client-access.service';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { HttpClientModule } from '@angular/common/http';

describe('ClientAccessService', () => {
  let service: ClientAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ClientAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
