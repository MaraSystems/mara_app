import { Component, Input, OnInit } from '@angular/core';
import { Contract } from '../../utils/models/contract.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { GetContractAction } from '../../utils/store/contract-store.action';
import { ListContractDeliverablesAction } from 'src/app/contract-deliverable/utils/store/contract-deliverable-store.action';
import { summerizeDeliverables } from 'src/app/general/utils/lib/summerizeDeliverables';
import { selectAllContractDeliverables } from 'src/app/contract-deliverable/utils/store/contract-deliverable-store.selector';


@Component({
  selector: 'app-contract-item',
  templateUrl: './contract-item.component.html',
  styleUrls: ['./contract-item.component.scss']
})
export class ContractItemComponent extends UnSubscriber implements OnInit {
  @Input() contract!: Contract;
  price!: string;
  duration!: number;

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetContractAction(this.contract._id)); 
    this.store.dispatch(new ListContractDeliverablesAction(this.contract._id));

    this.newSubscription = this.store.select(selectAllContractDeliverables(this.contract._id)).subscribe(deliverables => {
      const summary = summerizeDeliverables(deliverables);                  
      this.price = summary.price;
      this.duration = summary.duration;
    });
  }
}
