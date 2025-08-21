import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { IWaitList } from '../../utils/models/waitlist';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Store } from '@ngrx/store';
import { TriggerBotAction } from 'src/app/general/features/bot/utils/store/bot.action';
import { ToastService } from 'mara-ng';

@Component({
  selector: 'app-home-waitlist',
  templateUrl: './home-waitlist.component.html',
  styleUrls: ['./home-waitlist.component.scss']
})
export class HomeWaitlistComponent extends BaseComponent implements OnInit {
  form!: FormGroup;
  data!: IWaitList;
  submit = false;

  constructor(
    private readonly accessService: AccessService,
    private store: Store,
    private toastService: ToastService
  ){
    super();
  }

  formControls = {
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    message: new FormControl('', [Validators.required])
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup(this.formControls);

    this.newSubscription = this.form.valueChanges.subscribe(data => {
      this.data = data;
    });
  }

  join() {
    const messageToBot = `My name is ${this.data.fullname}, ${this.data.message}`;
    this.submit = true;

    this.newSubscription = this.accessService.api.joinWaitlist(this.data).subscribe(done => {
      if (done.success) {
        this.form.reset();
      }

      this.submit = false;
      done.success
        ? this.toastService.note('Join Waitlist', done.message)
        : this.toastService.error('Join Waitlist', done.message);
      this.store.dispatch(new TriggerBotAction(messageToBot));
    });
  }
}
