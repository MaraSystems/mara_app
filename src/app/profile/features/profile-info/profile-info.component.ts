import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../../client/utils/models/client';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { phonePattern, usernamePattern } from 'src/app/shared/utils/patterns';
import { UpdateClientAction } from '../../../client/utils/store/client-store.action';
import * as addressUtil from 'src/app/shared/utils/address';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent extends UnSubscriber implements OnInit {
  profile!: Client;
  edit = false;
  form!: FormGroup;
  updateData!: Partial<Client>;
  address: addressUtil.IAddress = { countries: addressUtil.listCountries, states: [], cities: [] }

  constructor (
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectAuthClient).subscribe(client => {
      this.profile = client;

      this.updateAddress(this.profile);
      this.initForm();

      this.newSubscription = this.form.valueChanges.subscribe(data => {              
        this.updateAddress(data);
      });

      Object.keys(this.form.controls).map(control => {
        this.newSubscription = this.form.controls[control].valueChanges.subscribe(value => {
          this.updateData = this.updateData
            ? { ...this.updateData, [control]: value }
            : { [control]: value } as Partial<Client>;   
        });
      });
    });

    this.newSubscription = this.activatedRoute.paramMap.subscribe(param => {
      this.edit = param.has('edit');
    });
  }

  isValid(name: string) {
    const { invalid, touched } = this.form.controls[name];
    return invalid && touched;
  }

  isRequired(name: string) {
    const value = (this.profile as any)[name];
    const flag = !!value;
    
    return flag;
  }

  saveChanges() {    
    this.store.dispatch(new UpdateClientAction({ id: this.profile._id, changes: this.updateData }));
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
