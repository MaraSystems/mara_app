import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ContractAccessService } from 'src/app/contract/utils/access/contract-access.service';
import { AccessService } from 'src/app/shared/utils/services/access.service';

describe('ContractAccessService', () => {
  let service: ContractAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ContractAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
