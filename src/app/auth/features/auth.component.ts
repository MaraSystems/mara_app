import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { LoginAuthAction } from '../utils/store/auth-store.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends UnSubscriber implements OnInit {
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
      password: new FormControl(null, Validators.required),
    });
  }

  login() {    
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    this.store.dispatch(new LoginAuthAction({ email, password }));
  }
}
