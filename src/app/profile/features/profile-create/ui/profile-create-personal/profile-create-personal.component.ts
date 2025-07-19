import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { selectAuthUser } from 'src/app/users/utils/store/user-store.selector';
import { getFormControl } from 'src/app/general/utils/lib/getFormControl';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { GenderType } from 'src/app/profile/utils/gender-type';
import { UpdateProfileAction } from 'src/app/users/utils/store/user-store.action';
import { User } from 'src/app/users/utils/models/user';

@Component({
  selector: 'app-profile-create-personal',
  templateUrl: './profile-create-personal.component.html',
  styleUrls: ['./profile-create-personal.component.scss']
})
export class ProfileCreatePersanalComponent extends BaseComponent implements OnInit {
  @Output() done = new EventEmitter();

  profile!: User;
  form!: FormGroup;
  personalData!: Partial<User>;
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
    this.newSubscription = this.store.select(selectAuthUser).subscribe(user => {
      this.profile = user;
      this.address = addressUtil.updateAddress(this.address, this.profile);
      this.initForm();
    });
  }

  initForm() {
    this.form = new FormGroup({
      firstname: new FormControl(this.profile.firstname, [Validators.minLength(2), Validators.required]),
      lastname: new FormControl(this.profile.lastname, [Validators.minLength(2), Validators.required]),
      gender: new FormControl(this.profile.gender,[Validators.minLength(2), Validators.required]),
      dob: new FormControl(this.profile.dob, [Validators.minLength(2), Validators.required]),
      country: new FormControl(this.profile.country, [Validators.minLength(2), Validators.required]),
      state: new FormControl(this.profile.state, [Validators.minLength(2), Validators.required]),
      city: new FormControl(this.profile.city, [Validators.minLength(2), Validators.required]),
      street: new FormControl(this.profile.street, [Validators.minLength(2), Validators.required]),
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {
      this.address = addressUtil.updateAddress(this.address, data);
      this.personalData = { ...this.personalData, ...data };
    });
  }

  updateProfile() {
    this.store.dispatch(new UpdateProfileAction(this.personalData));
    this.done.emit();
  }
}
