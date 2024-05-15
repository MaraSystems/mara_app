import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CreateClientAction } from '../../utils/store/client-store.action';
import { phonePattern, usernamePattern } from 'src/app/general/utils/lib/patterns';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Client } from '../../utils/models/client';
import { OnboardEnum } from 'src/app/profile/utils/onboard.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent extends UnSubscriber implements OnInit {
  form!: FormGroup;
  completed = false;
  client!: Client;

  constructor(
    public store: Store<AppState>,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.newSubscription = this.form.valueChanges.subscribe(data => {
      this.client = data;
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
      onboard: new FormControl(OnboardEnum.PENDING)
    });
  }

  register() {    
    this.store.dispatch(new CreateClientAction(this.client, {
      success: () => {        
        this.router.navigateByUrl('/auth');
      }
    }));
  }
}
