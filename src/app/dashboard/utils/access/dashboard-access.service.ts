import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { APIService } from 'src/app/general/utils/services/api.service';
import { TransactionActionEnum } from 'src/app/transaction/utils/models/transaction-action.enum';
import { Transaction } from 'src/app/transaction/utils/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardAccessService {
  constructor(
    private apiService: APIService,
  ) {}

  getWallet(userId: string) {    
    const response = this.apiService.getWallet(userId);
    return of(response);
  }

  updateWallet(transaction: Transaction) {
    const response = this.apiService.updateWallet(transaction);
    return of(response);
  }
}
