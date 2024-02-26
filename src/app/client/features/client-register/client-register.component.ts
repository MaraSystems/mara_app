import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { RegisterClientAction } from '../../utils/store/client-store.action';
import { NewClient } from '../../utils/models/new-client';
import { phonePattern, usernamePattern } from 'src/app/shared/utils/lib/patterns';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent extends UnSubscriber implements OnInit {
  form!: FormGroup;
  completed = false;
  registerData!: NewClient;

  constructor(
    public store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.newSubscription = this.form.valueChanges.subscribe(data => {
      this.registerData = data;
    });
  }

  isValid(name: string) {
    const { invalid, touched } = this.form.controls[name];
    return invalid && touched;
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      phone: new FormControl(null, [Validators.pattern(phonePattern), Validators.required]),
      username: new FormControl(null, [Validators.pattern(usernamePattern), Validators.required])
    });
  }

  register() {    
    this.store.dispatch(new RegisterClientAction(this.registerData));
  }
}
