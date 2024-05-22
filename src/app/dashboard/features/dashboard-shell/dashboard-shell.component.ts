import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';

@Component({
  selector: 'app-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.scss']
})
export class DashboardShellComponent extends UnSubscriber implements OnInit {
  userId = '';

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.userId = auth.id;
    });
  }
}
