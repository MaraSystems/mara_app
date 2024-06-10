import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ContractDeliverable } from '../models/contract-deliverable.model';


@Injectable({
  providedIn: 'root'
})
export class ContractDeliverableAccessService {
  domain = 'contract-deliverables';

  constructor(
    private accessService: AccessService
  ) {}

  createContractDeliverable(data: ContractDeliverable) {    
    const response = this.accessService.insertOne<ContractDeliverable>(this.domain, data);
    return response;
  }

  getContractDeliverable(id: string) {    
    const response = this.accessService.findOne<ContractDeliverable>(this.domain, { _id: id });
    return response;
  }

  listContractDeliverables(contractId: string, limit = 10, skip = 0) {
    const response = this.accessService.findOne<ContractDeliverable>(this.domain, { contractId });
    return response;
  }

  updateContractDeliverable(data: Update<ContractDeliverable>) {    
    const response = this.accessService.updateOne<ContractDeliverable>(this.domain, { _id: data.id }, data.changes);
    return response;
  }
}
