import { Component, Input } from '@angular/core';
import { ContractDeliverable } from '../../utils/models/contract-deliverable';

@Component({
  selector: 'app-contract-deliverable-item',
  templateUrl: './contract-deliverable-item.component.html',
  styleUrls: ['./contract-deliverable-item.component.scss']
})
export class ContractDeliverableItemComponent {
  @Input() deliverable = new ContractDeliverable;
}
