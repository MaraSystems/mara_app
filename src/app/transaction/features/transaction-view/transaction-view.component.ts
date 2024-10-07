import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from '../../utils/models/transaction';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectTransactionById } from '../../utils/store/transaction-store.selector';
import { DeleteTransactionAction } from '../../utils/store/transaction-store.action';
import { More } from 'src/app/general/utils/models/more';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { Toast } from 'src/app/general/features/toast/utils/models/toast';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() id!: string;

  transaction!: Transaction;
  moreList: More[] = [];

  constructor(
    public store: Store<AppState>,
    public popupService: PopupService,
  ){
    super();
  }

  ngOnInit(): void {        
    this.moreList = [
      { name: 'Delete', icon: 'Delete', action: () => { this.deleteTransaction() } }
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.newSubscription = this.store.select(selectTransactionById(this.id)).subscribe(transaction => {      
      this.transaction = transaction;
    });    
  }

  deleteTransaction() {
    Toast.warn(this.store, 'Click continue to delete transaction', ['Continue'], () => {
      this.store.dispatch(new DeleteTransactionAction(this.transaction._id));
    });
  }

  share() {

  }
}
