import { TestBed } from '@angular/core/testing';

import { KinAccessService } from './kin-access.service';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { HttpClientModule } from '@angular/common/http';

describe('KinAccessService', () => {
  let service: KinAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(KinAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
