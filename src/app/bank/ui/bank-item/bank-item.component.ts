import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Bank } from '../../utils/models/bank.model';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.scss']
})
export class BankItemComponent {
  @Input() bank!: Bank;
}
