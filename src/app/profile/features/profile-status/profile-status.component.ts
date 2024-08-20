import { Component, OnInit } from '@angular/core';
import { Client } from '../../../client/utils/models/client';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormGroup } from '@angular/forms';
import * as addressUtil from 'src/app/general/utils/lib/address';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { OnboardStatus } from '../../utils/onboard-status';
import { ListComplianceAction } from '../compliance/utils/store/compliance-store.action';
import { selectCompliancesByUserId } from '../compliance/utils/store/compliance-store.selector';
import { Compliance, ComplianceTitleEnum } from 'src/app/client/utils/models/compliance';

@Component({
  selector: 'app-profile-status',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.scss']
})
export class ProfileStatusComponent extends UnSubscriber implements OnInit {
  client!: Client;
  complainces!: Compliance[];
  edit = false;
  form!: FormGroup;
  updateData!: Partial<Client>;
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
    this.newSubscription = this.store.select(selectAuthClient).subscribe(client => {
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
