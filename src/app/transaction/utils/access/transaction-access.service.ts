import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Update } from '@ngrx/entity';
import { Transaction } from '../models/transaction.model';
import { ListOptions } from 'src/app/general/utils/models/list-options';
import { TransactionModelEnum } from '../models/transaction-model.enum';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { TransactionActionEnum } from '../models/transaction-action.enum';
import { WalletTransaction } from 'src/app/dashboard/utils/models/wallet-transaction.model';
import { TransactionPlatformEnum } from '../models/transaction-platform.enum';
import { TransactionStatusEnum } from '../models/transaction-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TransactionAccessService {
  domain = 'transactions';

  constructor(
    private accessService: AccessService,
  ) {}

  createTransaction(data: Transaction) {    
    return this.accessService.insertOne<Transaction>(this.domain, { ...data, hidden: false, status: TransactionStatusEnum.SUCCESSFUL });
  }

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

  getWallet(userId: string) {    
    return this.accessService.findOne<Transaction>(this.domain, { userId, model: TransactionModelEnum.WALLET }, { sort: { createdAt: 'desc' } })
      .pipe(
        map(({ data: transaction }) => {          
          return { success: true, data: transaction.balance } as DataResponse<number>;
        }),
        catchError((error) => {
          if (error === 'Not found') {
            return of({ success: true, data: 0 } as DataResponse<number>);
          }
          return throwError(error);
        })
      )
  }

  updateWallet(walletTransaction: WalletTransaction) {
    let title = '';
    return this.getWallet(walletTransaction.userId)
      .pipe(
        map(({ data: currentBalance }) => {
          let balance = walletTransaction.action === TransactionActionEnum.CREDIT
            ? currentBalance + walletTransaction.amount
            : currentBalance - walletTransaction.amount;

          title = walletTransaction.action === TransactionActionEnum.CREDIT
            ? 'Wallet Deposit'
            : 'Wallet Withdrawal'

          if (balance < 0) {
            throw new Error('Insufficient Balance');
          }

          return balance;
        })
      ).pipe(
        mergeMap((balance) => this.createTransaction({ 
          ...walletTransaction, 
          balance, 
          model: TransactionModelEnum.WALLET, 
          title, 
          platform: TransactionPlatformEnum.CONTRACTOR
        } as Transaction)),
        map(({ data: transaction }) => {
          const response: DataResponse<number> = { success: true, data: transaction.balance };
          return response;  
        })
      )
  }
}
