import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DBService } from 'src/app/general/utils/services/db.service';
import { TransactionActionEnum } from 'src/app/transaction/utils/models/transaction-action.enum';
import { Transaction } from 'src/app/transaction/utils/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardAccessService {
  constructor(
    private dbService: DBService,
  ) {}

  getWallet(userId: string) {    
    const response = this.dbService.getWallet(userId);
    return of(response);
  }

  updateWallet(transaction: Transaction) {
    const response = this.dbService.updateWallet(transaction);
    return of(response);
  }
}
