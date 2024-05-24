import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { selectAllTransactions } from '../../utils/store/transaction-store.selector';
import { Transaction } from '../../utils/models/transaction.model';
import { ListTransactionsAction } from '../../utils/store/transaction-store.action';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent extends UnSubscriber implements OnInit {
  transactions: Transaction[] = [];
  selectedTransactionId = '';

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListTransactionsAction({ limit: 10, skip: 0 }));
    this.newSubscription = this.store.select(selectAllTransactions({})).subscribe(transactions => {            
      this.transactions = transactions;
    });
  }

  openTransaction(id: string) {    
    this.selectedTransactionId = id; 
    this.popupService.open('transaction-view');
  }
}
