import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../utils/models/client';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent extends UnSubscriber implements OnInit {
  client = new Client('me@mail.com', '0000000000', 'username');
  bio!: { firstname: string, lastname: string, username: string };
  contact!: { email: string, phone: string };
  address!: { street: string, city: string, state: string, country: string };
  verification = { bvn: false, nin: false, 'drivers license': false }

  constructor (
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      // this.client = auth?.client;
      this.setDetails();
    });
  }

  setDetails() {
    const {
      firstname,
      lastname, 
      username,
      email,
      phone,
      street,
      city,
      state,
      country
    } = this.client;

    this.bio = { firstname, lastname, username };
    this.contact = { email, phone };
    this.address = { street, city, state, country };
  }
}
