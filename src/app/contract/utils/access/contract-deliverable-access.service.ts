import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/shared/utils/services/access.service';
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
    return of(response);
  }

  getContractDeliverable(id: string) {    
    const response = this.accessService.findOne<ContractDeliverable>(this.domain, { _id: id });
    return response;
  }

  listContractDeliverables(projectId: string, limit = 10, skip = 0) {
    const response = this.accessService.findOne<[ContractDeliverable]>(this.domain, { projectId });
    return response;
  }

  updateContractDeliverable(data: Update<ContractDeliverable>) {    
    const response = this.accessService.updateOne<ContractDeliverable>(this.domain, { _id: data.id }, data.changes);
    return of(response);
  }
}
