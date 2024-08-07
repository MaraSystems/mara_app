import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { LoginAuthAction } from '../utils/store/auth-store.action';
import { Login } from '../utils/models/login.model';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends UnSubscriber implements OnInit {
  form!: FormGroup;
  completed = false;
  loginData!: Login;

  constructor(
    public store: Store<AppState>,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.newSubscription = this.form.valueChanges.subscribe(data => {
      this.loginData = data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
    });
  }

  getControl(name: string){
    return this.form.controls[name] as FormControl;
  }

  login() {    
    this.store.dispatch(new LoginAuthAction(this.loginData, {
      success: () => {        
        this.store.dispatch(new AddToast({ title: 'Login successful' }));
        this.router.navigateByUrl('/dashboard');
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Login failed' }));
      }
    }));
  }
}
