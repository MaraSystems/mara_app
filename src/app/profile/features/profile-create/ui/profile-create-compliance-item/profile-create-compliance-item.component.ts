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


@Component({
  selector: 'app-profile-create-compliance-item',
  templateUrl: './profile-create-compliance-item.component.html',
  styleUrls: ['./profile-create-compliance-item.component.scss']
})
export class ProfileCreateComplianceItemComponent extends UnSubscriber implements OnInit {
  @Input() list: string[] = [];
  @Input() expiry = false;
  @Input() name = '';

  @Output() changes = new EventEmitter<FormGroup>();

  form!: FormGroup;
  getControl = getFormControl;

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  ngOnInit(): void {    
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      modelType: new FormControl(null, [Validators.minLength(12), Validators.required]),
      document: new FormControl(null, [Validators.required]),
      expiry: new FormControl(null)
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {              
      this.changes.emit(this.form);      
    });
  }
}
