import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ContractDeliverable } from '../../utils/models/contract-deliverable';
import { ListContractDeliverablesAction } from '../../utils/store/contract-deliverable-store.action';
import { selectAllContractDeliverables } from '../../utils/store/contract-deliverable-store.selector';

@Component({
  selector: 'app-contract-deliverable-list',
  templateUrl: './contract-deliverable-list.component.html',
  styleUrls: ['./contract-deliverable-list.component.scss']
})
export class ContractDeliverableListComponent extends BaseComponent implements OnInit{
  deliverables: ContractDeliverable[] = [];
  id: string = '';
  
  constructor(
    public store: Store,
    public activatedRoute: ActivatedRoute
  ){
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('contract_id') as string;    
    this.store.dispatch(new ListContractDeliverablesAction(this.id, { limit: 10, skip: 1 }));

    this.newSubscription = this.store.select(selectAllContractDeliverables(this.id)).subscribe(deliverables => {      
      this.deliverables = deliverables;            
    });
  }
}
