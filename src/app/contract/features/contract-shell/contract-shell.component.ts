import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { selectAllContracts } from '../../utils/store/contract-store.selector';
import { Contract } from '../../utils/models/contract.model';
import { ListContractsAction } from '../../utils/store/contract-store.action';

@Component({
  selector: 'app-contract-shell',
  templateUrl: './contract-shell.component.html',
  styleUrls: ['./contract-shell.component.scss']
})
export class ContractShellComponent extends UnSubscriber implements OnInit {
  contracts: Contract[] = [];

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListContractsAction({ limit: 10, skip: 0 }));
    this.newSubscription = this.store.select(selectAllContracts).subscribe(contracts => {      
      this.contracts = contracts;
    });
  }
}
