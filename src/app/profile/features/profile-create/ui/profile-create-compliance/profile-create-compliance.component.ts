import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormGroup } from '@angular/forms';
import { getFormControl } from 'src/app/general/utils/lib/getFormControl';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { Compliance, IdentificationComplianceEnum, AddressComplianceEnum, ComplianceModel } from 'src/app/client/utils/models/compliance';
import { CreateComplianceAction } from '../../../compliance/utils/store/compliance-store.action';


@Component({
  selector: 'app-profile-create-compliance',
  templateUrl: './profile-create-compliance.component.html',
  styleUrls: ['./profile-create-compliance.component.scss']
})
export class ProfileCreateComplianceComponent extends UnSubscriber {
  @Input({ required: true }) userId = '';
  @Output() done = new EventEmitter();

  identificationForm!: FormGroup;
  addressForm!: FormGroup;
  complainceModel = ComplianceModel;

  identificationList = [
    { title: IdentificationComplianceEnum.DRIVING_LICENCE, expiry: true },
    { title: IdentificationComplianceEnum.INTERNATIONAL_PASSPORT, expiry: true },
    { title: IdentificationComplianceEnum.NATIONAL_IDENTIFICATION, expiry: false }
  ];
  supportList = Object.values(AddressComplianceEnum).map(title => ({ title, expiry: false }));

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  updateCompliance() {  
    const { document: [identificationDocument], ...identificationCompliance } = 
      { ...this.identificationForm.value, userId: this.userId } as any;

    const { document: [addressDocument], ...addressCompliance } =
      { ...this.addressForm.value, userId: this.userId } as any;
    
    this.store.dispatch(new CreateComplianceAction({ compliance: identificationCompliance, document: identificationDocument }, {
      success: () => {
        this.store.dispatch(new CreateComplianceAction({ compliance: addressCompliance, document: addressDocument }, {
          success: () => {
            this.done.emit();
          }
        }));
      }
    }));
  }
}
