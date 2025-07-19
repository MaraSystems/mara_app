import { Component, OnInit } from '@angular/core';
import { CreateKinAction, GetKinAction, UpdateKinAction } from '../utils/store/kin-store.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/users/utils/models/user';
import { phonePattern } from 'src/app/general/utils/lib/patterns';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Kin } from 'src/app/users/utils/models/kin';
import { selectKinByUserId } from '../utils/store/kin-store.selector';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';

@Component({
  selector: 'app-kin',
  templateUrl: './kin.component.html',
  styleUrls: ['./kin.component.scss']
})
export class KinComponent extends BaseComponent implements OnInit {
  kin!: Kin;
  userId!: string;
  edit = false;
  form!: FormGroup;
  updateData!: Partial<Kin>;
  address: addressUtil.IAddress = { countries: addressUtil.listCountries, states: [], cities: [] };

  constructor (
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.userId = auth?.id as string;
      this.store.dispatch(new GetKinAction(auth?.id as string));

      this.newSubscription = this.store.select(selectKinByUserId(auth?.id as string)).subscribe(kin => {
        this.kin = kin;
        this.updateAddress(kin);
        this.initForm();

        this.newSubscription = this.form.valueChanges.subscribe(data => {
          this.updateAddress(data);
        });

        Object.keys(this.form.controls).map(control => {
          this.newSubscription = this.form.controls[control].valueChanges.subscribe(value => {
            this.updateData = this.updateData
              ? { ...this.updateData, [control]: value }
              : { [control]: value } as Partial<Kin>;
          });
        });
      });
    });

    this.newSubscription = this.activatedRoute.paramMap.subscribe(param => {
      this.edit = param.has('edit');
    });
  }

  getControl(name: string){
    return this.form.controls[name] as FormControl;
  }

  isRequired(name: string) {
    const value = ((this.kin || {}) as any)[name];
    const flag = !!value;

    return flag;
  }

  saveChanges() {
    if (!this.kin) {
      this.store.dispatch(new CreateKinAction({ ...this.updateData as Kin, userId: this.userId }));
    }
    else {
      this.store.dispatch(new UpdateKinAction({ id: this.kin._id, changes: this.updateData }, {
        success: () => {
          this.edit = false;
        }
      }));
    }
  }

  updateAddress(data: any) {
    if (data) {
      this.address.states = addressUtil.listStates(data.country);
      this.address.cities = addressUtil.listCities(data.country, data.state);
    }
  }

  initForm() {
    this.form = new FormGroup({
      firstname: new FormControl(this.kin?.firstname, this.isRequired('firstname') ? [Validators.minLength(2), Validators.required]: []),
      lastname: new FormControl(this.kin?.lastname, this.isRequired('lastname') ? [Validators.minLength(2), Validators.required]: []),
      relationship: new FormControl(this.kin?.relationship, [Validators.required]),

      email: new FormControl(this.kin?.email, [Validators.email, Validators.required]),
      phone: new FormControl(this.kin?.phone, [Validators.pattern(phonePattern), Validators.required]),

      country: new FormControl(this.kin?.country, this.isRequired('country') ? [Validators.minLength(2), Validators.required]: []),
      state: new FormControl(this.kin?.state, this.isRequired('state') ? [Validators.minLength(2), Validators.required]: []),
      city: new FormControl(this.kin?.city, this.isRequired('city') ? [Validators.minLength(2), Validators.required]: []),
      street: new FormControl(this.kin?.street, this.isRequired('street') ? [Validators.minLength(2), Validators.required]: []),

      gender: new FormControl(this.kin?.gender, this.isRequired('gender') ? [Validators.minLength(2), Validators.required]: []),
      dob: new FormControl(this.kin?.dob, this.isRequired('dob') ? [Validators.minLength(2), Validators.required]: []),
    });
  }
}
