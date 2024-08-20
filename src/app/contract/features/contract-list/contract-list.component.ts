import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Contract } from '../../utils/models/contract';
import { ListContractsAction } from '../../utils/store/contract-store.action';
import { selectAllClientContracts } from '../../utils/store/contract-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent extends UnSubscriber implements OnInit {
  contracts: Contract[] = [];
  auth!: Auth;

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.auth = auth;
      if (auth) {
        this.store.dispatch(new ListContractsAction(auth.id, { limit: 10, skip: 0 }));

        this.newSubscription = this.store.select(selectAllClientContracts(auth.id)).subscribe(contracts => {           
          this.contracts = contracts;
        });
      }
    });
  }
}
