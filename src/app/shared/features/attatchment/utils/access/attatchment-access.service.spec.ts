import { TestBed } from '@angular/core/testing';

import { AccessService } from 'src/app/shared/utils/services/access.service';
import { HttpClientModule } from '@angular/common/http';
import { AttatchmentAccessService } from './attatchment-access.service';

describe('AttatchmentAccessService', () => {
  let service: AttatchmentAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(AttatchmentAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
