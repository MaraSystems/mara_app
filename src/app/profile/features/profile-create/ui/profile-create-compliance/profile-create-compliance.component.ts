import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormGroup } from '@angular/forms';
import { getFormControl } from 'src/app/general/utils/lib/getFormControl';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { Compliance, IdentificationComplianceEnum, SupportComplianceEnum } from 'src/app/client/utils/models/compliance';
import { CreateComplianceAction } from '../../../compliance/utils/store/compliance-store.action';


@Component({
  selector: 'app-profile-create-compliance',
  templateUrl: './profile-create-compliance.component.html',
  styleUrls: ['./profile-create-compliance.component.scss']
})
export class ProfileCreateComplianceComponent extends UnSubscriber {
  @Input({ required: true }) userId = '';
  @Output() done = new EventEmitter();

  identificationCompliance!: Compliance;
  supportCompliance!: Compliance;

  identificationForm!: FormGroup;
  supportForm!: FormGroup;

  identificationList = [
    { title: IdentificationComplianceEnum.DRIVERS_LICENSE, expiry: true },
    { title: IdentificationComplianceEnum.INTERNATIONAL_PASSPORT, expiry: true },
    { title: IdentificationComplianceEnum.NATIONAL_IDENTIFICATION, expiry: false }
  ];
  supportList = Object.values(SupportComplianceEnum).map(title => ({ title, expiry: false }));

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  updateCompliance() {    
    this.identificationCompliance = this.identificationForm.value;
    this.supportCompliance = this.supportForm.value;
    
    this.store.dispatch(new CreateComplianceAction(this.identificationCompliance, {
      success: () => {
        this.store.dispatch(new CreateComplianceAction(this.supportCompliance, {
          success: () => {
            this.done.emit();
          }
        }));
      }
    }));
  }
}
