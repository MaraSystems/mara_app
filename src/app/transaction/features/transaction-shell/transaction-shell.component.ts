import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Transaction } from '../../utils/models/transaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-shell',
  templateUrl: './transaction-shell.component.html',
  styleUrls: ['./transaction-shell.component.scss']
})
export class TransactionShellComponent extends UnSubscriber implements OnInit {
  transactions: Transaction[] = [];
  tabs = ['history', 'banks'];
  selectedTab = 0;

  constructor(
    private router: Router,
  ){
    super();
  }

  ngOnInit(): void {
    this.chooseTab();
    const [section, ..._] = location.pathname.split('/').reverse();
    this.selectedTab = this.tabs.indexOf(section);        
  }

  navigate (name: string) {            
    this.router.navigateByUrl(`/transactions/${name}`);
  }

  chooseTab() {
    if (location.pathname === '/transactions') {
      this.navigate(this.tabs[0]);
    }
  }
}
