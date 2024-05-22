import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { selectAllClientBanks } from '../../utils/store/bank-store.selector';
import { Bank } from '../../utils/models/bank.model';
import { ListBanksAction } from '../../utils/store/bank-store.action';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent extends UnSubscriber implements OnInit {
  banks: Bank[] = [];

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListBanksAction({ limit: 10, skip: 0 }));
    // this.newSubscription = this.store.select(selectAllClientBanks).subscribe(banks => {      
    //   this.banks = banks;
    // });
  }
}
