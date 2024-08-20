import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { ToastType } from 'src/app/general/features/toast/utils/models/toast-type';
import { getFormControl } from 'src/app/general/utils/lib/getFormControl';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { Kin } from 'src/app/client/utils/models/kin';
import { GenderType } from 'src/app/profile/utils/gender-type';
import { selectKinByUserId } from '../../../kin/utils/store/kin-store.selector';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { CreateKinAction } from '../../../kin/utils/store/kin-store.action';
import { phonePattern } from 'src/app/general/utils/lib/patterns';


@Component({
  selector: 'app-profile-create-kin',
  templateUrl: './profile-create-kin.component.html',
  styleUrls: ['./profile-create-kin.component.scss']
})
export class ProfileCreateKinComponent extends UnSubscriber implements OnInit {
  @Input({ required: true }) userId = '';
  @Output() done = new EventEmitter();

  kin!: Kin;
  form!: FormGroup;
  address: addressUtil.IAddress = { countries: addressUtil.listCountries, states: [], cities: [] };
  getControl = getFormControl;
  genderEnum = Object.values(GenderType);

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.address = addressUtil.updateAddress(this.address, {});
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      phone: new FormControl(null, [Validators.pattern(phonePattern), Validators.required]),
      firstname: new FormControl(null, [Validators.minLength(2), Validators.required]),
      lastname: new FormControl(null, [Validators.minLength(2), Validators.required]),
      gender: new FormControl(null,[Validators.minLength(2), Validators.required]),
      relationship: new FormControl(null,[Validators.minLength(2), Validators.required]),
      dob: new FormControl(null, [Validators.minLength(2), Validators.required]),
      country: new FormControl(null, [Validators.minLength(2), Validators.required]),
      state: new FormControl(null, [Validators.minLength(2), Validators.required]),
      city: new FormControl(null, [Validators.minLength(2), Validators.required]),
      street: new FormControl(null, [Validators.minLength(2), Validators.required]),
      userId: new FormControl(this.userId),
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {              
      this.address = addressUtil.updateAddress(this.address, data);
      this.kin = { ...this.kin, ...data };
    });
  }

  updateKin() {    
    this.store.dispatch(new CreateKinAction(this.kin, {
      success: () => {
        this.done.emit();
      }
    }));
  }
}
