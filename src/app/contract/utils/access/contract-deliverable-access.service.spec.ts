import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ContractDeliverableAccessService } from 'src/app/contract/utils/access/contract-deliverable-access.service';
import { AccessService } from 'src/app/general/utils/services/access.service';


describe('ContractDeliverableAccessService', () => {
  let service: ContractDeliverableAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ContractDeliverableAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
