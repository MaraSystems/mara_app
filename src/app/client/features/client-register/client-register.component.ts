import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ClientActionsType, RegisterClientAction } from '../../utils/store/client-store.action';
import { NewClient } from '../../utils/models/new-client';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      phone: new FormControl(null),
      username: new FormControl(null)
    });
  }

  submit() {    
    const email = this.form.controls['email'].value;
    const phone = this.form.controls['phone'].value;
    const username = this.form.controls['username'].value;
    const newClient = new NewClient(email, phone, username);
    this.store.dispatch(new RegisterClientAction(newClient));
  }
}
