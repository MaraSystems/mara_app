import { Component, OnInit } from '@angular/core';
import { Client } from '../../../client/utils/models/client';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { phonePattern, usernamePattern } from 'src/app/general/utils/lib/patterns';
import { UpdateClientAction } from '../../../client/utils/store/client-store.action';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { ToastType } from 'src/app/general/features/toast/utils/models/toast-type';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { OnboardStatus } from '../../utils/onboard-status';

@Component({
  selector: 'app-profile-interests',
  templateUrl: './profile-interests.component.html',
  styleUrls: ['./profile-interests.component.scss']
})
export class ProfileInterestsComponent extends BaseComponent implements OnInit {
  profile!: Client;
  edit = false;
  form!: FormGroup;
  updateData!: Partial<Client>;
  address: addressUtil.IAddress = { countries: addressUtil.listCountries, states: [], cities: [] };
  onboardEnum = OnboardStatus;

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  ngOnInit(): void {
    
  }
}
