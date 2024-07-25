import { Component, OnInit } from '@angular/core';
import { Client } from '../../../client/utils/models/client';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { phonePattern, usernamePattern } from 'src/app/general/utils/lib/patterns';
import { UpdateClientAction } from '../../../client/utils/store/client-store.action';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { ToastEnum } from 'src/app/general/features/toast/utils/models/toast.enum';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { OnboardEnum } from '../../utils/onboard.enum';

@Component({
  selector: 'app-profile-status',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.scss']
})
export class ProfileStatusComponent extends UnSubscriber implements OnInit {
  profile!: Client;
  edit = false;
  form!: FormGroup;
  updateData!: Partial<Client>;
  address: addressUtil.IAddress = { countries: addressUtil.listCountries, states: [], cities: [] };
  onboardEnum = OnboardEnum;

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectAuthClient).subscribe(client => {
      this.profile = client;
      this.popupService.open('update-signature')
    });
  
  }
}
