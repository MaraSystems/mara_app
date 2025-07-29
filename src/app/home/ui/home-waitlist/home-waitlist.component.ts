import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { IWaitList } from '../../utils/models/waitlist';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Store } from '@ngrx/store';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { ToastType } from 'src/app/general/features/toast/utils/models/toast-type';

@Component({
  selector: 'app-home-waitlist',
  templateUrl: './home-waitlist.component.html',
  styleUrls: ['./home-waitlist.component.scss']
})
export class HomeWaitlistComponent extends BaseComponent implements OnInit {
  form!: FormGroup;
  data!: IWaitList;

  constructor(
    private readonly accessService: AccessService,
    private store: Store
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
    this.newSubscription = this.accessService.api.joinWaitlist(this.data).subscribe(done => {
      if (done.success) {
        this.form.reset();
      }

      this.store.dispatch(new AddToast({ title: 'Join waitlist', description: done.message, type: done.success ? ToastType.NOTE : ToastType.ERROR }));
    });
  }
}
