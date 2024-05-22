import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Transaction } from '../../utils/models/transaction.model';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent {
  @Input() transaction!: Transaction;
}
