import { TestBed } from '@angular/core/testing';

import { TransactionAccessService } from './transaction-access.service';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { HttpClientModule } from '@angular/common/http';

describe('TransactionAccessService', () => {
  let service: TransactionAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(TransactionAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
