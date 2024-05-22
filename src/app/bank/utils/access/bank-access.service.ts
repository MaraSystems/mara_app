import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Update } from '@ngrx/entity';
import { Bank } from '../models/bank.model';
import { ListOptions } from 'src/app/general/utils/models/list-options';

@Injectable({
  providedIn: 'root'
})
export class BankAccessService {
  domain = 'banks';

  constructor(
    private accessService: AccessService,
  ) {}

  createBank(data: Bank) {    
    const response = this.accessService.insertOne<Bank>(this.domain, data);
    return response;
  }

  getBank(id: string) {    
    const response = this.accessService.findOne<Bank>(this.domain, { _id: id });
    return response;
  }

  listBanks(data: ListOptions) {
    const response = this.accessService.find<[Bank]>(this.domain, { hidden: false });
    return response;
  }

  updateBank(data: Update<Bank>) {    
    const response = this.accessService.updateOne<Bank>(this.domain, { _id: data.id }, data.changes);
    return response;
  }

  deleteBank(id: string) {    
    const response = this.accessService.updateOne<Bank>(this.domain, { _id: id }, { hidden: true });
    return response;
  }
}
