import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { ToastEnum } from 'src/app/general/features/toast/utils/models/toast.enum';
import { getFormControl } from 'src/app/general/utils/lib/getFormControl';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { Client } from 'src/app/client/utils/models/client';
import { Compliance, IdentificationComplianceEnum, SupportComplianceEnum } from 'src/app/client/utils/models/compliance';
import { CreateComplianceAction } from '../../../compliance/utils/store/compliance-store.action';


@Component({
  selector: 'app-profile-create-compliance',
  templateUrl: './profile-create-compliance.component.html',
  styleUrls: ['./profile-create-compliance.component.scss']
})
export class ProfileCreateComplianceComponent extends UnSubscriber implements OnInit {
  @Input({ required: true }) userId = '';
  @Output() done = new EventEmitter();

  identificationCompliance!: Compliance;
  supportCompliance!: Compliance;

  identificationForm!: FormGroup;
  supportForm!: FormGroup;

  identificationList = Object.values(IdentificationComplianceEnum);
  supportList = Object.values(SupportComplianceEnum);

  get identificationExpiry () {
    const flag = this.identificationForm
      ? getFormControl(this.identificationForm, 'modelType').value !== IdentificationComplianceEnum.NATIONAL_IDENTIFICATION
      : false;
    
    return flag;
  }

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  ngOnInit(): void {
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
