import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { User } from '../../utils/models/user';
import { Router } from '@angular/router';
import { ListUsersAction } from '../../utils/store/user-store.action';
import { selectAllUsers } from '../../utils/store/user-store.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseComponent implements OnInit {
  users!: User[];

  constructor(
    public store: Store<AppState>,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListUsersAction({ limit: 10, skip: 0 }));
      this.newSubscription = this.store.select(selectAllUsers).subscribe(users => {
        this.users = users;
    });
  }
}
