import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { DataResponse } from 'src/app/shared/utils/models/data-response';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ListPayload } from 'src/app/shared/utils/models/list-payload';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractAccessService {
  domain = 'contracts';

  constructor(
    private accessService: AccessService
  ) {}

  createContract(data: Contract) {    
    const response = this.accessService.insert<Contract>(this.domain, data);
    return of(response);
  }

  getContract(id: string) {    
    const response = this.accessService.get<Contract>(this.domain, { _id: id });
    return response;
  }

  listContracts(data: ListPayload) {
    const response = this.accessService.get<[Contract]>(this.domain, {});
    return response;
  }

  updateContract(data: Update<Contract>) {    
    const response = this.accessService.update<Contract>(this.domain, { _id: data.id }, data.changes);
    return of(response);
  }
}
