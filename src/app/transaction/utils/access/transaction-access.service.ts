import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Update } from '@ngrx/entity';
import { Transaction } from '../models/transaction.model';
import { ListOptions } from 'src/app/general/utils/models/list-options';
import { TransactionStatusEnum } from '../models/transaction-status.enum';
import { APIService } from 'src/app/general/utils/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionAccessService {
  domain = 'transactions';

  constructor(
    private accessService: AccessService,
  ) {}

  getTransaction(id: string) {    
    const response = this.accessService.findOne<Transaction>(this.domain, { _id: id });
    return response;
  }

  listTransactions(data: ListOptions) {
    const response = this.accessService.find<[Transaction]>(this.domain, { hidden: false });
    return response;
  }

  updateTransaction(data: Update<Transaction>) {    
    const response = this.accessService.updateOne<Transaction>(this.domain, { _id: data.id }, data.changes);
    return response;
  }

  deleteTransaction(id: string) {    
    const response = this.accessService.updateOne<Transaction>(this.domain, { _id: id }, { hidden: true });
    return response;
  }
}
