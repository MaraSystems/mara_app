import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../utils/models/client';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { phonePattern, usernamePattern } from 'src/app/shared/utils/patterns';
import { UpdateClientAction } from '../../utils/store/client-store.action';
import { selectCurrentClient } from '../../utils/store/client-store.selector';
import * as addressUtil from 'src/app/shared/utils/address';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent extends UnSubscriber implements OnInit {
  client!: Client;
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
    this.newSubscription = this.store.select(selectCurrentClient).subscribe(client => {
      this.client = client;
      this.updateAddress(this.client);
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
    const value = (this.client as any)[name];
    const flag = !!value;
    
    return flag;
  }

  saveChanges() {    
    this.store.dispatch(new UpdateClientAction({ id: this.client._id, changes: this.updateData }));
  }

  updateAddress(data: any) {
    this.address.states = addressUtil.listStates(data.country);
    this.address.cities = addressUtil.listCities(data.country, data.state);
  }

  initForm() {
    this.form = new FormGroup({
      firstname: new FormControl(this.client.firstname, this.isRequired('firstname') ? [Validators.minLength(2), Validators.required]: []),
      lastname: new FormControl(this.client.lastname, this.isRequired('lastname') ? [Validators.minLength(2), Validators.required]: []),
      username: new FormControl(this.client.username, [Validators.pattern(usernamePattern), Validators.required]),

      email: new FormControl(this.client.email, [Validators.email, Validators.required]),
      phone: new FormControl(this.client.phone, [Validators.pattern(phonePattern), Validators.required]),
      
      country: new FormControl(this.client.country, this.isRequired('country') ? [Validators.minLength(2), Validators.required]: []),
      state: new FormControl(this.client.state, this.isRequired('state') ? [Validators.minLength(2), Validators.required]: []),
      city: new FormControl(this.client.city, this.isRequired('city') ? [Validators.minLength(2), Validators.required]: []),
      street: new FormControl(this.client.street, this.isRequired('street') ? [Validators.minLength(2), Validators.required]: []),

      gender: new FormControl(this.client.gender, this.isRequired('gender') ? [Validators.minLength(2), Validators.required]: []),
      dob: new FormControl(this.client.dob, this.isRequired('dob') ? [Validators.minLength(2), Validators.required]: []),
    });
  }
}
