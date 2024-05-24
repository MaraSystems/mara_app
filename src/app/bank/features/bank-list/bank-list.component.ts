import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { selectAllClientBanks } from '../../utils/store/bank-store.selector';
import { Bank } from '../../utils/models/bank.model';
import { ListBanksAction } from '../../utils/store/bank-store.action';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent extends UnSubscriber implements OnInit {
  auth!: Auth;
  banks: Bank[] = [];
  selectedBankId = '';

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListBanksAction({ limit: 10, skip: 0 }));

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.auth = auth;      

      this.newSubscription = this.store.select(selectAllClientBanks(auth.id)).subscribe(banks => {              
        this.banks = banks;
      });
    });
  }

  updateBank(id: string) {    
    this.selectedBankId = id; 
    this.popupService.open('bank-update');
  }
}
