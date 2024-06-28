import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ListOptions } from 'src/app/general/utils/models/list-options';
import { Contract, ContractRequest } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractAccessService {
  domain = 'contracts';

  constructor(
    private accessService: AccessService
  ) {}

  getContract(id: string) {    
    const response = this.accessService.findOne<Contract>(this.domain, { _id: id });
    return response;
  }

  listContracts(userId: string, data: ListOptions) {
    const response = this.accessService.find<[Contract]>(this.domain, { '@or': { clientId: userId, contractorId: userId } });
    return response;
  }

  updateContract(data: Update<Contract>) {    
    const response = this.accessService.updateOne<Contract>(this.domain, { _id: data.id }, data.changes);
    return response;
  }
}
