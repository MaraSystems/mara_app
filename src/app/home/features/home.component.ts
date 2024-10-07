import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  auth: Auth | undefined;

  constructor(
    private store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => this.auth = auth);
  }
}