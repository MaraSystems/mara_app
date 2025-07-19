import { Component, OnInit } from '@angular/core';
import { User } from '../../../users/utils/models/user';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { phonePattern, usernamePattern } from 'src/app/general/utils/lib/patterns';
import { UpdateProfileAction } from '../../../users/utils/store/user-store.action';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { selectAuthUser } from 'src/app/users/utils/store/user-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { ToastType } from 'src/app/general/features/toast/utils/models/toast-type';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { OnboardStatus } from '../../utils/onboard-status';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent extends BaseComponent implements OnInit {
  profile!: User;
  edit = false;
  form!: FormGroup;
  updateData!: Partial<User>;
  address: addressUtil.IAddress = { countries: addressUtil.listCountries, states: [], cities: [] };
  onboardEnum = OnboardStatus;

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectAuthUser).subscribe(user => {
      this.profile = user;

      this.updateAddress(this.profile);
      this.initForm();

      this.newSubscription = this.form.valueChanges.subscribe(data => {
        this.updateAddress(data);
      });

      Object.keys(this.form.controls).map(control => {
        this.newSubscription = this.form.controls[control].valueChanges.subscribe(value => {
          this.updateData = this.updateData
            ? { ...this.updateData, [control]: value }
            : { [control]: value } as Partial<User>;
        });
      });
    });
  }

  getControl(name: string) {
    const control = this.form.controls[name] as FormControl;
    return control;
  }

  isRequired(name: string) {
    const value = (this.profile as any)[name];
    const flag = !!value;

    return flag;
  }

  updateProfile() {
    this.store.dispatch(new UpdateProfileAction(this.updateData, {
      success: () => {
        this.edit = false;
        this.store.dispatch(new AddToast({ title: 'User update' }));
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'User update', type: ToastType.ERROR }));
      }
    }));
  }

  updateAddress(data: any) {
    this.address.states = addressUtil.listStates(data.country);
    this.address.cities = addressUtil.listCities(data.country, data.state);
  }

  initForm() {
    this.form = new FormGroup({
      firstname: new FormControl(this.profile.firstname, this.isRequired('firstname') ? [Validators.minLength(2), Validators.required]: []),
      lastname: new FormControl(this.profile.lastname, this.isRequired('lastname') ? [Validators.minLength(2), Validators.required]: []),
      username: new FormControl(this.profile.username, [Validators.pattern(usernamePattern), Validators.required]),

      email: new FormControl(this.profile.email, [Validators.email, Validators.required]),
      phone: new FormControl(this.profile.phone, [Validators.pattern(phonePattern), Validators.required]),

      country: new FormControl(this.profile.country, this.isRequired('country') ? [Validators.minLength(2), Validators.required]: []),
      state: new FormControl(this.profile.state, this.isRequired('state') ? [Validators.minLength(2), Validators.required]: []),
      city: new FormControl(this.profile.city, this.isRequired('city') ? [Validators.minLength(2), Validators.required]: []),
      street: new FormControl(this.profile.street, this.isRequired('street') ? [Validators.minLength(2), Validators.required]: []),

      gender: new FormControl(this.profile.gender, this.isRequired('gender') ? [Validators.minLength(2), Validators.required]: []),
      dob: new FormControl(this.profile.dob, this.isRequired('dob') ? [Validators.minLength(2), Validators.required]: []),
    });
  }
}
