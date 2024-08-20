import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { getFormControl } from 'src/app/general/utils/lib/getFormControl';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { GenderType } from 'src/app/profile/utils/gender-type';
import { UpdateClientAction } from 'src/app/client/utils/store/client-store.action';
import { Client } from 'src/app/client/utils/models/client';

@Component({
  selector: 'app-profile-create-personal',
  templateUrl: './profile-create-personal.component.html',
  styleUrls: ['./profile-create-personal.component.scss']
})
export class ProfileCreatePersanalComponent extends UnSubscriber implements OnInit {
  @Output() done = new EventEmitter();

  profile!: Client;
  form!: FormGroup;
  personalData!: Partial<Client>;
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
    this.newSubscription = this.store.select(selectAuthClient).subscribe(client => {
      this.profile = client;
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

  updateClient() {    
    this.store.dispatch(new UpdateClientAction({ id: this.profile._id, changes: this.personalData }));
    this.done.emit();
  }
}
