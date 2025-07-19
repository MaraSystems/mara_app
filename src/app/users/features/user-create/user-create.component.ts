import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CreateUserAction } from '../../utils/store/user-store.action';
import { phonePattern, usernamePattern } from 'src/app/general/utils/lib/patterns';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { User } from '../../utils/models/user';
import { OnboardStatus } from 'src/app/profile/utils/onboard-status';
import { Router } from '@angular/router';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent extends BaseComponent implements OnInit {
  form!: FormGroup;
  completed = false;
  user!: User;

  constructor(
    public store: Store<AppState>,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.newSubscription = this.form.valueChanges.subscribe(data => {
      this.user = data;
    });
  }

  getControl(name: string){
    return this.form.controls[name] as FormControl;
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      phone: new FormControl(null, [Validators.pattern(phonePattern), Validators.required]),
      username: new FormControl(null, [Validators.pattern(usernamePattern), Validators.required]),
      onboard: new FormControl(OnboardStatus.PENDING)
    });
  }

  register() {
    this.store.dispatch(new CreateUserAction(this.user, {
      success: () => {
        this.store.dispatch(new AddToast({ title: 'Registration successful' }));
        this.router.navigateByUrl('/auth');
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Registration failed' }));
      }
    }));
  }
}
