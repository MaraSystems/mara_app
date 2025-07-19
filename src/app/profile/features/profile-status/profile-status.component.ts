import { Component, OnInit } from '@angular/core';
import { User } from '../../../users/utils/models/user';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormGroup } from '@angular/forms';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { selectAuthUser } from 'src/app/users/utils/store/user-store.selector';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { OnboardStatus } from '../../utils/onboard-status';
import { ListComplianceAction } from '../compliance/utils/store/compliance-store.action';
import { selectCompliancesByUserId } from '../compliance/utils/store/compliance-store.selector';
import { Compliance, ComplianceTitleEnum } from 'src/app/users/utils/models/compliance';

@Component({
  selector: 'app-profile-status',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.scss']
})
export class ProfileStatusComponent extends BaseComponent implements OnInit {
  client!: User;
  complainces!: Compliance[];
  edit = false;
  form!: FormGroup;
  updateData!: Partial<User>;
  address: addressUtil.IAddress = { countries: addressUtil.listCountries, states: [], cities: [] };
  onboardEnum = OnboardStatus;
  complianceTitleEnum = ComplianceTitleEnum;

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectAuthUser).subscribe(client => {
      this.client = client;

      this.store.dispatch(new ListComplianceAction(this.client._id));
      this.newSubscription = this.store.select(selectCompliancesByUserId(this.client._id)).subscribe(complainces => {
        this.complainces = complainces;
      });
    });
  }

  getCompliance(title: ComplianceTitleEnum) {
    return this.complainces.find(c => c.title === title);
  }
}
