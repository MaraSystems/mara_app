import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ClientActionsType, RegisterClientAction } from '../../utils/store/client-store.action';
import { NewClient } from '../../utils/models/new-client';
import { phonePattern, usernamePattern } from 'src/app/shared/utils/patterns';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { selectAllClients } from '../../utils/store/client-store.selector';
import { AddToast } from 'src/app/toast/utils/store/toast.action';
import { Toast } from 'src/app/toast/features/toast.model';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent extends UnSubscriber implements OnInit {
  form!: FormGroup;
  completed = false;

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      phone: new FormControl(null, [Validators.pattern(phonePattern), Validators.required]),
      username: new FormControl(null, [Validators.pattern(usernamePattern), Validators.required])
    });
  }

  isValid(name: string) {
    const { invalid, touched } = this.form.controls[name];
    return invalid && touched;
  }

  register() {    
    const email = this.form.controls['email'].value;
    const phone = this.form.controls['phone'].value;
    const username = this.form.controls['username'].value;
    const newClient = new NewClient(email, phone, username);
    this.store.dispatch(new RegisterClientAction(newClient));
  }
}
