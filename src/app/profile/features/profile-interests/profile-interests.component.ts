import { Component, OnInit } from '@angular/core';
import { User } from '../../../users/utils/models/user';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormGroup } from '@angular/forms';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { OnboardStatus } from '../../utils/onboard-status';

@Component({
  selector: 'app-profile-interests',
  templateUrl: './profile-interests.component.html',
  styleUrls: ['./profile-interests.component.scss']
})
export class ProfileInterestsComponent extends BaseComponent implements OnInit {
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

  }
}
